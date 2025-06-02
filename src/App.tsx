import {useGame} from './context/GameContext';

import Minesweeper from './components/Minesweeper/Minesweeper';
import Modal from './components/Modal/Modal';

function App() {
    const {showModal, getModalProps} = useGame();

    return (
        <div className="App">
            <Minesweeper/>
            {showModal && <Modal {...getModalProps()} />}
        </div>
    );
}

export default App;
