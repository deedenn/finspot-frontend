import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginPagePicture from "../../images/loginPagePicture.png";
import logo from "../../images/logo.png";
import { useFormValidation } from "../../hooks/useFormValidation";
import auth from "../../utils/api/auth";

function Login(props) {
  const { values, handleChange, errors, isValid } = useFormValidation();
  console.log(values);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(e);

      if (!values.email || !values.password) {
        return;
      }
      const res = await auth.authorization(values);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!values.email || !values.password) {
  //     return;
  //   }
  //   props.onLogin(values);
  // };

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
            value={values.email || ""}
            type="email"
            onChange={handleChange}
            placeholder="example@yandex.ru"
            minLength="2"
            maxLength="70"
            required
          ></input>
          <p className="loginPage__form_inputcaption"> Пароль</p>
          <input
            className="loginPage__form_input"
            type="password"
            onChange={handleChange}
            id="password"
            autoComplete="off"
            placeholder="Введите пароль"
            minLength="2"
            maxLength="40"
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
