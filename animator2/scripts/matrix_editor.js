const DEFAULT_FACE_N_ROWS = 10;
const DEFAULT_FACE_N_COLS = 36;
const DEFAULT_FACE_CUTOUT_ROW_BEGIN = 0;
const DEFAULT_FACE_CUTOUT_ROW_END = 2;
const DEFAULT_FACE_CUTOUT_COL_BEGIN = 10;
const DEFAULT_FACE_CUTOUT_COL_END = 25;

const DEFAULT_LOGO_N_ROWS = 7;
const DEFAULT_LOGO_N_COLS = 7;
const DEFAULT_LOGO_PRESENT_LEDS = [[0,3], [1,5], [3,6], [5,5], [6,3], [5,1], [3,0], [1,1], [3,3]];

const DEFAULT_LED_SIZE = 25;
const MIN_LED_SIZE = 10;
const DEFAULT_LED_GAP = 4;
const MIN_LED_GAP = 2;

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
  #canvas;
  /** @type {CanvasRenderingContext2D} */
  #ctx;
  /** The max width that the editor can draw into. */
  #maxWidth;

  #drawLedSize;
  #drawLedGap;

  /**
   * The shape of the LED matrix, and whether each LED is present (bool).
   * Access as `leds[row][column]`.
   * @type {Array[Array[]]}
   */
  #leds;


  /**
   * Create a new MatrixEditor. Starts empty.
   * @param {HTMLCanvasElement} canvas The canvas element.
   * @param {number} width The max width that the editor can draw into.
   */
  constructor(canvas, width) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d", {alpha: false});

    this.#leds = [];

    this.setCanvasWidth(width);
  }

  /**
   * @param {number} width The max width that the editor can draw into.
   */
  setCanvasWidth(width) {
    width = Math.floor(width);
    this.#maxWidth = width;
    this.#updateLayout();
  }

  /**
   * Update the drawing after changing the editor size or the LED matrix dimensions.
   */
  #updateLayout() {
    this.#drawLedSize = DEFAULT_LED_SIZE;
    this.#drawLedGap = DEFAULT_LED_GAP;

    const [nRows, nCols] = this.getMatrixDimensions();
    if (nRows === 0 || nCols === 0) return;

    let [drawWidth, drawHeight] = this.#getDrawDimensions();
    let excess = drawWidth - this.#maxWidth;
    let excessPerLed = excess / nCols;

    if (excess > 0) {
      // If the LEDs need to be drawn very small then shrink the gap between LEDs.
      if (excessPerLed > ((DEFAULT_LED_SIZE - MIN_LED_SIZE) / 2)) {
        this.#drawLedGap = MIN_LED_GAP;
        [drawWidth, drawHeight] = this.#getDrawDimensions();
        excess = drawWidth - this.#maxWidth;
        excessPerLed = excess / nCols;
      }

      let newLedSize = this.#drawLedSize - Math.ceil(excessPerLed);
      // We'll only draw the LEDs so small.
      if (newLedSize < MIN_LED_SIZE) {
        newLedSize = MIN_LED_SIZE;
      }
      this.#drawLedSize = newLedSize;
      [drawWidth, drawHeight] = this.#getDrawDimensions();
    }

    console.debug(`updateLayout() drawLedSize=${this.#drawLedSize} drawLedGap=${this.#drawLedGap} drawWidth=${drawWidth} drawHeight=${drawHeight}`);
    this.#canvas.width = drawWidth;
    this.#canvas.height = drawHeight;
    this.draw();
  }

  /**
   * The dimensions of the drawing, using the current #drawLedSize and #drawLedGap.
   * @returns {number[]} [width, height]
   */
  #getDrawDimensions() {
    const [nRows, nCols] = this.getMatrixDimensions();
    const width = (nCols * this.#drawLedSize) + ((nCols+1) * this.#drawLedGap);
    const height = (nRows * this.#drawLedSize) + ((nRows+1) * this.#drawLedGap);
    return [width, height];
  }

  /**
   * Draw the main matrix editor canvas.
   */
  draw() {
    const [nRows, nCols] = this.getMatrixDimensions();
    if (nRows === 0 || nCols === 0) return;
    if (this.#maxWidth === 0) return;

    // Draw the gaps between LEDs. This is just one big background rectangle.
    const [gapDrawWidth, gapDrawHeight] = this.#getDrawDimensions();
    this.#ctx.fillStyle = LED_GAP_COLOUR;
    this.#ctx.fillRect(0, 0, gapDrawWidth, gapDrawHeight);

    // Now each LED individually.
    for (let rowIdx = 0; rowIdx < nRows; rowIdx++) {
      const row = this.#leds[rowIdx];
      for (let colIdx = 0; colIdx < nCols; colIdx++) {
        const ledPresent = row[colIdx];
        if (ledPresent) {
          this.#ctx.fillStyle = LED_PRESENT_COLOUR;
        } else {
          this.#ctx.fillStyle = LED_NOT_PRESENT_COLOUR;
        }

        const x = this.#drawLedGap + (colIdx * (this.#drawLedGap + this.#drawLedSize));
        const y = this.#drawLedGap + (rowIdx * (this.#drawLedGap + this.#drawLedSize));
        this.#ctx.fillRect(x, y, this.#drawLedSize, this.#drawLedSize);
      }
    }
  }

  /**
   * Load the default face matrix.
   */
  loadDefaultFace() {
    this.setMatrixDimensions(DEFAULT_FACE_N_ROWS, DEFAULT_FACE_N_COLS);
    this.setLedPresenceAll(true);
    for (let rowIdx = DEFAULT_FACE_CUTOUT_ROW_BEGIN; rowIdx <= DEFAULT_FACE_CUTOUT_ROW_END; rowIdx++) {
      for (let colIdx = DEFAULT_FACE_CUTOUT_COL_BEGIN; colIdx <= DEFAULT_FACE_CUTOUT_COL_END; colIdx++) {
        this.setLedPresence(rowIdx, colIdx, false);
      }
    }
  }

  /**
   * Load the default logo matrix.
   */
  loadDefaultLogo() {
    this.setMatrixDimensions(DEFAULT_LOGO_N_ROWS, DEFAULT_LOGO_N_COLS);
    this.setLedPresenceAll(false);
    for (const [row, col] of DEFAULT_LOGO_PRESENT_LEDS) {
      this.setLedPresence(row, col, true);
    }
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
        row.fill(true, currentCols);
      }
    }

    this.#updateLayout();
  }

  /**
   * Set the presence of all LEDs in the matrix.
   * @param {boolean} present
   */
  setLedPresenceAll(presence) {
    for (const row of this.#leds) {
      row.fill(presence);
    }
  }

  /**
   * Set the presence of an LED in the matrix.
   * @param {number} row
   * @param {number} col
   * @param {boolean} present
   */
  setLedPresence(row, col, present) {
    const [nRows, nCols] = this.getMatrixDimensions();

    if (row < 0 || row >= nRows || col < 0 || col >= nCols) {
      console.warn(`Tried to change invalid LED (row=${row} col=${col})`);
      return;
    }

    this.#leds[row][col] = present;
  }
}
