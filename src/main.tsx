import {createRoot} from 'react-dom/client';
import './index.css';
import GameProvider from "./context/GameProvider";
import App from "./App";


createRoot(document.getElementById('root')!).render(<GameProvider><App/></GameProvider>);
