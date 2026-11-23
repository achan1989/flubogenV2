/**
 * The tab bar.
 * Shows all the tabs, and changes the active tab when one is clicked.
 */

import { ref } from 'vue';
import { appState } from "/scripts/AppState.js";
import Tab from "/components/Tab.js"


export default {
  components: {
    Tab,
  },

  setup() {
    return {
      appState,
    };
  },

  template: /*html*/ `
  <nav>
  <Tab
    v-for="[title, _contentComponent] of appState.tabs"
    :title
    :active="appState.activeTab === title"
    @click="appState.activeTab = title"
  ></Tab>
  </nav>
  `
}
