const PaymentType = {
    cashPickup: "C",
    bankTransfer: "B",
    wallet: "W",
    all: function () {
        return [this.cashPickup, this.bankTransfer, this.wallet];
    },
};

export default PaymentType;
