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

  delete(kind, idx) {
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

    console.assert(idx < list.length);
    list.splice(idx, 1);

    this.resolveCurrentlyEditing();

    console.debug(`AnimationCollection changed (remove ${kind} ${idx})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  /**
   * On list changes, currentlyEditing can become stale or invalid. Pick a new value if necessary.
   */
  resolveCurrentlyEditing() {
    const [currentKind, currentIdx] = this.currentlyEditing;
    if (currentKind === AnimationKind.STARTUP || currentKind === AnimationKind.IDLE) return;

    const theList = this.listForKind(currentKind);

    // If there are no more left then go to the startup animation.
    if (theList.length == 0) {
      console.debug("Resolve delete, none left, choose startup");
      this.currentlyEditing = [AnimationKind.STARTUP, null];
    }
    else
    {
      // Prefer to keep the same index. If this isn't possible it's because we deleted the last
      // one in the list. Select the new last one.
      if (currentIdx >= theList.length) {
        console.debug("Resolve delete, deleted last");
        this.currentlyEditing = [currentKind, theList.length - 1];
      }
    }
  }

  /**
   * Get the animation list for a particular kind of animation.
   * Valid for RANDOM or COMMAND only.
   * @param {AnimationKind} kind
   * @returns {Animation[]}
   */
  listForKind(kind) {
    switch (kind) {
      case AnimationKind.STARTUP:
        throw new Error("Startup animation has no list");
      case AnimationKind.IDLE:
        throw new Error("Idle animation has no list");

      case AnimationKind.RANDOM:
        return this.randomAnimations;
      case AnimationKind.COMMAND:
        return this.commandAnimations;

      default:
        throw new Error(`Invalid kind ${kind}`);
    }
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
