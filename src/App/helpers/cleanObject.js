/**
 * remove blank attributes from object
 *
 * @param {Object} obj - object to clean
 * @param {Array} keys - Arrays of keys to remove
 * @return {Object}
 */
export default function cleanObject(obj = {}, removeTheseKeys = []) {
  return Object.keys(obj).reduce((acc, key) => {
    if (!['', null, undefined].includes(obj[key]) && !removeTheseKeys.includes(key))
      acc[key] = obj[key];
    return acc;
  }, {});
}
