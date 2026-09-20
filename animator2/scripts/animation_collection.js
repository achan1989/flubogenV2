// Holds all of the animations in the project and their order.

import {Enum} from "./enum.js";
import { animationCollectionChangedEvent } from "./events.js";


export class AnimationCollection {
  /** @type {Animation} */
  startupAnimation;
  /** @type {Animation} */
  idleAnimation;
  /** @type {Animation[]} */
  randomAnimations;
  /** @type {Animation[]} */
  commandAnimations;

  currentlyEditing;

  setEditing(kind, idx) {
    this.currentlyEditing = [kind, idx];
    console.debug(`AnimationCollection changed (editing ${this.currentlyEditing})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  add(kind) {
    let list;
    switch (kind) {
      case AnimationKind.RANDOM:
        list = this.randomAnimations;
        break;
      case AnimationKind.COMMAND:
        list = this.commandAnimations;
        break;
      default:
        throw new Error(`Invalid kind ${kind}`);
    }

    list.push(new Animation());

    console.debug(`AnimationCollection changed (add ${kind})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }
};

export function forNewProject() {
  const collection = new AnimationCollection();

  collection.startupAnimation = new Animation();
  collection.idleAnimation = new Animation();
  collection.randomAnimations = [new Animation()];
  collection.commandAnimations = [];

  collection.currentlyEditing = [AnimationKind.STARTUP, null];

  return collection;
}

export class Animation {
  nFrames = 1;
  fps = 10;
}

export const AnimationKind = Enum("STARTUP", "IDLE", "RANDOM", "COMMAND");
