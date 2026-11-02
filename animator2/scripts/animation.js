// Represents an animation, usually across multiple LED matrices.

import * as AppState from "./app_state.js";
import { Enum } from "./enum.js";


export class Animation {
  nFrames = 1;
  fps = 10;
  /** @type {AnimationMatrixSetting[]} */
  matricesSettings;

  /**
   * Create a default empty animation.
   */
  constructor() {
    const nMatrices = AppState.matrices().getMatrices().length;
    this.matricesSettings = [];
    for (let i = 0; i < nMatrices; i++) {
      this.matricesSettings.push(new AnimationMatrixSetting());
    }
  }
}

export class AnimationMatrixSetting {
  matrixUse = MatrixUse.ANIMATED;
  constantColour = "#00ad00";
}

export const MatrixUse = Enum("ANIMATED", "CONSTANT_COLOUR", "OFF");
