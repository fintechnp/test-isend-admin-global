import moment from "moment";

export const convertDate = (date) => {
    const originalDate = moment(date);
    return originalDate.format("YYYY-MM-DD");
};
