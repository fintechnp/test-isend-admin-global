class numberUtils {

    /**
     * format number to locale string
     * @param {Number} value 
     * @returns 
     */
    format(value) {
        return (value ?? 0).toLocaleString();
    }

}

export default new numberUtils();
