import React, { useEffect, useState } from "react";
import "./Request.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";
import { useParams } from "react-router-dom";
import mainApi from "../../utils/api/mainApi";
import { actionSidebar, setHeaderTitle } from "../../redux/slices/viewSlice";
import { useSelector, useDispatch } from "react-redux";

function Request() {
  const currentUser = React.useContext(CurrentUserContext);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [request, setRequest] = useState({});
  const [owner, setOwner] = useState({});

  async function getDataRequest() {
    try {
      const dataRequest = await mainApi.getRequestByID(id);
      const { data } = await mainApi.getInfoUser(dataRequest.owner);
      setRequest(dataRequest);
      setOwner(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataRequest();
  }, []);

  console.log(request, owner);

  return (
    <div className="request">
      <form className="request__form">
        <ul className="request__form_caption">№ заявки</ul>
        <ul className="request__form_field">12334213</ul>
        <ul className="request__form_caption">Контрагент</ul>

        <div className="request__form_field">{request.contragent}</div>
        <ul className="request__form_caption">Инициатор</ul>
        <ul className="request__form_field">
          {owner.name + " " + owner.fullname}
        </ul>
        <ul className="request__form_caption">Содержание</ul>
        <div className="request__form_field">{request.description}</div>
        <ul className="request__form_caption">Тип заявки</ul>
        <div className="request_form_radioContainer">{request.type}</div>

        <ul className="request__form_caption">Файл</ul>
        <ul className="request__form_field">photo.jpg</ul>
        <ul className="request__form_caption">Сумма</ul>
        <div className="request__form_field">{request.amount}</div>
        <ul className="request__form_caption">Срок оплаты</ul>
        <div className="request__form_field">{request.dayToPay}</div>
      </form>

      <div className="request__log">Лог заявки</div>

      <button className="requestBtn" type="submit">
        Утвердить заявку
      </button>
      <button className="requestBtn">Отменить</button>
    </div>
  );
}

export default Request;
