import isEmpty from "./isEmpty";
import lowercase from "lodash/lowerCase";
import capitalize from "lodash/capitalize";

export const getCustomerName = (customer) => {
    if (isEmpty(customer)) return "";
    const { first_name, middle_name, last_name } = customer;
    const nameParts = [first_name, middle_name, last_name].filter((part) => part && part !== "undefined");
    const fullName = nameParts.join(" ").trim();
    return capitalize(lowercase(fullName || ""));
};

export const getBeneficiaryFullName = (beneficiary) => {
    if (isEmpty(beneficiary)) return "";
    const { first_name, middle_name, last_name } = beneficiary;
    const nameParts = [first_name, middle_name, last_name].filter((part) => part);
    const fullName = nameParts.join(" ").trim();
    return capitalize(lowercase(fullName || ""));
};
