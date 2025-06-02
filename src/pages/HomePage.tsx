import {Link} from 'react-router-dom';
import '../styles/homepage.css';

export default function HomePage() {
    return (
        <div className="wellcome-container">
            <h1>Wellcome to Minesweeper!</h1>
            <Link to="/game">
                <button className="start-button">
                    Start game
                </button>
            </Link>
        </div>
    );
}
