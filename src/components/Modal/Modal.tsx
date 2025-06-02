import './Modal.css';
import {closeModal, restartGame} from '../../store/slices/gameSlice';
import {useAppDispatch, useAppSelector} from '../../store/hooks';


const Modal = () => {
    const dispatch = useAppDispatch();
    const show = useAppSelector(state => state.game.showModal);
    const message = useAppSelector(state => state.game.modalMessage);

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                <div className="modal-buttons">
                    <button className="btn-close" onClick={() => dispatch(closeModal())}>
                        Close
                    </button>
                    <button className="btn-restart" onClick={() => dispatch(restartGame())}>
                        Restart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
