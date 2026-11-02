import {LedVis, MatrixCanvas} from "./matrix_canvas.js";
import {MatrixDefinition} from "./matrix_types.js"


const LED_GAP_COLOUR = "#666666";
const LED_PRESENT_COLOUR = "#ad0000";


/**
 * Edits the animation on an LED matrix.
 *
 * A matrix is a rectangular shape, some number of rows and columns. Some LEDs may be marked as not
 * present. Non-present LEDs are shown with a dim checkerboard pattern, so that they can be
 * distinguished from an LED that is present but off.
 */
export class AnimationEditor {
  /** @type {HTMLCanvasElement} */
  #canvasElement;
  /** @type {MatrixCanvas} */
  #matrixCanvas;
  /** @type {number} */
  #maxWidth;

  /** @type {MatrixDefinition} */
  #definition;


  /**
   * Create a new MatrixEditor.
   * @param {HTMLCanvasElement} canvasElement
   * @param {number} maxWidth The max width that the editor can draw into.
   * @param {MatrixDefinition} [definition] Defines the matrix shape and connectivity.
   */
  constructor(canvasElement, maxWidth, definition) {
    this.#canvasElement = canvasElement;
    this.#matrixCanvas = new MatrixCanvas(canvasElement)

    this.#definition = definition;
    if (this.#definition === undefined) {
      throw new Error("matrix definition is missing");
    }

    this.setMaxWidth(maxWidth);
  }

  /**
   * @param {number} maxWidth The max width that the editor can draw into.
   */
  setMaxWidth(maxWidth) {
    this.#maxWidth = maxWidth;
    this.draw();
  }

  /**
   * Draw the main matrix visualisation.
   */
  draw() {
    const [nRows, nCols] = this.getMatrixDimensions();
    if (nRows == 0 || nCols == 0) return;
    if (this.#maxWidth === 0) return;

    // Represent our matrix in a drawable form.
    const matrixVis = this.#definition.leds.map( (row) => {
      return row.map( (present) => {
        const colour = present ? LED_PRESENT_COLOUR : undefined;
        return new LedVis(present, colour);
      })
    });

    this.#matrixCanvas.drawAnimationEditor(matrixVis, this.#maxWidth, LED_GAP_COLOUR);
  }

  /**
   * Get the LED matrix dimensions.
   * @returns {number[]} [number of rows, number of columns]
   */
  getMatrixDimensions() {
    const nRows = this.#definition.leds.length;
    let nCols = this.#definition.leds[0]?.length;
    nCols ??= 0;
    return [nRows, nCols];
  }
}
