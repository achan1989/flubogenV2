#ifndef _LEDS_H_
#define _LEDS_H_

#include "ws2812b/ws2812b.h"

#define NUM_LED_CHANNELS 4

#define NUM_LEDS_FACE 312
#define NUM_LEDS_CHEEK 9
#define NUM_LEDS_BODY0 9
#define NUM_LEDS_BODY1 41

#define GPIO_PIN_FACE 12
#define GPIO_PIN_CHEEK 13
#define GPIO_PIN_BODY0 14
#define GPIO_PIN_BODY1 15

typedef enum
{
    LED_CHANNEL_FACE,
    LED_CHANNEL_CHEEK,
    LED_CHANNEL_BODY0,
    LED_CHANNEL_BODY1,
} led_channel_t;

// TODO: remove?
typedef struct
{
    wsb2812b_led_value_t values[NUM_LEDS_FACE];
} led_face_buffer_t;

void leds_init(void);
void leds_debug_set_channel_to_colour(led_channel_t channel, wsb2812b_led_value_t value);

#endif /* #ifndef _LEDS_H_ */
