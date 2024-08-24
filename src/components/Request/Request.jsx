import React from "react";
import "./Request.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";

function Request() {
  const currentUser = React.useContext(CurrentUserContext);

  const onHandleSubmit = () => {};

  return (
    <div className="request">
      <form className="request__form" onSubmit={onHandleSubmit}>
        <ul className="request__form_caption">№ заявки</ul>
        <ul className="request__form_field">12334213</ul>
        <ul className="request__form_caption">Контрагент</ul>
        <input
          className="request__form_field"
          type="text"
          placeholder="ООО Ромашка"
        />
        <ul className="request__form_caption">Инициатор</ul>
        <ul className="request__form_field">
          {currentUser.data.name + " " + currentUser.data.fullname}
        </ul>
        <ul className="request__form_caption">Статус</ul>
        <ul className="request__form_field">Черновик</ul>
        <ul className="request__form_caption">Тип заявки</ul>
        <div className="request_form_radioContainer">
          <input
            className="request__form_field"
            id="radioCashless"
            type="radio"
            name="radioCash"
            value="Безнал"
          />
          <label for="radioCashless" className="request__form_radioLabel">
            Безнал
          </label>
          <input
            className="request__form_field"
            id="radioCash"
            type="radio"
            name="radioCash"
            value="Нал"
          />
          <label for="radioCash" className="request__form_radioLabel">
            Нал
          </label>
        </div>

        <ul className="request__form_caption">Файл</ul>
        <ul className="request__form_field">photo.jpg</ul>
        <ul className="request__form_caption">Сумма</ul>
        <input
          className="request__form_field"
          type="number"
          placeholder="20 000"
        />
        <ul className="request__form_caption">Срок оплаты</ul>
        <input className="request__form_field" type="date" />
      </form>

      <button className="requestBtn" type="submit">
        Создать заявку
      </button>
      <button className="requestBtn">Сохранить черновик</button>
      <button className="requestBtn">Отменить</button>
    </div>
  );
}

export default Request;
