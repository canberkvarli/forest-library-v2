/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Instructions from "./instructions";
import "./modal.css";

const Modal = ({ handleClose, show, children }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [handleClose]);

    const modalClass = show ? "modal display-block" : "modal display-none";

    const handleWindowClose = (e) => {
        if (e.target.classList.contains("modal")) {
            handleClose();
        }
    };

    return (
        <div className={modalClass} onClick={handleWindowClose}>
            <section className="modal-main">
                {children}
                <Instructions />
                <img
                    id="icon-close"
                    src={""}
                    onClick={handleClose}
                    alt="close"
                />
            </section>
        </div>
    );
};

export default Modal;
