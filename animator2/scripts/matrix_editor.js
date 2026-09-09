import {LedVis, MatrixCanvas} from "./matrix_canvas.js";


const DEFAULT_FACE_N_ROWS = 10;
const DEFAULT_FACE_N_COLS = 36;
const DEFAULT_FACE_CUTOUT_ROW_BEGIN = 0;
const DEFAULT_FACE_CUTOUT_ROW_END = 2;
const DEFAULT_FACE_CUTOUT_COL_BEGIN = 10;
const DEFAULT_FACE_CUTOUT_COL_END = 25;

const DEFAULT_LOGO_N_ROWS = 7;
const DEFAULT_LOGO_N_COLS = 7;
const DEFAULT_LOGO_PRESENT_LEDS = [[0,3], [1,5], [3,6], [5,5], [6,3], [5,1], [3,0], [1,1], [3,3]];

const LED_GAP_COLOUR = "#666666";
const LED_PRESENT_COLOUR = "#00ad00";
const LED_NOT_PRESENT_COLOUR = "#000000";


/**
 * Edits the shape and connectivity of an LED matrix.
 *
 * A matrix is a rectangular shape, some number of rows and columns. Some LEDs may be marked as not
 * present.
 */
export class MatrixEditor {
  /** @type {HTMLCanvasElement} */
  #canvasElement;
  /** @type {MatrixCanvas} */
  #matrixCanvas;
  /** @type {number} */
  #maxWidth;

  /**
   * The shape of the LED matrix, and whether each LED is present (bool).
   * Access as `leds[row][column]`.
   * @type {boolean[][]}
   */
  #leds;


  /**
   * Create a new MatrixEditor. Starts empty.
   * @param {HTMLCanvasElement} canvasElement
   * @param {number} maxWidth The max width that the editor can draw into.
   */
  constructor(canvasElement, maxWidth) {
    this.#canvasElement = canvasElement;
    this.#matrixCanvas = new MatrixCanvas(canvasElement)

    this.#leds = [];

    this.setMaxWidth(maxWidth);
  }

  /**
   * Load the default face matrix.
   */
  loadDefaultFace() {
    this.setMatrixDimensions(DEFAULT_FACE_N_ROWS, DEFAULT_FACE_N_COLS);
    this.#setLedPresenceAll(true);
    for (let rowIdx = DEFAULT_FACE_CUTOUT_ROW_BEGIN; rowIdx <= DEFAULT_FACE_CUTOUT_ROW_END; rowIdx++) {
      for (let colIdx = DEFAULT_FACE_CUTOUT_COL_BEGIN; colIdx <= DEFAULT_FACE_CUTOUT_COL_END; colIdx++) {
        this.#setLedPresence(rowIdx, colIdx, false);
      }
    }
    this.draw();
  }

  /**
   * Load the default logo matrix.
   */
  loadDefaultLogo() {
    this.setMatrixDimensions(DEFAULT_LOGO_N_ROWS, DEFAULT_LOGO_N_COLS);
    this.#setLedPresenceAll(false);
    for (const [row, col] of DEFAULT_LOGO_PRESENT_LEDS) {
      this.#setLedPresence(row, col, true);
    }
    this.draw();
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
    const matrixVis = this.#leds.map( (row) => {
      return row.map( (present) => {
        const colour = present ? LED_PRESENT_COLOUR : LED_NOT_PRESENT_COLOUR;
        return new LedVis(present, colour);
      })
    });

    this.#matrixCanvas.draw(matrixVis, this.#maxWidth, LED_GAP_COLOUR);
  }

  /**
   * Get the LED matrix dimensions.
   * @returns {number[]} [number of rows, number of columns]
   */
  getMatrixDimensions() {
    const nRows = this.#leds.length;
    let nCols = this.#leds[0]?.length;
    nCols ??= 0;
    return [nRows, nCols];
  }

  /**
   * Set the LED matrix dimensions.
   * @param {number} nRows
   * @param {number} nCols
   */
  setMatrixDimensions(nRows, nCols) {
    const currentRows = this.#leds.length;

    // When shrinking, rows are automatically discarded.
    if (nRows < currentRows) {
      this.#leds.length = nRows;
    }
    // When growing, we must add a row of LEDs, enabled by default.
    if (nRows > currentRows) {
      const nMore = nRows - currentRows;
      for (let i = 0; i < nMore; i++) {
        const newRow = [];
        newRow.length = nCols;
        newRow.fill(true);
        this.#leds.push(newRow);
      }
    }

    for (const row of this.#leds) {
      const currentCols = row.length;
      // When shrinking, columns are automatically discarded.
      if (nCols < currentCols) {
        row.length = nCols;
      }
      // When growing, we must add LEDs, enabled by default.
      if (nCols > currentCols) {
        row.length = nCols;
        row.fill(true);
      }
    }
  }

  /**
   * Set the presence of all LEDs in the matrix.
   * @param {boolean} present
   */
  #setLedPresenceAll(present) {
    for (const row of this.#leds) {
      row.fill(present);
    }
  }

  /**
   * Set the presence of an LED in the matrix.
   * @param {number} row
   * @param {number} col
   * @param {boolean} present
   */
  #setLedPresence(row, col, present) {
    const [nRows, nCols] = this.getMatrixDimensions();

    if (row < 0 || row >= nRows || col < 0 || col >= nCols) {
      console.warn(`Tried to change invalid LED (row=${row} col=${col})`);
      return;
    }

    this.#leds[row][col] = present;
  }
}
