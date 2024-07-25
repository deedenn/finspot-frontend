import React from 'react';
import './App.css';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import RequestList from '../RequestList/RequestList';
import RegistryList from '../RegistryList/RegistryList';
import NavBar from '../NavBar/NavBar';

import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
    return (
        <div className="app">
            <Sidebar />
            <div className="page">
                <Header />
                <NavBar />
                <RequestList />
            </div>


        </div>
    )

}

export default App;