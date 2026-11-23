/**
 * One of the tabs in the tab bar.
 * This is basically just a button.
 */

import { ref } from 'vue';


export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },

  template: /*html*/ `
  <button :class="['tab', {active: active}]" >{{ title }}</button>
  `
}
