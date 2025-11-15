#include "leds.h"

// Must match the order within `led_channel_t`
static const ws2812b_channel_init_t channel_init[NUM_LED_CHANNELS] =
{
    {.gpio_pin = GPIO_PIN_FACE, .num_leds = NUM_LEDS_FACE},
    {.gpio_pin = GPIO_PIN_CHEEK, .num_leds = NUM_LEDS_CHEEK},
    {.gpio_pin = GPIO_PIN_BODY0, .num_leds = NUM_LEDS_BODY0},
    {.gpio_pin = GPIO_PIN_BODY1, .num_leds = NUM_LEDS_BODY1},
};

static ws2812b_channel_t channels[NUM_LED_CHANNELS];

static wsb2812b_led_value_t face_buffer[NUM_LEDS_FACE];
static wsb2812b_led_value_t cheek_buffer[NUM_LEDS_CHEEK];
static wsb2812b_led_value_t body0_buffer[NUM_LEDS_BODY0];
static wsb2812b_led_value_t body1_buffer[NUM_LEDS_BODY1];

static wsb2812b_led_value_t *const channel_buffers[NUM_LED_CHANNELS] =
{
    face_buffer, cheek_buffer, body0_buffer, body1_buffer,
};

void leds_init(void)
{
    ws2812b_init(channel_init, channels, NUM_LED_CHANNELS);
}

void leds_debug_set_channel_to_colour(led_channel_t channel, wsb2812b_led_value_t value)
{
    ws2812b_channel_t channel_info = channels[channel];
    wsb2812b_led_value_t *buffer = channel_buffers[channel];

    for (uint i = 0; i < channel_info.num_leds; i++)
    {
        buffer[i] = value;
    }

    ws2812b_send_buffer(&channel_info, buffer);
    ws2812b_wait_for_idle(&channel_info);
}
