export class MatrixEditor {
  #canvas;
  #ctx;
  #maxWidth;

  constructor(canvas, maxWidth) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d", {alpha: false});

    this.#maxWidth = maxWidth;
    canvas.width = maxWidth;

    if (maxWidth == 0) return;
    this.resizeCanvas(maxWidth);
  }

  resizeCanvas(width) {
    this.#maxWidth = width;
    this.#canvas.width = width;

    this.#ctx.fillStyle = "green";
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }
}
