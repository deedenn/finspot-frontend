import React from "react";
import "./Request.css";

function Request() {
  return (
    <div className="request">

      <div className="request__form">
        <ul className="request__form_caption">№ заявки</ul>
        <ul classname="request__form_field">12334213</ul>
        <ul className="request__form_caption">Контрагент</ul>
        <ul classname="request__form_field">ООО "Ромашка"</ul>
        <ul className="request__form_caption">Инициатор</ul>
        <ul classname="request__form_field">Громова Анастасия Владимировна</ul>
        <ul className="request__form_caption">Статус</ul>
        <ul classname="request__form_field">Согласование ФД</ul>
        <ul className="request__form_caption">Тип заявки</ul>
        <ul classname="request__form_field">Безнал</ul>
        <ul className="request__form_caption">Файл</ul>
        <ul classname="request__form_field">photo.jpg</ul>
        <ul className="request__form_caption">Сумма</ul>
        <ul classname="request__form_fieldSum" type="input">20 000 руб.</ul>
        <ul className="request__form_caption">Срок оплаты</ul>
      </div>
      
      <button className="requestBtn">Создать заявку</button>
      <button className="requestBtn">Сохранить черновик</button>
      <button className="requestBtn">Отменить</button>
    </div>

  );
}

export default Request;
