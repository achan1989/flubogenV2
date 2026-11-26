/**
 * The foldable animation selector at the top of the Animations tab.
 */

import { ref, computed } from 'vue';
import { appState } from '/state/AppState.js';
import { AnimationKind } from "/state/AnimationCollection.js";

const ListItem = {
  props: {
    name: {
      type: String,
      required: true,
    },
    kind: {
      type: Number,
      required: true,
    },
    index: {
      type: [Number, null],
      default: null,
    },
  },

  setup(props, context) {
    const isEditing = computed(() => {
      const [kind, index] = appState.animations.currentlyEditing;
      const isEditingThis = (kind === props.kind) && (index === props.index);
      return isEditingThis;
    });

    function buttonSpecs() {
      const buttons = [
        ["Edit", () => appState.animations.setEditing(props.kind, props.index)],
        ["⚙️", () => console.error("Unimplemented: animation settings")],
      ];

      if (props.kind === AnimationKind.COMMAND) {
        buttons.push(
          ["↑", () => console.error("Unimplemented: move up")],
          ["↓", () => console.error("Unimplemented: move down")],
        );
      }
      if ([AnimationKind.RANDOM, AnimationKind.COMMAND].includes(props.kind)) {
        buttons.push(
          ["Delete", () => console.error("Unimplemented: delete")],
          ["Swap with startup", () => console.error("Unimplemented: swap")],
          ["Swap with idle", () => console.error("Unimplemented: swap")],
        );
      }
      if (props.kind === AnimationKind.RANDOM) {
        buttons.push(
          ["Move to Command", () => console.error("Unimplemented: move")],
        );
      }
      if (props.kind === AnimationKind.COMMAND) {
        buttons.push(
          ["Move to Random", () => console.error("Unimplemented: move")],
        );
      }
    }

    return {
      appState,
      AnimationKind,
      isEditing,
      buttonSpecs,
    };
  },

  template: /*html*/ `
  <li>
    <span :class="{invisible: !isEditing}">📝</span>
    <span>{{name}}</span>
    <span>todo buttons</span>
  </li>
  `
}


export default {
  components: {
    ListItem,
  },

  setup(props, context) {
    return {
      AnimationKind,
    };
  },

  template: /*html*/ `
  <details class="animation-selector" open><summary>Animation Selector</summary>
    <p>Intro text goes here</p>

    <h3>Special animations</h3>
    <ul class="animationSelectorList" id="specialAnimationsList">
      <ListItem name="Startup animation" :kind="AnimationKind.STARTUP" />
      <ListItem name="Idle animation" :kind="AnimationKind.IDLE" />
    </ul>

    <h3>Random animations</h3>
    <ul class="animationSelectorList" id="randomAnimationsList"></ul>
    <button id="newRandomAnimation">New</button>

    <h3>Command animations</h3>
    <ul class="animationSelectorList" id="commandAnimationsList"></ul>
    <button id="newCommandAnimation">New</button>
  </details>
  `
}
