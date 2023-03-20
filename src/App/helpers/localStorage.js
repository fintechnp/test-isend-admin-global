if (typeof Storage === 'undefined') {
  // Sorry! No Web Storage support...
}

/**
 * Check if key exists in local storage
 * @param  string key
 * @return boolean
 */
function localStorageHas(key) {
  var item = localStorage.getItem(key);

  return item !== null;
}

/**
 * Retrive an object from local storage.
 * @param  string key
 * @return mixed
 */
function localStorageGet(key) {
  var item = localStorage.getItem(key);

  if (!item) return;

  if (item[0] === '{' || item[0] === '[') return JSON.parse(item);

  return item;
}

/**
 * Save some value to local storage.
 * @param string key
 * @param string value
 */
function localStorageSave(key, value) {
  if (value === undefined) throw new Error("Can't store undefined value");

  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  if (typeof value !== 'string') throw new Error("Can't store unrecognized format value");

  localStorage.setItem(key, value);
}

/**
 * Remove element from local storage.
 * @param string key
 */
function localStorageRemove(key) {
  localStorage.removeItem(key);
}

export { localStorageGet, localStorageHas, localStorageRemove, localStorageSave };
