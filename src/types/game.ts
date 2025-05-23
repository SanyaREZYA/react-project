export type Cell = {
    isMine: boolean;
    isOpen: boolean;
    isFlagged: boolean;
    count: number;
};

export type Board = Cell[][];
