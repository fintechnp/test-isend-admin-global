const getCustomerName = (customer) => {
    const { first_name, middle_name, last_name } = customer;
    const nameParts = [first_name, middle_name, last_name].filter((part) => part);
    const fullName = nameParts.join(" ").trim();
    return fullName || "";
};
export default getCustomerName;
