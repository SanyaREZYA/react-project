import {useGame} from '../../context/GameContext';
import Cell from "../Cell/Cell.tsx";
import './Minesweeper.css';

function Minesweeper() {
    const {
        board,
        handleClick,
        handleRightClick,
    } = useGame();

    return (
        <div>
            <h2>Minesweeper</h2>
            <div className="board">
                {board.map((row, rIndex) => (
                    <div key={rIndex} className="row">
                        {row.map((cell, cIndex) => (
                            <Cell
                                key={cIndex}
                                cell={cell}
                                onClick={() => handleClick(rIndex, cIndex)}
                                onRightClick={(event) => handleRightClick(event, rIndex, cIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Minesweeper;
