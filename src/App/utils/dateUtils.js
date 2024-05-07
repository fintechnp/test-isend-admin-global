import moment from "moment";

class dateUtils {
    today() {
        return new Date().toISOString().slice(0, 10);
    }

    convertDate(date) {
        const dateArray = date.split("T")[0];
        return dateArray;
    }

    getFormattedDate(date, dateFormat = "MMM D, YYYY hh:mm A") {
        return moment(date).format(dateFormat)
    }

    getFromDate(date, dateFormat = "YYYY/MM/DD") {
        const date1 = moment(date).format(dateFormat);
        return new Date(`${date1} 00:00:00`).toISOString();
    }

    getToDate(date, dateFormat = "YYYY/MM/DD") {
        const date1 = moment(date).format(dateFormat);
        return new Date(`${date1} 23:59:59`).toISOString();
    }
}

export default new dateUtils();
