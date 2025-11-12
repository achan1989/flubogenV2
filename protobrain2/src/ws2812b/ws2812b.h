#ifndef _WS2812B_H_
#define _WS2812B_H_

void ws2812b_init(void);
void ws2812b_face_set_xgrb(uint32_t xgrb);
void ws2812b_face_set_rgb(uint8_t r, uint8_t g, uint8_t b);
void ws2812b_face_wait_for_idle(void);

#endif /* #ifndef _WS2812B_H_ */
