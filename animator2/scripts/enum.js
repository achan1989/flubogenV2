export function Enum(...enumerators) {
  const type = {};

  for (let i = 0; i < enumerators.length; i++) {
    console.assert(typeof enumerators[i] === "string" || enumerators[i] instanceof String);
    Object.defineProperty(type, enumerators[i], {enumerable: true, value: i});
  }

  Object.defineProperty(type, "parse", {value: (input) => {
    for (let i = 0; i < enumerators.length; i++) {
      if (input === enumerators[i] || input == i) return i;
    }
    throw new Error("Not an enum value: " + input);
  }});

  return Object.freeze(type);
}
