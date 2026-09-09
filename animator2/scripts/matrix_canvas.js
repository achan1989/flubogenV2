const DEFAULT_LED_SIZE = 25;
const MIN_LED_SIZE = 10;
const DEFAULT_LED_GAP = 4;
const MIN_LED_GAP = 2;


/** Says how to draw an LED in the matrix. */
export class LedVis {
  /** @type {boolean} */
  present;
  /** @type {string} */
  colour;

  constructor(present, colour) {
    this.present = present;
    this.colour = colour;
  }

  static present(colour) {
    return new LedVis(true, colour);
  }

  static absent(colour) {
    return new LedVis(false, colour);
  }
}


/**
 * Draws an LED matrix and supports interaction.
 *
 * A matrix is a rectangular shape, some number of rows and columns.
 * Some LEDs may not be present. Currently this has no effect; in the future it may affect the
 * drawing style.
 */
export class MatrixCanvas {
  /** @type {HTMLCanvasElement} */
  #canvas;
  /** @type {CanvasRenderingContext2D} */
  #ctx;


  /**
   * Create a new MatrixCanvas. Starts empty.
   * @param {HTMLCanvasElement} canvas The canvas element.
   */
  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d", {alpha: false});
  }

  /**
   * Draw the matrix within the allowed width.
   * @param {LedVis[][]} matrix
   * @param {number} maxWidth
   * @param {string} ledGapColour
   */
  draw(matrix, maxWidth, ledGapColour) {
    errorIfCantDraw(matrix, maxWidth);

    const [nRows, nCols] = getMatrixDimensions(matrix);
    const [width, height, ledSize, ledGap] = calculateLayout(nRows, nCols, maxWidth);
    this.#canvas.width = width;
    this.#canvas.height = height;

    // Draw the gaps between LEDs. This is just one big background rectangle.
    this.#ctx.fillStyle = ledGapColour;
    this.#ctx.fillRect(0, 0, width, height);

    // Now each LED individually.
    for (let rowIdx = 0; rowIdx < nRows; rowIdx++) {
      const row = matrix[rowIdx];
      for (let colIdx = 0; colIdx < nCols; colIdx++) {
        const led = row[colIdx];
        this.#ctx.fillStyle = led.colour;

        const x = ledGap + (colIdx * (ledGap + ledSize));
        const y = ledGap + (rowIdx * (ledGap + ledSize));
        this.#ctx.fillRect(x, y, ledSize, ledSize);
      }
    }
  }
}


/**
 * Throw an error if we can't draw in this state.
 */
function errorIfCantDraw(matrix, maxWidth) {
  const [nRows, nCols] = getMatrixDimensions(matrix);
  if (nRows === 0 || nCols === 0) {
    throw new Error("Can't draw a matrix with a 0 dimension");
  }
  if (maxWidth === 0) {
    throw new Error("Can't draw into 0 maxWidth");
  }
}

/**
 * Get the LED matrix dimensions.
 * @param {LedVis[][]} matrix
 * @returns {number[]} [number of rows, number of columns]
 */
function getMatrixDimensions(matrix) {
  const nRows = matrix.length;
  let nCols = matrix[0]?.length;
  nCols ??= 0;
  return [nRows, nCols];
}

/**
 * The dimensions of the drawing, using the given parameters.
 * @param {number} nRows
 * @param {number} nCols
 * @param {number} ledSize The side length of an LED.
 * @param {number} ledGap The gap between LEDs.
 * @returns {number[]} [width, height]
 */
function getDrawingDimensions(nRows, nCols, ledSize, ledGap) {
  const width = (nCols * ledSize) + ((nCols+1) * ledGap);
  const height = (nRows * ledSize) + ((nRows+1) * ledGap);
  return [width, height];
}

/**
 * Calculate the drawing layout.
 * @param {number} nRows Number of rows in the matrix
 * @param {number} nCols Number of columns in the matrix
 * @param {number} maxWidth
 * @returns {number[]} [width, height, ledSize, ledGap]
 */
function calculateLayout(nRows, nCols, maxWidth) {
  let ledSize = DEFAULT_LED_SIZE;
  let ledGap = DEFAULT_LED_GAP;

  let [width, height] = getDrawingDimensions(nRows, nCols, ledSize, ledGap);
  let excess = width - maxWidth;
  let excessPerLed = excess / nCols;

  if (excess > 0) {
    // If the LEDs need to be drawn very small then shrink the gap between LEDs.
    if (excessPerLed > ((DEFAULT_LED_SIZE - MIN_LED_SIZE) / 2)) {
      ledGap = MIN_LED_GAP;
      [width, height] = getDrawingDimensions(nRows, nCols, ledSize, ledGap);
      excess = width - maxWidth;
      excessPerLed = excess / nCols;
    }

    let newLedSize = ledSize - Math.ceil(excessPerLed);
    // We'll only draw the LEDs so small.
    if (newLedSize < MIN_LED_SIZE) {
      newLedSize = MIN_LED_SIZE;
    }
    ledSize = newLedSize;
    [width, height] = getDrawingDimensions(nRows, nCols, ledSize, ledGap);
  }

  console.debug(`calculateLayout() ${nCols}x${nRows} ledSize=${ledSize} ledGap=${ledGap} width=${width} height=${height}`);
  return [width, height, ledSize, ledGap];
}
