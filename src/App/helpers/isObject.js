/**
 * check if the given value is an object
 *
 * @param {any} value
 * @return {boolean}
 */
export function isObject(value) {
  return value !== null && typeof value === 'object';
}
