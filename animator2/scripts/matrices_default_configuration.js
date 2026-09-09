import { MatrixDefinition } from "./matrix_types.js"


export function defaultFace() {
  const def = new MatrixDefinition();
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

export function defaultLogo() {
  const def = new MatrixDefinition();
  const O = true;
  const ˑ = false;
  def.leds = [
    [ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ],
    [ˑ,O,ˑ,ˑ,ˑ,O,ˑ],
    [ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ],
    [O,ˑ,ˑ,O,ˑ,ˑ,O],
    [ˑ,ˑ,ˑ,ˑ,ˑ,ˑ,ˑ],
    [ˑ,O,ˑ,ˑ,ˑ,O,ˑ],
    [ˑ,ˑ,ˑ,O,ˑ,ˑ,ˑ],
  ];
  return def;
}

export function defaultLeg() {
  const def = new MatrixDefinition();
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
