import {MouseEvent} from 'react';
import './Cell.css';

interface CellProps {
    cell: {
        isMine: boolean;
        isOpen: boolean;
        isFlagged: boolean;
        count: number;
    };
    onClick: () => void;
    onRightClick: (event: MouseEvent) => void;
}

function Cell ({ cell, onClick, onRightClick }: CellProps) {
    return (
        <div
            className={`cell ${cell.isOpen ? 'open' : ''}`}
            onClick={onClick}
            onContextMenu={onRightClick}
        >
            {cell.isOpen && cell.isMine && '💣'}
            {cell.isOpen && !cell.isMine && cell.count > 0 && cell.count}
            {cell.isFlagged && !cell.isOpen && '🚩'}
        </div>
    );
}

export default Cell;
