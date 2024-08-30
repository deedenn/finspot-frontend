import React, { useState } from "react";
import "./Request.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";
import mainApi from "../../utils/api/mainApi";

function Request() {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className="request">
            <form className="request__form" >
                <ul className="request__form_caption">№ заявки</ul>
                <ul className="request__form_field">12334213</ul>
                <ul className="request__form_caption">Контрагент</ul>
                <input
                    className="request__form_field"
                    type="text"
                    placeholder="Введите название контрагента"
                    name="contragent"

                />
                <ul className="request__form_caption">Инициатор</ul>
                <ul className="request__form_field">
                    {currentUser.name + " " + currentUser.fullname}
                </ul>
                <ul className="request__form_caption">Содержание</ul>
                <input
                    className="request__form_field"
                    type="text"
                    placeholder="За что платим"
                    name="description"

                />
                <ul className="request__form_caption">Тип заявки</ul>
                <div className="request_form_radioContainer">
                    <input
                        className="request__form_field"
                        id="radioCash"
                        type="radio"
                        name="radioCash"
                        value="Безнал"

                    />
                    <label htmlFor="radioCashless" className="request__form_radioLabel">
                        Безнал
                    </label>
                    <input
                        className="request__form_field"
                        id="radioCash"
                        type="radio"
                        name="radioCash"
                        value="Нал"

                    />
                    <label htmlFor="radioCash" className="request__form_radioLabel">
                        Нал
                    </label>
                </div>

                <ul className="request__form_caption">Файл</ul>
                <ul className="request__form_field">photo.jpg</ul>
                <ul className="request__form_caption">Сумма</ul>
                <input
                    className="request__form_field"
                    type="number"
                    placeholder="Введите сумму"
                    name="amount"

                />
                <ul className="request__form_caption">Срок оплаты</ul>
                <input className="request__form_field" type="date" name="dateToPay" />
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
