import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Board} from '../../types';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

function generateBoard(): Board {
    const board: Board = Array.from({length: ROWS}, () =>
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
            let count = 0;
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
                        count++;
                    }
                }
            }
            board[row][col] = {...board[row][col], count};
        }
    }

    return board;
}

function openAllCells(board: Board): Board {
    return board.map(row => row.map(cell => ({...cell, isOpen: true})));
}

interface GameState {
    board: Board;
    gameOver: boolean;
    win: boolean;
    showModal: boolean;
    modalMessage: string;
    username: string;
}

const initialState: GameState = {
    board: generateBoard(),
    gameOver: false,
    win: false,
    showModal: false,
    modalMessage: '',
    username: '',
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        restartGame: (state) => {
            console.log('Restart action dispatched');
            state.board = generateBoard();
            state.gameOver = false;
            state.win = false;
            state.showModal = false;
            state.modalMessage = '';
        },
        clickCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
            const {row, col} = action.payload;
            if (state.gameOver || state.win || state.board[row][col].isFlagged) return;

            if (state.board[row][col].isMine) {
                state.board[row][col].isOpen = true;
                state.gameOver = true;
                state.showModal = true;
                state.modalMessage = '💥 Game Over! You hit a mine.';
                return;
            }

            state.board[row][col].isOpen = true;

            const hasWon = state.board.every(row =>
                row.every(cell => cell.isMine || cell.isOpen)
            );

            if (hasWon) {
                state.board = openAllCells(state.board);
                state.win = true;
                state.showModal = true;
                state.modalMessage = '🎉 Congratulations! You Win!';
            }
        },
        rightClickCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
            const {row, col} = action.payload;
            if (state.gameOver || state.win) return;

            const cell = state.board[row][col];
            cell.isFlagged = !cell.isFlagged;
        },
        closeModal: (state) => {
            state.showModal = false;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export const {
    restartGame,
    clickCell,
    rightClickCell,
    closeModal,
    setUsername,
} = gameSlice.actions;

export default gameSlice.reducer;
