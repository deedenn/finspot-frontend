import React from 'react';
import './App.css';

import Header from '../Header/Header';

import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div className="Page">
                <div className="Header">Это хэдер</div>
                <div className="Main">Это майн</div>
                <div className="Sidebar">Это сайдбар</div>
                <div className="Footer">Это футер</div>

            </div>
        </div>
    )
}

export default App;