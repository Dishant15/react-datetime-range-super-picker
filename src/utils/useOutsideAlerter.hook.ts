import React, { useEffect } from "react";


export const useOutsideAlerter = (wrapperRef:React.RefObject<Element>, handlerShow: Function) => {

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: any) => {

            if (wrapperRef.current) {
                // check click outside of picker, and picker open
                if(!wrapperRef.current.contains(event.target)) {
                    handlerShow(false)
                    return
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
}