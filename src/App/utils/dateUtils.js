import dayjs from "dayjs";
import { RangeType } from "App/data/RangeType";
import { add, parseISO, sub } from "date-fns";

class dateUtils {
    today() {
        return new Date().toISOString().slice(0, 10);
    }

    convertDate(date) {
        const dateArray = date.split("T")[0];
        return dateArray;
    }

    getFormattedDate(date, dateFormat = "MMM DD, YYYY hh:mm A") {
        return dayjs(new Date(date)).format(dateFormat);
    }

    getFromDate(date) {
        return dayjs(date).startOf("day").toISOString();
    }

    getToDate(date) {
        return dayjs(date).endOf("day").toISOString();
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

    #getUTC(value) {
        return value?.split("+")[0] ?? value;
    }

    /**
     * get local date from UTC
     */
    getLocalDateFromUTC(utcDateTime, dateFormat = "MM/DD/YYYY") {
        utcDateTime = this.#getUTC(utcDateTime);
        if (!utcDateTime?.endsWith("Z")) utcDateTime = utcDateTime + "Z";
        return dayjs(utcDateTime).format(dateFormat);
    }

    /**
     * get local date from UTC
     */
    getLocalTimeFromUTC(utcDateTime, timeFormat = "hh:mm A") {
        utcDateTime = this.#getUTC(utcDateTime);
        if (!utcDateTime.endsWith("Z")) utcDateTime = utcDateTime + "Z";
        return dayjs(utcDateTime).format(timeFormat);
    }

    /**
     * get local date from UTC
     */
    getLocalDateTimeFromUTC(utcDateTime, dateFormat = "MM/DD/YYYY hh:mm A") {
        utcDateTime = this.#getUTC(utcDateTime);
        if (!utcDateTime?.endsWith("Z")) utcDateTime = utcDateTime + "Z";
        return dayjs(utcDateTime).format(dateFormat);
    }

    /**
     * get days difference
     *
     * @param {string} startDate
     * @param {string} endDate
     * @returns {number}
     */
    getDaysDifference(startDate, endDate) {
        const date1 = dayjs(startDate);
        const date2 = dayjs(endDate);
        return date2.diff(date1, "day");
    }

    /**
     * Subtracts a given number of days from a date.
     *
     * @param {string} date
     * @param {number} days
     * @param {string} dateFormat
     * @returns {string}
     */
    subtractDaysFromDate(date, days, dateFormat = "YYYY-MM-DD") {
        const originalDate = dayjs(date);
        const newDate = originalDate.subtract(days, "day");
        return newDate.format(dateFormat);
    }

    /**
     * get previous date range
     *
     * @param {string} startDate
     * @param {string} endDate
     * @param {string} dateFormat
     * @returns {object} - { startDate, endDate }
     */
    getPreviousDateRange(startDate, endDate, dateFormat = "YYYY-MM-DD") {
        const difference = this.getDaysDifference(startDate, endDate);
        startDate = dayjs(startDate).subtract(difference, "day").format(dateFormat);
        endDate = dayjs(endDate).subtract(difference, "day").format(dateFormat);
        return {
            startDate,
            endDate,
        };
    }

    getDate(date) {
        return date?.startsWith("0001-01-01") ? null : date?.substring(0, 10);
    }

    /**
     * Get date 2 weeks ago from today
     *
     * @returns {string} - date 2 weeks ago from today in ISO format
     */
    getDateBeforeTwoWeeks() {
        return dayjs().subtract(15, "day").startOf("day").toISOString();
    }

    /**
     * Get today's date
     *
     * @returns {string} - today's date in ISO format
     */
    getTodayDate() {
        return dayjs().endOf("day").toISOString();
    }
    getDateBeforeOneMonth() {
        const dateBeforeOneMonth = sub(new Date(), { months: 1 });
        return parseISO(dateBeforeOneMonth.toISOString().split("T")[0]);
    }
    getDateAfterOneMonth() {
        const dateBeforeOneMonth = add(new Date(), { months: 1 });
        return parseISO(dateBeforeOneMonth.toISOString().split("T")[0]);
    }
}

export default new dateUtils();
