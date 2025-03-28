import React from "react";
import "./Modal.css";

interface ModalProps {
    message: string;
    onClose: () => void;
    onRestart: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose, onRestart }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                <div className="modal-buttons">
                    <button className="btn-close" onClick={onClose}>Закрити</button>
                    <button className="btn-restart" onClick={onRestart}>Грати знову</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
