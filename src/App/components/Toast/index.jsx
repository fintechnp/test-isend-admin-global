import toast from "react-hot-toast";

const showToast = (data) => {
    if (data) {
        switch (data?.code) {
            case 200:
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
                return toast.error(data.message, {
                    position: "top-right",
                });
            case 500:
                return toast.error(data.message, {
                    position: "top-right",
                });
            default:
                return toast(data.message, {
                    position: "top-right",
                    icon: "ℹ️",
                });
        }
    }
};

export default showToast;
