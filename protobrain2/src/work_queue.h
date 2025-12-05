/**
 * A global work queue.
 *
 * Modules will request work be done by adding items to the queue.
 * The main loop will consume work items and perform the work in order.
 */

#ifndef _WORK_QUEUE_H_
#define _WORK_QUEUE_H_

typedef enum
{
    WORK_ITEM_ANIMATE_FACE_FRAME,
    WORK_ITEM_REQUEST_RANDOM_ANIMATION,
    WORK_ITEM_READ_ADC_SENSORS,
    WORK_ITEM_UPDATE_OSD,
    WORK_ITEM_SET_ANIMATION,
    WORK_ITEM_LOCK_ANIMATION,
} work_item_command_t;

typedef struct
{
    work_item_command_t command;
    uint8_t data;
} work_item_t;

/**
 * Initialise the work queue.
 * */
void work_queue_init(void);

/**
 * Add a work item.
 *
 * The \p command is specified, and the `data` is left undefined.
 * Use this when the command has no data associated with it.
 *
 * Safe to call from interrupt handlers.
 *
 * @param[in] item Work item
 */
void work_queue_add(work_item_command_t command);

/**
 * Add a work item.
 *
 * The full work \p item is specified.
 * Use this when the command has data associated with it.
 *
 * Safe to call from interrupt handlers.
 *
 * @param[in] item Work item
 */
void work_queue_add_with_data(work_item_t item);

/**
 * Remove a work item.
 *
 * Blocks until work is available.
 */
work_item_t work_queue_remove_blocking(void);

#endif /* _WORK_QUEUE_H_ */
