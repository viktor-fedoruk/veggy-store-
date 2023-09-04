import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal(props){
    const {
        onClose,
        children,
        portalClassName,
        classNameWrapper,
        classNameContent,
    } = props;

    const modalRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", closeModalWindow, true);

        return () => {
            document.removeEventListener("click", closeModalWindow, true);
        }
    },[]);

    function closeModalWindow(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    }

    return createPortal(
        <div
            className={`${classNameWrapper}`}
        >
            <div
                ref={modalRef}
                className={`${classNameContent}`}
            >
                {children}
            </div>
        </div>,
        document.querySelector(`.${portalClassName}`)
    )
}