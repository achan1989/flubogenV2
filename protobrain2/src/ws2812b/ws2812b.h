#ifndef _WS2812B_H_
#define _WS2812B_H_


#define WS2812B_NUM_LEDS_FACE 10


typedef union
{
    uint32_t grbx;
    // Little endian!
    struct
    {
        uint8_t _x;
        uint8_t b;
        uint8_t r;
        uint8_t g;
    };
} wsb2812b_led_value_t;

typedef struct
{
    wsb2812b_led_value_t values[WS2812B_NUM_LEDS_FACE];
} ws2812b_face_buffer_t;


void ws2812b_init(void);
void ws2812b_face_set_xgrb(uint32_t xgrb);
void ws2812b_face_set_rgb(uint8_t r, uint8_t g, uint8_t b);
void ws2812b_face_wait_for_idle(void);
void ws2812b_face_send_buffer(ws2812b_face_buffer_t *buffer);

#endif /* #ifndef _WS2812B_H_ */
