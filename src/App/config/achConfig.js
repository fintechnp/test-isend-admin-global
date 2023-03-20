// Automated Cleaning House (ACH)

const achConfig = {
    transactionType: {
        dr: "DR",
        options: function () {
            return [
                {
                    label: "DR",
                    value: this.dr,
                },
            ];
        },
    },
    status: {
        created: "created",
        processed: "processed",
        sent: "sent",
        failed: "failed",
        options: function () {
            return [
                {
                    label: "Created",
                    value: this.created,
                },
                {
                    label: "Processed",
                    value: this.failed,
                },
                {
                    label: "Sent",
                    value: this.sent,
                },
                {
                    label: "Failed",
                    value: this.failed,
                },
            ];
        },
    },
};

export default achConfig;
