import { useDispatch } from "react-redux";

const useCopyTextToClipboard = () => {
    const dispatch = useDispatch();

    const copyTextToClipboard = async (text) => {
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand("copy", true, text);
        }
    };

    const copyText = (text) => {
        copyTextToClipboard(text)
            .then(() => {
                dispatch({
                    type: "SET_TOAST_DATA",
                    response: { message: "Copied to clipboard", code: "success" },
                });
            })
            .catch(() => {
                dispatch({
                    type: "SET_TOAST_DATA",
                    response: { message: "Error", code: "error" },
                });
            });
    };

    return copyText;
};

export default useCopyTextToClipboard;
