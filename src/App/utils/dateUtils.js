import { RangeType } from "App/data/RangeType";
import moment from "moment";
import dayjs from "dayjs";
class dateUtils {
    today() {
        return new Date().toISOString().slice(0, 10);
    }

    convertDate(date) {
        const dateArray = date.split("T")[0];
        return dateArray;
    }

    getFormattedDate(date, dateFormat = "MMM D, YYYY hh:mm A") {
        return moment(date).format(dateFormat);
    }

    getFromDate(date, dateFormat = "YYYY/MM/DD") {
        const date1 = moment(date).format(dateFormat);
        return new Date(`${date1} 00:00:00`).toISOString();
    }

    getToDate(date, dateFormat = "YYYY/MM/DD") {
        const date1 = moment(date).format(dateFormat);
        return new Date(`${date1} 23:59:59`).toISOString();
    }

    getDateRange(period) {
        let startDate, endDate, previousStartDate, previousEndDate;

        switch (period) {
            case RangeType.DAILY:
                startDate = dayjs().startOf("day");
                endDate = dayjs().endOf("day");
                previousStartDate = startDate.subtract(1, "day").startOf("day");
                previousEndDate = previousStartDate.endOf("day");
                break;
            case RangeType.WEEKLY:
                startDate = dayjs().startOf("week");
                endDate = dayjs().endOf("week");
                previousStartDate = startDate.subtract(1, "week").startOf("week");
                previousEndDate = previousStartDate.endOf("week");
                break;
            case RangeType.MONTHLY:
                startDate = dayjs().startOf("month");
                endDate = dayjs().endOf("month");
                previousStartDate = startDate.subtract(1, "month").startOf("month");
                previousEndDate = previousStartDate.endOf("month");
                break;
            case RangeType.YEARLY:
                startDate = dayjs().startOf("year");
                endDate = dayjs().endOf("year");
                previousStartDate = startDate.subtract(1, "year").startOf("year");
                previousEndDate = previousStartDate.endOf("year");
                break;
            default:
                throw new Error("Invalid period type");
        }

        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            previousStartDate: previousStartDate.toISOString(),
            previousEndDate: previousEndDate.toISOString(),
        };
    }
}

export default new dateUtils();
