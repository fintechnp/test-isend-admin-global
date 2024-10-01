export const getPaymentType = (paymentType) => {
    return {
        B: "Bank",
        W: "Choose Wallet",
        C: "Choose cash pickup location",
    }[paymentType];
};
