import {Enum} from "./enum.js";
import { defaultFace, defaultCheeks, defaultShoulders, defaultLegs } from "./matrices_default_configuration.js";
import { MatrixDefinition } from "./matrix_types.js"


export class MatricesState {
  /** @type {ConfigurationChoice} */
  configurationChoice;

  /** @type {MatrixDefinition[]} */
  defaultMatrices;

  /**
   * Get the current matrix definitions.
   * @returns {MatrixDefinition[]}
   */
  getMatrices() {
    switch (this.configurationChoice) {
      case ConfigurationChoice.DEFAULT:
        return this.defaultMatrices;
      case ConfigurationChoice.CUSTOM:
        throw new Error("Unimplemented: custom matrices");
      default:
        throw new Error(`Invalid matrix configuration choice ${this.configurationChoice}`);
    }
  }
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
