import React, { useEffect } from "react";


export const useOutsideAlerter = (ref:React.RefObject<Element>, isOpen:Boolean, handleClose: Function) => {

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: any) => {
            // check curr ref's child not contains clicked ref
            // and picker is open 
            if (ref.current && !ref.current.contains(event.target) && isOpen) {
                handleClose()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, isOpen]);
}