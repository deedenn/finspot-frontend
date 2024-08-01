import React from "react";
import "./App.css";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import RequestList from "../RequestList/RequestList";
import RegistryList from "../RegistryList/RegistryList";
import Request from "../Request/Request";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="page">
        <Header />
        {/* <RequestList />
        <RegistryList /> */}
        <Request />
      </div>
    </div>
  );
}

export default App;
