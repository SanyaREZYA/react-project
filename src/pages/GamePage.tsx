import {useGame} from '../context/GameContext';
import {Link} from 'react-router-dom';
import Minesweeper from '../components/Minesweeper/Minesweeper';
import Modal from '../components/Modal/Modal';
import '../styles/gamepage.css';

export default function GamePage() {
    const {showModal, getModalProps} = useGame();

    return (
        <main className="gamepage">
            <nav className="game-nav">
                <Link to="/">
                    <button className="back-button">Back to main</button>
                </Link>
            </nav>
            <div className="game-container">
                <Minesweeper/>
                <Modal/>
            </div>
        </main>
    );
}
