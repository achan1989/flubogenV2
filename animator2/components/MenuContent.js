/**
 * The menu tab's content.
 */

import { ref, useTemplateRef } from 'vue';
import { appState, Workflow } from '/scripts/AppState.js';
import ModalDialog from '/components/ModalDialog.js';


export default {
  components: {
    ModalDialog,
  },

  setup() {
    const newProjectDialog = useTemplateRef("new-project-dialog");

    return {
      appState,
      Workflow,
      newProjectDialog,
    };
  },

  template: /*html*/ `
  <p>Current project type: {{appState.workflowName}}</p>

  <ul>
    <li><button @click="newProjectDialog.show()">New project...</button></li>
    <li><button>Open project... (unimplemented)</button></li>
    <li><button>Save project... (unimplemented)</button></li>
  </ul>

  <ModalDialog
    ref="new-project-dialog"
    @confirmed="(workflowString) => appState.newWorkflow(workflowString)"
  >
    Create a new project:
    <ul>
      <li>
        <button @click="newProjectDialog.confirm(Workflow.DEFAULT_LEDS)">Default LEDs</button>
        Use the default LED matrices (face, cheeks, shoulders, legs).
      </li>
      <li><button @click="newProjectDialog.cancel()">Cancel</button></li>
    </ul>
  </ModalDialog>
  `
}
