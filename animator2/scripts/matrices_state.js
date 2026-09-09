import {Enum} from "./enum.js";
import { defaultFace, defaultLogo, defaultLeg } from "./matrices_default_configuration.js";


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
    defaultLogo(), // cheek
    defaultLogo(), // shoulder
    defaultLeg(),
  ];
  return state;
}

export const ConfigurationChoice = Enum("DEFAULT", "CUSTOM");
