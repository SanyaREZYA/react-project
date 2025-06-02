import './Modal.css';

interface ModalProps {
    message: string;
    onClose: () => void;

    onRestart(): void;
}

const Modal = ({message, onClose, onRestart}: ModalProps) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                <div className="modal-buttons">
                    <button className="btn-close" onClick={onClose}>
                        Closs
                    </button>
                    <button className="btn-restart" onClick={onRestart}>
                        Restart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
