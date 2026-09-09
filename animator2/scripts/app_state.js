// App-wide state.
//
// There's singleton global state that affects the application as a whole.

import * as MatricesState from "./matrices_state.js";


class AppState {
  /** @type {MatricesState.MatricesState} */
  matrices;
};

let state;

/**
 * Init the app as if starting a new project.
 */
export function initNewProject() {
  state = new AppState();
  state.matrices = MatricesState.forNewProject();
}

/**
 * @returns {MatricesState.MatricesState}
 */
export function matrices() {
  return state.matrices;
}
