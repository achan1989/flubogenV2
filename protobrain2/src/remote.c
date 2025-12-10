#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

#include <hardware/gpio.h>
#include <hardware/irq.h>
#include <hardware/uart.h>
#include <pico/assert.h>

#include "anim.h"
#include "remote.h"
#include "work_queue.h"

#if 0
/* Normally the remote is on GPIO 0 and 1... */
#define REMOTE_UART_INSTANCE uart0
#define GPIO_PIN_TX 0
#define GPIO_PIN_RX 1
#else
/* But we move it to GPIO 4 and 5 if we somehow managed to break the normal pins... */
#define REMOTE_UART_INSTANCE uart1
#define GPIO_PIN_TX 4
#define GPIO_PIN_RX 5
#endif

#define UART_BAUD_RATE 115200

#define COMMAND_SET_ANIMATION 0
#define COMMAND_LOCK_ANIMATION 1

#if 0
static void uart_rx_irq_handler(void);
#endif

void remote_init(void)
{
    gpio_set_function(GPIO_PIN_TX, UART_FUNCSEL_NUM(REMOTE_UART_INSTANCE, GPIO_PIN_TX));
    gpio_set_function(GPIO_PIN_RX, UART_FUNCSEL_NUM(REMOTE_UART_INSTANCE, GPIO_PIN_RX));
    uart_init(REMOTE_UART_INSTANCE, UART_BAUD_RATE);

    while (true)
    {
        uint8_t byte;
        uart_read_blocking(REMOTE_UART_INSTANCE, &byte, 1);
        printf("Rx 0x%02x\n", byte);
    }

#if 0
    irq_set_exclusive_handler(UART_IRQ_NUM(REMOTE_UART_INSTANCE), uart_rx_irq_handler);
    irq_set_enabled(UART_IRQ_NUM(REMOTE_UART_INSTANCE), true);
    // uart_set_irqs_enabled(REMOTE_UART_INSTANCE, true, false);
    /* Enable the read timeout interrupt only. */
    uart_get_hw(REMOTE_UART_INSTANCE)->imsc = UART_UARTIMSC_RTIM_LSB;
#endif
}

#if 0
static void uart_rx_irq_handler(void)
{
    /* The interrupt is triggered only on RX timeout.
     * I.e. there is at least 1 byte and the remote hasn't sent anything for 32 bit periods.
     * "The receive timeout interrupt is cleared either when the FIFO becomes empty through reading
     * all the data, or when a 1 is written to the corresponding bit of the Interrupt Clear
     * Register"
     *
     * We use just this interrupt because we expect the remote to send 2 bytes, delay at least
     * 50 milliseconds, send 2 bytes...
     * At 115200 baud, 32 bit periods is 8.7 usec * 32 = 278 usec. The 50 ms delay is massive
     * compared to this, so this is a nice way to be pretty sure we have 2 bytes available. */

    irq_set_enabled(UART_IRQ_NUM(REMOTE_UART_INSTANCE), false);

    while (true)
    {
        /* If we don't have a complete command and parameter, we ignore it. */
        if (!uart_is_readable(REMOTE_UART_INSTANCE))
        {
            break;
        }
        uint32_t word0 = uart_get_hw(REMOTE_UART_INSTANCE)->dr;
        if (!uart_is_readable(REMOTE_UART_INSTANCE))
        {
            break;
        }
        uint32_t word1 = uart_get_hw(REMOTE_UART_INSTANCE)->dr;

        /* We're currently ignoring the error bits in the FIFO values. */
        uint8_t cmd = (uint8_t)(word0 & 0xFF);
        uint8_t param = (uint8_t)(word1 & 0xFF);

        bool valid = true;
        work_item_t work_item;
        if (param == 0)
        {
            work_item.data = DEFAULT_ANIMATION;
        }
        else
        {
            work_item.data = BOOT_ANIMATION + param;
        }

        switch (cmd)
        {
        case COMMAND_SET_ANIMATION:
            work_item.command = WORK_ITEM_SET_ANIMATION;
            break;

        case COMMAND_LOCK_ANIMATION:
            work_item.command = WORK_ITEM_LOCK_ANIMATION;
            break;

        default:
            /* Ignore an unknown command. */
            valid = false;
            break;
        }

        if (valid)
        {
            work_queue_add_with_data(work_item);
        }
    }

    // Clear all interrupts.
    uart_get_hw(REMOTE_UART_INSTANCE)->icr = UART_UARTICR_BITS;
    irq_set_enabled(UART_IRQ_NUM(REMOTE_UART_INSTANCE), true);
}
#endif
