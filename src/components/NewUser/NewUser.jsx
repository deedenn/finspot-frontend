import React from "react";
import "./NewUser.css";

function NewUser() {
  return (
    <div className="newuser">
      <div className="newuser__formContainer">
        <p className="newuser__captions">Фамилия</p>
        <input className="newuser__input" placeholder="Введите фамилию" />
        <p className="newuser__captions">Имя</p>
        <input className="newuser__input" placeholder="Введите имя" />
        <p className="newuser__captions">Роль</p>
        <input className="newuser__input" placeholder="Выберите роль"></input>
        <p className="newuser__captions">Супервайзер</p>
        <div className="newuser__radioContainer">
          <label for="radioUser1">Да</label>
          <input
            className="newuser__radioButton"
            id="radioUser1"
            name="radioUser"
            type="radio"
            value="Да"
          />
          <label for="radioUser2">Нет</label>
          <input
            className="newuser__radioButton"
            id="radioUser2"
            name="radioUser"
            type="radio"
            value="Нет"
          />
        </div>
        <p className="newuser__captions">email</p>
        <input
          className="newuser__input"
          type="email"
          placeholder="Введите email для отправки приглашения"
        ></input>
      </div>

      <button className="newuser__submitBtn">Отправить приглашение</button>
    </div>
  );
}

export default NewUser;
