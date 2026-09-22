import {Enum} from "./enum.js";
import { defaultFace, defaultCheeks, defaultShoulders, defaultLegs } from "./matrices_default_configuration.js";
import { MatrixDefinition } from "./matrix_types.js"


export class MatricesState {
  /** @type {ConfigurationChoice} */
  configurationChoice;

  /** @type {MatrixDefinition[]} */
  defaultMatrices;
};

export function forNewProject() {
  const state = new MatricesState();
  state.configurationChoice = ConfigurationChoice.DEFAULT;
  state.defaultMatrices = [
    defaultFace(),
    defaultCheeks(),
    defaultShoulders(),
    defaultLegs(),
  ];
  return state;
}

export const ConfigurationChoice = Enum("DEFAULT", "CUSTOM");
