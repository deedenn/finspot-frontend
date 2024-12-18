import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginPagePicture from "../../images/loginPagePicture.png";
import logo from "../../images/logo.png";
import { useFormValidation } from "../../hooks/useFormValidation";
import auth from "../../utils/api/auth";
import { setAuth } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

function Login(props) {
  const { values, handleChange } = useFormValidation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!values.email || !values.password) {
        return;
      }
      const res = await auth.authorization({
        email: values.email,
        password: values.password,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="loginPage">
      <div className="loginPageLeft">
        <div className="loginPage__logo_container">
          <img className="loginPage__logo" src={logo} alt="Логотип" />
          <p className="loginPage__logo_name">FINSPOT</p>
        </div>
        <form className="loginPage__form" onSubmit={handleSubmit} noValidate>
          <h1 className="loginPage__form_header">Вход</h1>
          <p className="loginPage__form_caption">Добро пожаловать в Finspot</p>
          <p className="loginPage__form_inputcaption">e-mail</p>
          <input
            className="loginPage__form_input"
            id="email"
            autoComplete="off"
            value={values.email}
            type="email"
            onInput={handleChange}
            placeholder="example@yandex.ru"
            minLength="2"
            maxLength="70"
            name="email"
            required
          ></input>
          <p className="loginPage__form_inputcaption"> Пароль</p>
          <input
            className="loginPage__form_input"
            type="password"
            onInput={handleChange}
            name="password"
            id="password"
            autoComplete="off"
            placeholder="Введите пароль"
            minLength="2"
            maxLength="40"
            value={values.password}
            required
          ></input>
          <div className="loginPage__form_chkbxContainer">
            <input className="loginPage__checkbox" type="checkbox"></input>
            <p className="loginPage__form_inputcaption">Запомнить меня</p>
            <button className="loginPage__forgotBtn">Забыли пароль?</button>
          </div>
          <button className="loginPage__form_button" type="submit">
            Войти в личный кабинет
          </button>
          <p className="loginPage__about">
            Finspot - финансовая онлайн-платформа
          </p>
        </form>
      </div>

      <div className="loginPageRight">
        <img
          className="loginPagePicture"
          src={loginPagePicture}
          alt="Finspot screenshot"
        />
      </div>
    </div>
  );
}

export default Login;
