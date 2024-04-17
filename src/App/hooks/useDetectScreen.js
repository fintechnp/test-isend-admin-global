import { useEffect, useState } from "react";

const MOBILE_SCREEN_MAX_SIZE = 600;
const TABLET_SCREEN_MAX_SIZE = 980;

export default function useDetectScreen() {
    const getChangedScreenState = (width) => {
        if (width <= MOBILE_SCREEN_MAX_SIZE) {
            return {
                isMobile: true,
                isTablet: false,
                isDesktop: false,
            };
        } else if (width > MOBILE_SCREEN_MAX_SIZE && width <= TABLET_SCREEN_MAX_SIZE) {
            return {
                isMobile: false,
                isTablet: true,
                isDesktop: false,
            };
        } else {
            return {
                isMobile: false,
                isTablet: false,
                isDesktop: true,
            };
        }
    };

    const [screenState, setScreenState] = useState(getChangedScreenState(window.innerWidth));

    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        const changedScreenState = getChangedScreenState(width);
        if (JSON.stringify(screenState) !== JSON.stringify(changedScreenState)) {
            setScreenState(changedScreenState);
        }
    }, [width]);

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return screenState;
}
