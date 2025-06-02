import {Link} from 'react-router-dom';
import Minesweeper from '../components/Minesweeper/Minesweeper';
import Modal from '../components/Modal/Modal';
import '../styles/gamepage.css';
import {useSelector} from 'react-redux';
import {RootState} from '../store/index';

export default function GamePage() {
    const username = useSelector((state: RootState) => state.game.username);

    return (
        <main className="gamepage">
            <nav className="game-nav">
                <Link to="/">
                    <button className="back-button">Back to main</button>
                </Link>
                <h2>Player: {username}</h2>
            </nav>
            <div className="game-container">
                <Minesweeper/>
                <Modal/>
            </div>
        </main>
    );
}
