// App-wide state.
//
// There's singleton global state that affects the application as a whole.

import * as MatricesState from "./matrices_state.js";
import * as AnimationCollection from "./animation_collection.js";


class AppState {
  /** @type {MatricesState.MatricesState} */
  matrices;
  /** @type {AnimationCollection.AnimationCollection} */
  animations;
};

let state;

/**
 * Init the app as if starting a new project.
 */
export function initNewProject() {
  state = new AppState();
  state.matrices = MatricesState.forNewProject();
  state.animations = AnimationCollection.forNewProject();
}

/**
 * @returns {MatricesState.MatricesState}
 */
export function matrices() {
  return state.matrices;
}

/**
 * @returns {AnimationCollection.AnimationCollection}
 */
export function animations() {
  return state.animations;
}
