import React from "react";
import "./App.css";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import RequestList from "../RequestList/RequestList";
import RegistryList from "../RegistryList/RegistryList";
import NewRequest from "../NewRequest/NewRequest";
import Request from "../Request/Request";
import Registry from "../Registry/Registry";
import Login from "../Login/Login";
import Users from "../Users/Users";
import NewUser from "../NewUser/NewUser";
import Organizations from "../Organizations/Organizations";
import Profile from "../Profile/Profile";
import mainApi from "../../utils/api/mainApi";
import ProtectedRoute from "../../pages/protectedRoute/protectedRoute";

import auth from "../../utils/api/auth";

import { CurrentUserContext } from "../../contexts/CurrentUserContexts";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import NewOrganization from "../NewOrganization/NewOrganization";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [serverError, setServerError] = React.useState({});
  const [isOkRequest, setIsOkRequest] = React.useState(false);

  // блок авторизация

  //проверка токена
  // создать отдельный хук
  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken()
        .then(() => {
          setLoggedIn(true);
          navigate(pathname);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //регистрация
  const onRegister = (values) => {
    auth
      .register(values.name, values.email, values.password)
      .then(() => {
        onLogin(values);
      })
      .catch((err) => {
        console.log(`${err}`);
        setServerError(err);
      });
  };

  // логин
  const onLogin = (values) => {
    auth
      .authorization(values.email, values.password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate("/requests", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`${err}`);
        setServerError(err);
      });
  };

  // выход
  const onSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    setLoggedIn(false);
  };

  React.useEffect(() => {
    loggedIn &&
      Promise.all([mainApi.getInfoUser(), mainApi.getRequests()])
        .then(([userData]) => {
          setCurrentUser(userData.data);
          console.log(userData.data);
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {pathname !== "/signin" ? (
          <Sidebar onSignOut={onSignOut} />
        ) : null}
        <div className="page">
          {pathname !== "/signin" ? <Header /> : null}
          <Routes>
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
            <Route
              path="/requestlist"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <RequestList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <RequestList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registrylist"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <RegistryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request/:id"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Request />
                </ProtectedRoute>
              }
              />
            <Route
              path="/request/add"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <NewRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registry"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Registry />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/add"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <NewUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizations"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Organizations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organizations/add"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <NewOrganization />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
