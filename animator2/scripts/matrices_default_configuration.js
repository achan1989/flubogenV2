import { MatrixDefinition } from "./matrix_types.js"


export function defaultFace() {
  const def = new MatrixDefinition();
  def.name = "face";
  const O = true;
  const ˑ = false;
  def.leds = [
    [O,O,O,O,O,O,O,O,O,O,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O],
    [O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O],
  ];
  return def;
}

function logoLeds() {
  const O = true;
  const ˑ = false;
  const leds = [
    [ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ],
    [ˑ,O,ˑ,ˑ,ˑ,O,ˑ],
    [ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ],
    [O,ˑ,ˑ,O,ˑ,ˑ,O],
    [ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ],
    [ˑ,O,ˑ,ˑ,ˑ,O,ˑ],
    [ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ],
  ];
  return leds;
}

export function defaultCheeks() {
  const def = new MatrixDefinition();
  def.name = "cheeks";
  def.leds = logoLeds();
  return def;
}

export function defaultShoulders() {
  const def = new MatrixDefinition();
  def.name = "shoulders";
  def.leds = logoLeds();
  return def;
}

export function defaultLegs() {
  const def = new MatrixDefinition();
  def.name = "legs";
  const O = true;
  const ˑ = false;
  def.leds = [
    [ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ],
    [ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ],
    [ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ],
    [ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ],
    [O,ˑ,ˑ,ˑ,O,ˑ,ˑ,O,ˑ,ˑ,O,ˑ,ˑ,ˑ,O],
    [ˑ,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,ˑ],
    [ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ],
    [ˑ,O,O,O,O,ˑ,ˑ,O,ˑ,ˑ,O,O,O,O,ˑ],
    [ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ],
    [ˑ,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,ˑ],
    [O,ˑ,ˑ,ˑ,O,ˑ,ˑ,O,ˑ,ˑ,O,ˑ,ˑ,ˑ,O],
    [ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ],
    [ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ],
    [ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ],
    [ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ,ˑ],
  ];
  return def;
}
