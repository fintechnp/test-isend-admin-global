class dateUtils {
    today() {
        return new Date().toISOString().slice(0, 10);
    }

    convertDate(date) {
        const dateArray = date.split("T")[0];
        return dateArray;
    }

    format(string) {}
}

export default new dateUtils();
