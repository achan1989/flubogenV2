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
import { Enum } from "/scripts/Enum.js";
import { AnimationCollection } from "/state/AnimationCollection.js";
import { ProtogenDefinition } from "/state/ProtogenDefinition.js";


export const Workflow = Enum("NONE", "DEFAULT_LEDS");

/**
 * Get the printable name for a given Workflow enum.
 * @param {Workflow} workflowEnum 
 * @returns {String}
 */
function getWorkflowName(workflowEnum) {
  switch (workflowEnum) {
    case Workflow.NONE:
      return "none";

    case Workflow.DEFAULT_LEDS:
      return "default LEDs"

    default:
      throw new Error(`Not a valid Workflow enum value: ${workflowEnum}`);
  }
}


export class AppState {

  /* --------- Simple properties --------- */

  /**
   * The current workflow enum.
   * @type {Workflow}
   */
  get workflow() { return this._workflow; }
  /**
   * The printable name for the current workflow.
   */
  get workflowName() { return getWorkflowName(this._workflow); }
  _workflow;

  /**
   * Defines the components of the Protogen.
   * Will be `undefined` when the workflow is `NONE`.
   * @type {ProtogenDefinition}
   */
  protogenDef;

  /**
   * The animations of the Protogen.
   * Will be `undefined` when the workflow is `NONE`.
   * @type {AnimationCollection}
   */
  animations;

  /**
   * An iterator over the available tabs.
   * Each entry is [tab title, content component name]
   */
  get tabs() { return this._tabs.entries(); }
  _tabs;

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
  _activeTab;

  /**
   * The name of the component associated with the content for the active tab.
   */
  get activeTabComponent() { return this._activeTabComponent; }
  _activeTabComponent;


  /* --------- More complex stuff --------- */

  /**
   * Create a new AppState in the no-workflow state.
   */
  constructor() {
    this.reset();
  }

  /**
   * Reset the AppState to its starting no-workflow state.
   */
  reset() {
    this._workflow = Workflow.NONE;
    this.protogenDef = undefined;
    this.animations = undefined;
    this._tabs = new Map([["Menu", "MenuContent"]]);
    this.activeTab = "Menu";
  }

  /**
   * Start a new workflow of the given kind.
   * @param {String|Workflow} workflow New workflow.
   */
  newWorkflow(workflow) {
    const workflowEnum = Workflow.parse(workflow);
    switch (workflowEnum) {
      case Workflow.DEFAULT_LEDS:
        this.reset();
        this._workflow = Workflow.DEFAULT_LEDS;
        this.protogenDef = ProtogenDefinition.defaultProtogen();
        this.animations = AnimationCollection.forNewProject();
        this._tabs.set("Animations", "AnimationsContent");
        break;

      case Workflow.NONE:
      default:
        throw new Error(`Not a valid Workflow enum value for a new workflow: ${workflowEnum}`);
    }
  }
}

/**
 * @type {AppState}
 */
export const appState = reactive(new AppState());
