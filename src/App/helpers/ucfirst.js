/**
 * uppercase first letter
 * @param {String} str
 * @return {String}
 */

export default function ucfirst(str) {
  var firstLetter = str?.charAt(0).toUpperCase();
  return firstLetter + str?.substring(1)
}
