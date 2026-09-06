import {MatrixEditor} from "./matrix_editor.js";


let editor;
let resizeObserver;


function init() {
  const container = document.querySelector("#matrices_default");
  const maxWidth = Math.round(container.clientWidth * 0.95);

  const canvas = document.querySelector("#matrices_canvas");
  editor = new MatrixEditor(canvas, maxWidth);

  resizeObserver = new ResizeObserver(onContainerResized);
  resizeObserver.observe(container);
}

function onContainerResized(entries, observer) {
  const maxWidth = entries[0].target.clientWidth;
  editor.resizeCanvas(maxWidth);
}


export { init };
