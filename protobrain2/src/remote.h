/*
Remote user goals:

(assuming animation 1 is the first command one, lets ignore the idle/startup/randoms here)

when pressing button a button one at a time, play animations 1 to 8 (there is 8 inputs)

when pressing several buttons at once, play animations 9 to whatever, the amount of animations is arbitrary based on how many inputs you can press at once

when staying pressed on a button, the selected animation will keep playing on repeat and cant be interrupted until the button is released

when double clicking any button, lock the idle animation as it currently is so it cant be interrupted or change brightness until double clicking again
*/

#ifndef _REMOTE_H_
#define _REMOTE_H_

void remote_init(void);

#endif /* _REMOTE_H_ */
