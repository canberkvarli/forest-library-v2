/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Instructions from "./Instructions"
import { IoClose } from "react-icons/io5";
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
            <section className="relative bg-white p-5 rounded-lg w-4/5 max-w-lg mx-auto">
                <IoClose
                    className="absolute top-2 right-2 text-red-500 cursor-pointer"
                    size={50}
                    onClick={handleClose}
                />
                {children}
                <Instructions />
            </section>
        </div>
    );
};

export default Modal;
