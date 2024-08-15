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
import Users from "../Users/Users";
import Auth from '../../utils/api/auth';
import MainApi from '../../utils/api/mainApi';
import RequestsApi from '../../utils/api/requestsApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContexts';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";


function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [serverError, setServerError] = React.useState({});
  const [isOkRequest, setIsOkRequest] = React.useState(false);


  // блок подключения к апи

  const auth = new Auth({
    baseUrl: 'https://api.finspot.ru',
  });

  const mainApi = new MainApi({
    url: 'https://api.finspot.ru',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const requestsApi = new RequestsApi({
    url: 'https://api.finspot.ru/requests',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // блок авторизация

  //проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
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
          navigate('/requests', { replace: true });
        }
      })
      .catch((err) => {
        console.log(`${err}`);
        setServerError(err);
      });
  };

  // выход
  const onSignOut = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
    setLoggedIn(false);
  };

  React.useEffect(() => {
    loggedIn &&
      Promise.all([
        mainApi.getUsers(),
        requestsApi.getRequests(),
      ])
        .then(([userData, initialMovies, savedArray]) => {
          setCurrentUser(userData);
          localStorage.setItem('savedMoviesArray', JSON.stringify(savedArray));
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {pathname !== '/signin'
          ? (<Sidebar loggedIn={loggedIn}/>
          ) : null}
        <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/requestlist" element={<RequestList />} />
          <Route path="/registrylist" element={<RegistryList />} />
          <Route path="/request" element={<Request />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
