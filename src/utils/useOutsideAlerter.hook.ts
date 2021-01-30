import React, { useEffect } from "react";


export const useOutsideAlerter = (
    wrapperRef:React.RefObject<Element>, 
    isOpen:Boolean, handlerShow: Function,
    inputId:String,
) => {

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = (event: any) => {

            if (wrapperRef.current) {
                // check click outside of picker, and picker open
                if(!wrapperRef.current.contains(event.target) && isOpen) {
                    handlerShow(false)
                    return
                }
            }
            else {
                // check input clicked, open picker
                if(event.target.id === inputId) {
                    handlerShow(true)
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
    }, [wrapperRef, isOpen]);
}