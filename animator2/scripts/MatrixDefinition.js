/**
 * Defines the shape and composition of an LED matrix.
 */
export class MatrixDefinition {
  /**
   * Friendly name to refer to this matrix in the editor.
   * @type {string}
   */
  name = "unnamed matrix";

  /**
   * The shape of the LED matrix, and whether each LED is present (bool).
   * Access as `leds[row][column]`.
   * @type {boolean[][]}
   */
  leds = [];
}
