/**
 * Holds the important global application state.
 *
 * Implementation note:
 * We can't use a Javascript class with private variables; something about the way Vue uses it via
 * a reactive proxy means the private variables become inaccessible.
 * Instead we must use "fake" private variables, by convention only (begin a variable name with an
 * underscore).
 *
 * As an alternative we could use old-school objects, but specifying getters/setters within an
 * object constructor is a pain.
 */

import { reactive } from 'vue'
import { Enum } from "./Enum.js";


export const Workflow = Enum("NONE");

export class AppState {
  _workflow = Workflow.NONE;

  /**
   * An iterator over the available tabs.
   * Each entry is [tab title, content component name]
   */
  get tabs() { return this._tabs.entries(); }
  _tabs = new Map([["Menu", "MenuContent"]]);

  /**
   * The title of the active tab.
   */
  get activeTab() { return this._activeTab; }
  /**
   * Set the active tab to the one with this `title`.
   * Throws an error if the `title` doesn't match any of the entires in `tabs`.
   */
  set activeTab(title) {
    const componentName = this._tabs.get(title);
    if (componentName === undefined) { throw new Error(`Invalid tab name '${title}'`); }
    this._activeTab = title;
    this._activeTabComponent = componentName;
  }
  _activeTab = "Menu";

  /**
   * The name of the component associated with the content for the active tab.
   */
  get activeTabComponent() { return this._activeTabComponent; }
  _activeTabComponent = "MenuContent";
}

/**
 * @type {AppState}
 */
export const appState = reactive(new AppState());
