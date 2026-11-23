/**
 * Holds the important global application state.
 */

import { reactive, computed } from 'vue'
import { Enum } from "./Enum.js";


export const Workflow = Enum("NONE");

/**
 * @constructor
 */
function AppState() {
  this._workflow = Workflow.NONE;

  /**
   * The available tabs.
   * Each entry is [tab title, content component name]
   */
  this._tabs = new Map([["Menu", "MenuContent"]]);
  Object.defineProperty(this, "tabs", {get() { return this._tabs.entries(); }});

  /**
   * The title of the active tab.
   * @type {String}
   */
  this._activeTab = "Menu";
  /**
   * The name of the Vue component that provides the active tab's content.
   * @type {String}
   */
  this._activeTabComponent = "MenuContent";
  Object.defineProperty(this, "activeTab", {
    get() { return this._activeTab; },
    set(title) {
      const componentName = this._tabs.get(title);
      if (componentName === undefined) { throw new Error(`Invalid tab name '${title}'`); }
      this._activeTab = title;
      this._activeTabComponent = componentName;
    },
  });
  Object.defineProperty(this, "activeTabComponent", {get() { return this._activeTabComponent; }});
}

/**
 * @type {AppState}
 */
export const appState = reactive(new AppState());
