/**
 * The animation tab's content.
 */

import { ref, useTemplateRef } from 'vue';
import { appState } from '/state/AppState.js';
import AnimationSelector from "/components/AnimationSelector.js";


export default {
  components: {
    AnimationSelector,
  },

  setup() {
    return {
      appState,
    };
  },

  template: /*html*/ `
  <AnimationSelector />
  <br/>
  <p>Other editor bits to go here...</p>
  `
}
