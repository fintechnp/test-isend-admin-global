import { localStorageGet, localStorageSave } from "App/helpers/localStorage";
import { useState, useEffect, useRef } from "react";

const useModal = (modalName) => {
    const mounted = useRef(false);

    const [open, setOpen] = useState(false);

    const storageKeyName = modalName + "Modal";
    
    useEffect(() => {
        const localState = localStorageGet(storageKeyName);

        setOpen(localState === "true" || localState === true);

        mounted.current = true;
    }, []);

    useEffect(() => {
        if (mounted.current) localStorageSave(storageKeyName, open.toString());
    }, [open]);

    return {
        isModalOpen: open,
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
    };
};

export default useModal;
