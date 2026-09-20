// Simpler manipulation of the DOM.

/**
 * Concise version of document.createElement() followed by setAttribute(), appendChild(), etc.
 *
 * @param {string} tagName HTML tag name
 * @param {object} properties Object to set the element's properties/attributes.
 * @param {string | string[] | HTMLElement[] } children Append children to this element.
 * A single string, or a list of [string or HTMLElement]. Strings become text nodes, elements are
 * appended as-is.
 * @returns {HTMLElement}
 */
export function createElement(tagName, properties, children) {
  /** @type {HTMLElement} */
  const e = document.createElement(tagName);

  for (const key in properties) {
    e.setAttribute(key, properties[key]);
  }

  if (typeof children === "string" || children instanceof String) {
    const childNode = document.createTextNode(children);
    e.appendChild(childNode);
  } else {
    for (const child of children) {
      if (typeof child === "string" || child instanceof String) {
        const childNode = document.createTextNode(child);
        e.appendChild(childNode);
      } else {
        e.appendChild(child);
      }
    }
  }

  return e;
}
