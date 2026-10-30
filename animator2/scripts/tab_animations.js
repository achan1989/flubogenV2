import { AnimationKind } from "./animation_collection.js";
import * as AppState from "./app_state.js";
import { createElement } from "./dom.js";
import { MatrixEditor } from "./matrix_editor.js";
import { ConfigurationChoice } from "./matrices_state.js";
import { MatrixDefinition } from "./matrix_types.js";


/** @type {HTMLElement} */
let container;
let editors;
let resizeObserver;


export function init() {
  populateLists();
  document.addEventListener("animationCollectionChanged", () => populateLists());

  document.querySelector("#newRandomAnimation").addEventListener("click", (evt) => {
    AppState.animations().add(AnimationKind.RANDOM);
  });
  document.querySelector("#newCommandAnimation").addEventListener("click", (evt) => {
    AppState.animations().add(AnimationKind.COMMAND);
  });

  container = document.querySelector("#animation_matrices_container");
  editors = [];

  if (AppState.matrices().configurationChoice == ConfigurationChoice.DEFAULT) {
    for (const matrixDef of AppState.matrices().defaultMatrices) {
      appendEditor(matrixDef);
    }
  } else {
    throw new Error("Unimplemented: custom matrices");
  }

  resizeObserver = new ResizeObserver(onContainerResized);
  resizeObserver.observe(container);
}

/**
 * Clear and repopulate the list of animations.
 */
function populateLists() {
  const specialList = document.querySelector("#specialAnimationsList");
  specialList.replaceChildren();
  specialList.appendChild(makeSelectorListItem("Startup animation", AnimationKind.STARTUP, null));
  specialList.appendChild(makeSelectorListItem("Idle animation", AnimationKind.IDLE, null));

  const randomList = document.querySelector("#randomAnimationsList");
  randomList.replaceChildren();
  for (const [i, animation] of AppState.animations().randomAnimations.entries()) {
    randomList.appendChild(makeSelectorListItem("Random " + i, AnimationKind.RANDOM, i));
  }

  const commandList = document.querySelector("#commandAnimationsList");
  commandList.replaceChildren();
  for (const [i, animation] of AppState.animations().commandAnimations.entries()) {
    commandList.appendChild(makeSelectorListItem("Command " + i, AnimationKind.COMMAND, i));
  }
}

/**
 * Create a <li> for an animation.
 *
 * @param {string} name
 * @param {AnimationKind} kind
 * @param {number} idx Index of this item within its `kind` collection. Should be `null` for the
 * special animations.
 * @returns {HTMLElement}
 */
function makeSelectorListItem(name, kind, idx) {
  const [editingKind, editingIdx] = AppState.animations().currentlyEditing;
  const thisEditing = (kind === editingKind && idx === editingIdx);

  const buttons = [
    createElement(
      "button",
      { eventListener: { click: () => AppState.animations().setEditing(kind, idx) } },
      "Edit")
  ];

  if (kind == AnimationKind.COMMAND) {
    buttons.push(
      createElement(
        "button",
        { eventListener: { click: () => AppState.animations().moveUp(kind, idx) } },
        "↑"),
      createElement(
        "button",
        { eventListener: { click: () => AppState.animations().moveDown(kind, idx) } },
        "↓"),
    );
  }
  if (kind == AnimationKind.RANDOM || kind == AnimationKind.COMMAND) {
    buttons.push(
      createElement(
        "button",
        { eventListener: { click: () => AppState.animations().delete(kind, idx) } },
        "Delete"),
      createElement(
        "button",
        { eventListener: { click: () => AppState.animations().swapWithStartup(kind, idx) } },
        "Swap with startup"),
      createElement(
        "button",
        { eventListener: { click: () => AppState.animations().swapWithIdle(kind, idx) } },
        "Swap with idle"),
    );
  }
  if (kind == AnimationKind.RANDOM) {
    buttons.push(
      createElement(
        "button",
        { eventListener: { click: () => AppState.animations().moveToCommand(kind, idx) } },
        "Move to Command"
      )
    );
  }
  if (kind == AnimationKind.COMMAND) {
    buttons.push(
      createElement(
        "button",
        { eventListener: { click: () => AppState.animations().moveToRandom(kind, idx) } },
        "Move to Random"
      )
    );
  }

  const showEditing = { class: "editing" };
  const hideEditing = {};
  const li = createElement("li", {}, [
    createElement("span", thisEditing ? showEditing : hideEditing, "📝"),
    createElement("span", {}, name),
    createElement("span", {}, buttons),
  ]);
  return li;
}

/**
 * Append a matrix editor to the animations tab, under the animation selector box.
 * @param {MatrixDefinition} matrixDefinition Defines the shape of the matrix etc.
 * @returns the editor object.
 */
function appendEditor(matrixDefinition) {
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);
  container.appendChild(document.createElement("hr"));

  const maxWidth = Math.round(container.clientWidth);
  const editor = new MatrixEditor(canvas, maxWidth, matrixDefinition);
  editors.push(editor);
  return editor;
}

/**
 * Resive the matrix editors when the window is resized.
 * @param {ResizeObserverEntry[]} entries Should just be a single entry which is the div element
 * holding the editor canvases.
 * @param {ResizeObserver} observer 
 */
function onContainerResized(entries, observer) {
  const maxWidth = entries[0].target.clientWidth;
  for (const editor of editors) {
    editor.setMaxWidth(maxWidth);
  }
}
