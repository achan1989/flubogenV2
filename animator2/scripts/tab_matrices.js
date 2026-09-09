import {MatrixEditor} from "./matrix_editor.js";


/** @type {HTMLElement} */
let container;
let editors;
let resizeObserver;


function init() {
  container = document.querySelector("#matrices_container");
  editors = [];

  if (isDefault()) {
    const faceEditor = appendEditor();
    faceEditor.loadDefaultFace();

    const cheekEditor = appendEditor();
    cheekEditor.loadDefaultLogo();

    const body0Editor = appendEditor();
    body0Editor.loadDefaultLogo();

    const body1Editor = appendEditor();
    body1Editor.loadDefaultLogo();
  } else {
    console.warn("Unimplemented: custom matrices");
  }

  resizeObserver = new ResizeObserver(onContainerResized);
  resizeObserver.observe(container);
}

function onContainerResized(entries, observer) {
  const maxWidth = entries[0].target.clientWidth;
  for (const editor of editors) {
    editor.setMaxWidth(maxWidth);
  }
}

function isDefault() {
  return document.querySelector("input[name=matrices_configurationChoice]:checked").value === "default";
}

function appendEditor() {
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  container.appendChild(document.createElement("hr"));

  const maxWidth = Math.round(container.clientWidth);
  const editor = new MatrixEditor(canvas, maxWidth);
  editors.push(editor);
  return editor;
}


export { init };
