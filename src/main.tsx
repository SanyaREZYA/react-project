import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import GameProvider from './context/GameProvider';
import App from './App';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GameProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </GameProvider>
    </React.StrictMode>
);
