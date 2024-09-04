export const validURlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/\S*)?$/;

export default function isValidURL(url) {
    return validURlRegex.test(url);
}
