import * as AppState from "./app_state.js";
import {MatrixEditor} from "./matrix_editor.js";
import {ConfigurationChoice} from "./matrices_state.js";


/** @type {HTMLElement} */
let container;
let editors;
let resizeObserver;


function init() {
  if (AppState.matrices().configurationChoice == ConfigurationChoice.DEFAULT) {
    document.querySelector("#matrices_configurationChoiceDefault").setAttribute("checked", "true");
    document.querySelector("#matrices_configurationChoiceCustom").removeAttribute("checked");
  } else {
    document.querySelector("#matrices_configurationChoiceDefault").removeAttribute("checked");
    document.querySelector("#matrices_configurationChoiceCustom").setAttribute("checked", "true");
  }

  container = document.querySelector("#matrices_container");
  editors = [];

  if (AppState.matrices().configurationChoice == ConfigurationChoice.DEFAULT) {
    for (const matrixDef of AppState.matrices().defaultMatrices) {
      appendEditor(matrixDef);
    }
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

function appendEditor(matrixDefinition) {
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  container.appendChild(document.createElement("hr"));

  const maxWidth = Math.round(container.clientWidth);
  const editor = new MatrixEditor(canvas, maxWidth, matrixDefinition);
  editors.push(editor);
  return editor;
}


export { init };
