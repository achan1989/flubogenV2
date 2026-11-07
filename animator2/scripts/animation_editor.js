import { Enum } from "./enum.js";
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

    this.#canvasElement.addEventListener("contextmenu", (evt) => evt.preventDefault());
    this.#canvasElement.addEventListener("mousedown", this.#handleMouseEvent.bind(this));
    this.#canvasElement.addEventListener("mousemove", this.#handleMouseEvent.bind(this));
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

  /**
   * Handle the mouse clicks and click-drags on the canvas.
   *
   * Just prints to the console for now.
   * @param {MouseEvent} evt
   */
  #handleMouseEvent(evt) {
    const PRIMARY_BTN = 1;
    const SECONDARY_BTN = 2;

    const isPrimary = (evt.buttons & PRIMARY_BTN) !== 0;
    const isSecondary = (evt.buttons & SECONDARY_BTN) !== 0;
    const isInvalid = isPrimary && isSecondary;
    if (isInvalid || !(isPrimary || isSecondary)) return;
    const interaction = isPrimary ? Interaction.PRIMARY : Interaction.SECONDARY;

    //console.debug(isPrimary, isSecondary, evt.type, evt.offsetX, evt.offsetY);
    const [nRows, nCols] = this.getMatrixDimensions();
    const [valid, row, col] = this.#matrixCanvas.xyToRowCol(
      evt.offsetX, evt.offsetY, nRows, nCols, this.#maxWidth);
    if (!valid) return;

    const clickedLedPresent = this.#definition.leds[row][col];
    console.debug(row, col, "is", clickedLedPresent ? "present" : "not present");
  }
}

const Interaction = Enum("PRIMARY", "SECONDARY");
