import { useState, useRef, useEffect } from "react";

const useDragScroll = (ref) => {
    const sliderRef = ref ?? useRef();

    const [mouseDown, setMouseDown] = useState(false);

    const [startX, setStartX] = useState(0);

    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const slider = sliderRef.current;

        const startDragging = (e) => {
            setMouseDown(true);
            setStartX(e.pageX - slider.offsetLeft);
            setScrollLeft(slider.scrollLeft);
            slider.style.cursor = "grabbing";
            // slider.style.userSelect = "none"; // Prevent text selection
        };

        const stopDragging = () => {
            setMouseDown(false);
            slider.style.cursor = "grab";
            // slider.style.removeProperty("user-select"); // Re-enable text selection
        };

        const move = (e) => {
            e.preventDefault();
            if (!mouseDown) return;
            const x = e.pageX - slider.offsetLeft;
            const scroll = x - startX;
            slider.scrollLeft = scrollLeft - scroll;
        };

        slider.addEventListener("dblclick", () => {
            slider.style.removeProperty("user-select"); // Re-enable text selection
        });
        slider.addEventListener("mousedown", startDragging);
        slider.addEventListener("mouseup", stopDragging);
        slider.addEventListener("mouseleave", stopDragging);
        slider.addEventListener("mousemove", move);

        return () => {
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mousemove", move);
        };
    }, [mouseDown, startX, scrollLeft, sliderRef]);

    return sliderRef;
};

export default useDragScroll;
