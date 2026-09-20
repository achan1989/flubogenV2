import { AnimationKind } from "./animation_collection.js";
import * as AppState from "./app_state.js";
import { createElement } from "./dom.js";


export function init() {
  populateLists();
  document.addEventListener("animationCollectionChanged", () => populateLists());

  document.querySelector("#newRandomAnimation").addEventListener("click", (evt) => {
    AppState.animations().add(AnimationKind.RANDOM);
  });
  document.querySelector("#newCommandAnimation").addEventListener("click", (evt) => {
    AppState.animations().add(AnimationKind.COMMAND);
  });
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

  const editButton = createElement("button", {}, "Edit");
  editButton.addEventListener("click", () => AppState.animations().setEditing(kind, idx));
  const buttons = [editButton];

  if (kind == AnimationKind.COMMAND) {
    buttons.push(
      createElement("button", {}, "↑"),
      createElement("button", {}, "↓"),
    );
  }
  if (kind == AnimationKind.RANDOM || kind == AnimationKind.COMMAND) {
    buttons.push(
      createElement("button", {}, "Delete"),
      createElement("button", {}, "Swap with startup"),
      createElement("button", {}, "Swap with idle"),
    );
  }

  const showEditing = {class: "editing"};
  const hideEditing = {};
  const li = createElement("li", {}, [
    createElement("span", thisEditing ? showEditing : hideEditing, "📝"),
    createElement("span", {}, name),
    createElement("span", {}, buttons),
  ]);
  return li;
}
