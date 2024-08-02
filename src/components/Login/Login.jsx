import React from "react";
import './Login.css';

function Login() {
    return (
        <div className="loginPage">
            <div className="loginPageLeft">
                <div className="loginPage__logo"></div>
                <form className="loginPage__form">
                    <p>Вход</p>
                    <p>Добро пожаловать в Finspot</p>
                    <p>e-mail</p>
                    <input></input>
                    <p>Пароль</p>
                    <input></input>
                    <button>Войти в личный кабинет</button>
                    <p>Finspot - финансовая онлайн-платформа</p>
                </form>
            </div>

            <div className="loginPageRight">

            </div>
        </div>
    )
}

export default Login;