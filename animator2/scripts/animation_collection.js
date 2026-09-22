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

    this.resolveCurrentlyEditing(kind, idx);

    console.debug(`AnimationCollection changed (remove ${kind} ${idx})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  /**
   * Move an animation up.
   * @param {*} kind
   * @param {*} idx
   */
  moveUp(kind, idx) {
    console.assert(kind !== AnimationKind.STARTUP);
    console.assert(kind !== AnimationKind.IDLE);
    console.assert(kind !== AnimationKind.RANDOM);
    if (idx === 0) return;

    const thisList = this.listForKind(kind);
    const tempAnim = thisList[idx - 1];
    thisList[idx - 1] = thisList[idx];
    thisList[idx] = tempAnim;

    const [currentKind, currentIdx] = this.currentlyEditing;
    if (kind === currentKind) {
      if (idx === currentIdx) {
        this.currentlyEditing = [currentKind, idx - 1];
      }
      else if (idx - 1 === currentIdx) {
        this.currentlyEditing = [currentKind, idx];
      }
    }

    console.debug(`AnimationCollection changed (moved ${kind} ${idx})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  /**
   * Move an animation down.
   * @param {*} kind
   * @param {*} idx
   */
  moveDown(kind, idx) {
    console.assert(kind !== AnimationKind.STARTUP);
    console.assert(kind !== AnimationKind.IDLE);
    console.assert(kind !== AnimationKind.RANDOM);

    const thisList = this.listForKind(kind);
    if (idx === (thisList.length - 1)) return;

    const tempAnim = thisList[idx + 1];
    thisList[idx + 1] = thisList[idx];
    thisList[idx] = tempAnim;

    const [currentKind, currentIdx] = this.currentlyEditing;
    if (kind === currentKind) {
      if (idx === currentIdx) {
        this.currentlyEditing = [currentKind, idx + 1];
      }
      else if (idx + 1 === currentIdx) {
        this.currentlyEditing = [currentKind, idx];
      }
    }

    console.debug(`AnimationCollection changed (moved ${kind} ${idx})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  /**
   * Move an animation to the command list
   * @param {AnimationKind} kind
   * @param {number} idx
   */
  moveToCommand(kind, idx) {
    console.assert(kind === AnimationKind.RANDOM);

    const randAnim = this.randomAnimations.splice(idx, 1)[0];
    const newIdx = this.commandAnimations.push(randAnim) - 1;

    const [currentKind, currentIdx] = this.currentlyEditing;
    if (kind === currentKind && idx === currentIdx) {
      this.currentlyEditing = [AnimationKind.COMMAND, newIdx];
    }
    this.resolveCurrentlyEditing(kind, idx);

    console.debug(`AnimationCollection changed (moveToCommand ${kind} ${idx})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  /**
   * Move an animation to the random list
   * @param {AnimationKind} kind
   * @param {number} idx
   */
  moveToRandom(kind, idx) {
    console.assert(kind === AnimationKind.COMMAND);

    const cmdAnim = this.commandAnimations.splice(idx, 1)[0];
    const newIdx = this.randomAnimations.push(cmdAnim) - 1;

    const [currentKind, currentIdx] = this.currentlyEditing;
    if (kind === currentKind && idx === currentIdx) {
      this.currentlyEditing = [AnimationKind.RANDOM, newIdx];
    }
    this.resolveCurrentlyEditing(kind, idx);

    console.debug(`AnimationCollection changed (moveToRandom ${kind} ${idx})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  /**
   * Swap a random or command animation with the startup animation.
   * @param {AnimationKind} kind
   * @param {number} idx
   */
  swapWithStartup(kind, idx) {
    console.assert(kind === AnimationKind.RANDOM || kind === AnimationKind.COMMAND);

    const oldStartup = this.startupAnimation;
    const theList = this.listForKind(kind);
    this.startupAnimation = theList[idx];
    theList[idx] = oldStartup;

    const [currentKind, currentIdx] = this.currentlyEditing;
    if (kind === currentKind && idx === currentIdx) {
      this.currentlyEditing = [AnimationKind.STARTUP, null];
    }
    else if (currentKind === AnimationKind.STARTUP) {
      this.currentlyEditing = [kind, idx];
    }

    console.debug(`AnimationCollection changed (swapWithStartup ${kind} ${idx})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  /**
   * Swap a random or command animation with the idle animation.
   * @param {AnimationKind} kind
   * @param {number} idx
   */
  swapWithIdle(kind, idx) {
    console.assert(kind === AnimationKind.RANDOM || kind === AnimationKind.COMMAND);

    const oldIdle = this.idleAnimation;
    const theList = this.listForKind(kind);
    this.idleAnimation = theList[idx];
    theList[idx] = oldIdle;

    const [currentKind, currentIdx] = this.currentlyEditing;
    if (kind === currentKind && idx === currentIdx) {
      this.currentlyEditing = [AnimationKind.IDLE, null];
    }
    else if (currentKind === AnimationKind.IDLE) {
      this.currentlyEditing = [kind, idx];
    }

    console.debug(`AnimationCollection changed (swapWithIdle ${kind} ${idx})`);
    document.dispatchEvent(animationCollectionChangedEvent);
  }

  /**
   * When an animation is removed from a list, currentlyEditing can become stale or invalid.
   * Pick a new value if necessary.
   * @param {*} removedKind
   * @param {*} removedIdx
   */
  resolveCurrentlyEditing(removedKind, removedIdx) {
    console.assert(removedKind !== AnimationKind.STARTUP);
    console.assert(removedKind !== AnimationKind.IDLE);
    const [currentKind, currentIdx] = this.currentlyEditing;
    if (currentKind !== removedKind) return;

    const theList = this.listForKind(currentKind);

    if (theList.length == 0) {
      console.debug("Resolve, none left, choose startup");
      this.currentlyEditing = [AnimationKind.STARTUP, null];
    }
    else if (removedIdx < currentIdx) {
      console.debug("Resolve, removed before, decrement");
      this.currentlyEditing = [currentKind, currentIdx - 1];
    }
    else if (removedIdx > currentIdx) {
      console.debug("Resolve, removed after, noop");
    }
    else if (removedIdx === currentIdx) {
      if (removedIdx >= theList.length) {
        console.debug("Resolve, deleted last, use new last");
        this.currentlyEditing = [currentKind, theList.length - 1];
      }
      else {
        console.debug("Resolve, deleted current, keep index");
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
  collection.randomAnimations = [];
  collection.commandAnimations = [];

  collection.currentlyEditing = [AnimationKind.STARTUP, null];

  return collection;
}

export class Animation {
  nFrames = 1;
  fps = 10;
}

export const AnimationKind = Enum("STARTUP", "IDLE", "RANDOM", "COMMAND");
