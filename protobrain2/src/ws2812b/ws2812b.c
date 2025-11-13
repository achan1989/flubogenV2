#include <stdint.h>

#include <hardware/clocks.h>
#include <hardware/dma.h>
#include <hardware/pio.h>
#include <pico/assert.h>
#include <pico/stdlib.h>

#include "ws2812b.h"
#include "ws2812b.pio.h"

#define PIN_FACE_LED 12
#define PINDIR_OUTPUT true
#define OSR_SHIFT_LEFT false
#define AUTOPULL_YES true
#define BITS_PER_LED 24
// One bit takes 1.25 us == 800 KHz
#define BAUD_RATE 800000

// Uncomment to slow down the LED by 8x for a slow logic analyser.
//#define SLOW_LOGIC_ANALYSER

static PIO pio_face;
static uint sm_face;
uint dma_chan_face;

void ws2812b_init(void)
{
    bool success;
    int result;

    uint offset_face;
    success = pio_claim_free_sm_and_add_program(&ws2812b_program, &pio_face, &sm_face, &offset_face);
    hard_assert(success);
    pio_gpio_init(pio_face, PIN_FACE_LED);
    result = pio_sm_set_consecutive_pindirs(pio_face, sm_face, PIN_FACE_LED, 1, PINDIR_OUTPUT);
    hard_assert(result == PICO_OK);
    pio_sm_config config_face = ws2812b_program_get_default_config(offset_face);
    sm_config_set_sideset_pins(&config_face, PIN_FACE_LED);
    sm_config_set_out_shift(&config_face, OSR_SHIFT_LEFT, AUTOPULL_YES, BITS_PER_LED);
    sm_config_set_fifo_join(&config_face, PIO_FIFO_JOIN_TX);

    int cycles_per_bit = ws2812b_T1 + ws2812b_T2 + ws2812b_T3;
    float div = clock_get_hz(clk_sys) / (BAUD_RATE * cycles_per_bit);
#ifdef SLOW_LOGIC_ANALYSER
    #warning WS2812B driver is at 1/8 speed for debugging!
    div *= 8;
#endif
    sm_config_set_clkdiv(&config_face, div);
    result = pio_sm_init(pio_face, sm_face, offset_face, &config_face);
    hard_assert(result == PICO_OK);
    pio_sm_set_enabled(pio_face, sm_face, true);

    dma_chan_face = (uint)dma_claim_unused_channel(true);
    dma_channel_config_t dma_cfg_face = {0};
    channel_config_set_read_increment(&dma_cfg_face, true);
    channel_config_set_write_increment(&dma_cfg_face, false);
    channel_config_set_dreq(&dma_cfg_face, pio_get_dreq(pio_face, sm_face, true));
    channel_config_set_chain_to(&dma_cfg_face, dma_chan_face); /* No chaining */
    channel_config_set_transfer_data_size(&dma_cfg_face, DMA_SIZE_32);
    channel_config_set_ring(&dma_cfg_face, false, 0); /* Ring buffer off */
    channel_config_set_bswap(&dma_cfg_face, false);
    channel_config_set_irq_quiet(&dma_cfg_face, false);
    channel_config_set_enable(&dma_cfg_face, true);
    channel_config_set_sniff_enable(&dma_cfg_face, false); /* CRC? No */
    channel_config_set_high_priority(&dma_cfg_face, false);
    // Don't trigger anything yet when setting these.
    dma_channel_set_config(dma_chan_face, &dma_cfg_face, false);
    dma_channel_set_write_addr(dma_chan_face, &pio_face->txf[sm_face], false);
    dma_channel_set_transfer_count(dma_chan_face, dma_encode_transfer_count(WS2812B_NUM_LEDS_FACE), false);
}

void ws2812b_face_set_xgrb(uint32_t xgrb)
{
    pio_sm_put_blocking(pio_face, sm_face, xgrb << 8);
}

void ws2812b_face_set_rgb(uint8_t r, uint8_t g, uint8_t b)
{
    uint32_t xgrb = (g << 24) | (r << 16) | b;
    pio_sm_put_blocking(pio_face, sm_face, xgrb << 8);
}

void ws2812b_face_wait_for_idle(void)
{
    bool empty = false;
    while (!empty)
    {
        empty = pio_sm_is_tx_fifo_empty(pio_face, sm_face);
    }
}

void ws2812b_face_send_buffer(ws2812b_face_buffer_t *buffer)
{
    dma_channel_set_read_addr(dma_chan_face, buffer->values, true);
}
