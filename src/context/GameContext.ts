import {createContext, useContext} from 'react';

import {Board} from '../types';

export type GameContextType = {
    board: Board;
    gameOver: boolean;
    win: boolean;
    showModal: boolean;
    modalMessage: string;
    handleClick: (row: number, col: number) => void;
    handleRightClick: (event: MouseEvent, row: number, col: number) => void;
    handleModalRestart: () => void;
    setShowModal: (show: boolean) => void;
    getModalProps: () => {
        message: string;
        onClose: () => void;
        onRestart: () => void;
    };
};

export const GameContext = createContext<GameContextType>({
    board: [],
    gameOver: false,
    win: false,
    showModal: false,
    modalMessage: '',
    handleClick: () => undefined,
    handleRightClick: () => undefined,
    handleModalRestart: () => undefined,
    setShowModal: () => undefined,
    getModalProps: () => ({
        message: '',
        onClose: () => {
        },
        onRestart: () => {
        },
    }),
});

export function useGame() {
    return useContext(GameContext);
}
