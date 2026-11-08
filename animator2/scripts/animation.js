// Represents an animation, usually across multiple LED matrices.

import * as AppState from "./app_state.js";
import { Enum } from "./enum.js";


/**
 * Defines an animation across multiple matrices.
 */
export class Animation {
  /**
   * How many frames in the animation.
   * @type {Number}
   */
  nFrames = 1;
  /**
   * For each matrix, a list a frames.
   * Access as `matricesFrames[matrix_num][frame_num]`
   * @type {Frame[][]}
   */
  matricesFrames;
  /**
   * Frames per second.
   * @type {Number}
   */
  fps = 10;
  /**
   * For each matrix, its settings.
   * @type {AnimationMatrixSetting[]}
   */
  matricesSettings;

  /**
   * Create a default empty animation.
   */
  constructor() {
    const matrixDefs = AppState.matrices().getMatrices();
    const nMatrices = matrixDefs.length;

    this.matricesSettings = [];
    for (let i = 0; i < nMatrices; i++) {
      this.matricesSettings.push(new AnimationMatrixSetting());
    }

    this.matricesFrames = [];
    for (const matDef of matrixDefs) {
      const frames = [];
      this.matricesFrames.push(frames);
      for (let i = 0; i < this.nFrames; i++) {
        frames.push(new Frame(matDef));
      }
    }
  }
}

/** The settings for a matrix in a specific animation. */
export class AnimationMatrixSetting {
  matrixUse = MatrixUse.ANIMATED;
  constantColour = "#00ad00";
}

/** One frame of animation for a matrix. */
export class Frame {
  /**
   * The LEDs and their colour, accessed like `leds[row][column]`.
   * Every LED which is present in the matrix has an `Rgb` value.
   * If an LED is not present in the matrix, its value is `undefined`.
   * @type {boolean[][]}
   */
  leds;

  /**
   * Create an all-black frame.
   * @param {MatrixDefinition} matDef Defines which LEDs are present in the matrix.
   */
  constructor(matDef) {
    const nRows = matDef.leds.length;
    console.assert(nRows > 0);
    const nCols = matDef.leds[0].length;

    this.leds = [];
    for (const rowDef of matDef.leds) {
      console.assert(rowDef.length === nCols);
      const row = [];
      this.leds.push(row);
      for (const colDef of rowDef) {
        const present = colDef;
        if (present) {
          row.push(new Rgb(0,0,0));
        }
        else {
          row.push(undefined);
        }
      }
    }
  }
}

/** Defines the colour of an LED. */
export class Rgb {
  r;
  g;
  b;

  /**
   * Construct an `Rgb` value by validating the individual r/g/b components.
   * Components can be integers or string representations of integers.
   * @param {Number | String} r_in
   * @param {Number | String} g_in
   * @param {Number | String} b_in
   */
  constructor(r_in, g_in, b_in) {
    const parsed = [];
    for (let input of [r_in, g_in, b_in]) {
      if (!(typeof input === "number")) {
        input = parseInt(input);
      }
      if ((!Number.isInteger(input)) || input < 0 || input > 255) {
        throw new Error(`Invalid rgb value: ${r_in}, ${g_in}, ${b_in}`);
      }
      parsed.push(input);
    }
    [this.r, this.g, this.b] = parsed;
  }
}

/**
 * Specifies how a matrix will be used in an animation.
 * ANIMATED = can be animated.
 * CONSTANT_COLOUR = all LEDs fixed at a solid colour.
 * OFF = all LEDs off.
 */
export const MatrixUse = Enum("ANIMATED", "CONSTANT_COLOUR", "OFF");
