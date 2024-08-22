import React from "react";
import "./App.css";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import RequestList from "../RequestList/RequestList";
import RegistryList from "../RegistryList/RegistryList";
import Request from "../Request/Request";
import Registry from "../Registry/Registry";
import Login from "../Login/Login";
import Users from "../Users/Users";
import MainApi from "../../utils/api/mainApi";
import ProtectedRoute from "../../pages/protectedRoute/protectedRoute";

import auth from "../../utils/api/auth";

import { CurrentUserContext } from "../../contexts/CurrentUserContexts";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [serverError, setServerError] = React.useState({});
  const [isOkRequest, setIsOkRequest] = React.useState(false);

  const mainApi = new MainApi({
    url: "https://api.finspot.ru/",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // блок авторизация

  //проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken()
        .then((res) => {
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
    navigate("/", { replace: true });
    setLoggedIn(false);
  };

  React.useEffect(() => {
    loggedIn &&
      Promise.all([mainApi.getUsers(), mainApi.getRequests()])
        .then(([userData, savedArray]) => {
          setCurrentUser(userData);
          localStorage.setItem("", JSON.stringify(savedArray));
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {pathname !== "/signin" ? <Sidebar loggedIn={loggedIn} /> : null}
        <div className="page">
          {pathname !== "/signin" ? <Header loggedIn={loggedIn} /> : null}
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <RequestList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registrylist"
              element={
                <ProtectedRoute>
                  <RegistryList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request"
              element={
                <ProtectedRoute>
                  <Request />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registry"
              element={
                <ProtectedRoute>
                  <Registry />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
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
