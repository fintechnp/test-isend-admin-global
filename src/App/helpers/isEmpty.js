/**
 * check if value is empty
 *
 * @param {any} value
 * @return {boolean}
 */
export default function isEmpty(value) {
    return (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && Object.entries(value).length === 0)
    );
}
