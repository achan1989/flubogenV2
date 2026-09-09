export function Enum(...enumerators) {
  const type = {};
  for (let i = 0; i < enumerators.length; i++) {
    Object.defineProperty(type, enumerators[i], {enumerable: true, value: i});
  }
  return Object.freeze(type);
}
