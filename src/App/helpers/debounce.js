/**
 * debounce
 */
let _debounceTimeout;
export default function debounce(func, delay) {
    clearTimeout(_debounceTimeout);
    _debounceTimeout = setTimeout(func, delay);
    return _debounceTimeout;
}
