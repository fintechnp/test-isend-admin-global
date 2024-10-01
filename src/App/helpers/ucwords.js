/**
 * Convert the first character of each word to uppercase
 *
 * @param {string} value
 * @return {string}
 */
export default function ucwords(value) {
    return value?.toLowerCase()?.replace(/\b[a-z]/g, function (letter) {
        return letter?.toUpperCase();
    });
}
