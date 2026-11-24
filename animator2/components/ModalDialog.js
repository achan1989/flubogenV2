/**
 * A component for modal dialogs.
 *
 * Provide the content for the modal dialog by putting things between the start and end
 * <ModalDialog> tags. The provided content should close the dialog with its `confirm()` or
 * `cancel()` methods, and the developer should handle its `confirmed` and `cancelled` events.
 *
 * Calling `confirm(stringResult)` causes the event `confirmed(stringResult)` to be emitted with
 * an associated result string. This is usually meant for when the user makes an explicit choice.
 *
 * Calling `cancel()` causes the event `cancelled()`, with no result string.
 * This is usually meant for when the user closes the dialog without making a choice (e.g. by
 * pressing escape).
 *
 * Whether to use `confirm("no")` or `cancel()` for a user's explicit rejection depends on context
 * and developer choice.
 *
 * Example
 * -------
 *
 * export default {
 *   components: {
 *     ModalDialog,
 *   },
 * 
 *   setup() {
 *     const myDialog = useTemplateRef("my-dialog");
 * 
 *     return {
 *       newProjectDialog,
 *     };
 *   },
 * 
 *   template: `
 *   <ModalDialog
 *     ref="my-dialog"
 *     @cancelled="console.log('The user cancelled')"
 *     @confirmed="(result) => console.log('The user accepted: ' + result)"
 *   >
 *     Make a choice:
 *     <button @click="myDialog.confirm('yes')">Accept</button>
 *     <button @click="myDialog.cancel()">Cancel</button>
 *   </ModalDialog>
 *   `
 * }
 */

import { useId } from 'vue';


/**
 * Internal.
 * Used to indicate that the user has closed the dialog without making a choice.
 */
const NO_CHOICE_MARKER = "__no_choice__";


export default {
  emits: ["confirmed", "cancelled"],

  setup(props, context) {
    const emit = context.emit;
    const dialogNodeId = useId();

    /**
     * Show the modal dialog, invalidating any previous result.
     * Calling this while the dialog is already being shown will cause an exception.
     */
    function show() {
      const dialogNode = document.querySelector(`#${dialogNodeId}`);
      dialogNode.returnValue = NO_CHOICE_MARKER;
      dialogNode.showModal();
    }

    /**
     * Close the modal dialog with an associated result.
     * @param {String} result An arbitrary string.
     */
    function confirm(result) {
      const dialogNode = document.querySelector(`#${dialogNodeId}`);
      dialogNode.close(result);
    }

    /**
     * Close the modal dialog with no result.
     */
    function cancel() {
      const dialogNode = document.querySelector(`#${dialogNodeId}`);
      dialogNode.close(NO_CHOICE_MARKER);
    }

    /**
     * Internal.
     * Handle the DOM event when the dialog is closed, by emitting 
     * @param {*} evt 
     */
    function handleClosed(evt) {
      const result = evt.target.returnValue;
      if (result === undefined) {
        throw new Error("Dialog has no returnValue, something has gone badly wrong");
      }
      if (result === NO_CHOICE_MARKER) {
        emit("cancelled");
      }
      else {
        emit("confirmed", result);
      }
    }

    return {
      dialogNodeId,
      show,
      confirm,
      cancel,
      handleClosed,
    };
  },

  template: /*html*/ `
  <dialog :id=dialogNodeId class="modal-dialog" closeby="closerequest" @close="handleClosed">
    <slot />
  </dialog>
  `
}
