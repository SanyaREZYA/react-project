import {ReactNode, useCallback, useMemo, useState} from 'react';
import {GameContext, GameContextType} from './GameContext';
import {Board} from '../types';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

interface GameProviderProps {
    children: ReactNode;
}

function generateBoard(): Board {
    const board: Board = Array(ROWS)
        .fill(null)
        .map(() =>
            Array(COLS).fill({
                isMine: false,
                isOpen: false,
                isFlagged: false,
                count: 0,
            })
        );

    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (!board[row][col].isMine) {
            board[row][col] = {...board[row][col], isMine: true};
            minesPlaced++;
        }
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col].isMine) continue;
            let mineCount = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const r = row + i;
                    const c = col + j;
                    if (
                        r >= 0 &&
                        r < ROWS &&
                        c >= 0 &&
                        c < COLS &&
                        board[r][c].isMine
                    ) {
                        mineCount++;
                    }
                }
            }
            board[row][col] = {...board[row][col], count: mineCount};
        }
    }

    return board;
}

function checkWin(board: Board): boolean {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            const cell = board[row][col];
            if (!cell.isMine && !cell.isOpen) {
                return false;
            }
        }
    }
    return true;
}

function openAllCells(board: Board): Board {
    return board.map(row => row.map(cell => ({...cell, isOpen: true})));
}

function GameProvider({children}: GameProviderProps) {
    const [board, setBoard] = useState<Board>(generateBoard());
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const resetGame = useCallback(() => {
        setBoard(generateBoard());
        setGameOver(false);
        setWin(false);
        setShowModal(false);
        setModalMessage('');
    }, []);

    const handleClick = useCallback(
        (row: number, col: number) => {
            if (gameOver || win) return;
            if (board[row][col].isFlagged) return;

            const newBoard = [...board];

            if (newBoard[row][col].isMine) {
                newBoard[row][col] = {...newBoard[row][col], isOpen: true};
                setBoard(newBoard);
                setGameOver(true);
                setModalMessage('💥 Game Over! You hit a mine.');
                setShowModal(true);
                return;
            }

            newBoard[row][col] = {...newBoard[row][col], isOpen: true};
            setBoard(newBoard);

            if (checkWin(newBoard)) {
                const revealedBoard = openAllCells(newBoard);
                setBoard(revealedBoard);
                setWin(true);
                setModalMessage('🎉 Congratulations! You Win!');
                setShowModal(true);
            }
        },
        [board, gameOver, win]
    );

    const handleRightClick = useCallback(
        (event: MouseEvent, row: number, col: number) => {
            event.preventDefault();
            if (gameOver || win) return;

            const newBoard = [...board];
            newBoard[row][col] = {
                ...newBoard[row][col],
                isFlagged: !newBoard[row][col].isFlagged,
            };

            setBoard(newBoard);
        },
        [board, gameOver, win]
    );

    const handleModalRestart = useCallback(() => {
        resetGame();
    }, [resetGame]);

    const getModalProps = useCallback(
        () => ({
            message: modalMessage,
            onClose: () => setShowModal(false),
            onRestart: handleModalRestart,
        }),
        [modalMessage, handleModalRestart]
    );

    const value: GameContextType = useMemo(
        () => ({
            board,
            gameOver,
            win,
            showModal,
            modalMessage,
            handleClick,
            handleRightClick,
            handleModalRestart,
            setShowModal,
            getModalProps,
        }),
        [
            board,
            gameOver,
            win,
            showModal,
            modalMessage,
            handleClick,
            handleRightClick,
            handleModalRestart,
            getModalProps,
        ]
    );

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )

}

export default GameProvider;
