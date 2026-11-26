/**
 * Placeholder for the active tab's content.
 * It swaps in the component for the active tab.
 */

import { appState } from "/state/AppState.js";
import MenuContent from "/components/MenuContent.js";


export default {
  components: {
    MenuContent,
  },

  setup() {
    return {
      appState,
    };
  },

  template: /*html*/ `
  <component :is="appState.activeTabComponent"></component>
  `
}
