import toast from "react-hot-toast";

const showToast = (data) => {
    if (data) {
        switch (data?.code) {
            case 200:
            case "success":
                return toast.success(data.message, {
                    position: "top-right",
                    style: {
                        border: "1px solid #713200",
                        padding: "16px",
                        color: "#713200",
                    },
                    iconTheme: {
                        primary: "green",
                        secondary: "#fff",
                    },
                });
            case 400:
            case "error":
                return toast.error(data.message, {
                    position: "top-right",
                });
            case 406:
                return toast.error(data.message, {
                    position: "top-right",
                });
            case 422:
                const errors = Object.values(data.data);
                const message = Object.values(errors)?.[0]?.[0];

                return toast.error(message ?? data.message, {
                    position: "top-right",
                });
            case 500:
                return toast.error(data.message, {
                    position: "top-right",
                });
            default:
                return toast("Something went wrong.", {
                    position: "top-right",
                    icon: "ℹ️",
                });
        }
    }
};

export default showToast;
