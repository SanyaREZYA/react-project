import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {clickCell, rightClickCell} from '../../store/slices/gameSlice';
import Cell from '../Cell/Cell';
import './Minesweeper.css';

function Minesweeper() {
    const dispatch = useDispatch();
    const board = useSelector((state: RootState) => state.game.board);

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
                                onClick={() => dispatch(clickCell({row: rIndex, col: cIndex}))}
                                onRightClick={(e) => {
                                    e.preventDefault();
                                    dispatch(rightClickCell({row: rIndex, col: cIndex}));
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Minesweeper;
