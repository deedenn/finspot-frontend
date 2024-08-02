import React from "react";
import "./App.css";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import RequestList from "../RequestList/RequestList";
import RegistryList from "../RegistryList/RegistryList";
import Request from "../Request/Request";
import Registry from "../Registry/Registry";
import Login from "../Login/Login";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/requestlist" element={<RequestList />} />
          <Route path="/registrylist" element={<RegistryList />} />
          <Route path="/request" element={<Request />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
