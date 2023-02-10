class dateUtils {
    today() {
        return new Date().toISOString().slice(0, 10);
    }
}

export default new dateUtils();
