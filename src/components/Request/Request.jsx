import React, { useEffect, useState } from "react";
import "./Request.css";
import { useNavigate, useParams } from "react-router-dom";
import mainApi from "../../utils/api/mainApi";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import userSlice from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Request() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector(state => state.userSlice);
  console.log(user.user.name);

  const [request, setRequest] = useState({});
  const [statuslog, setStatuslog] = useState([]);
  const [owner, setOwner] = useState({});
  const [message, setMessage] = useState("");

  async function getDataRequest() {
    try {
      const dataRequest = await mainApi.getRequestByID(id);
      const { data } = await mainApi.getInfoUser(dataRequest.owner);
      setRequest(dataRequest);
      setStatuslog(dataRequest.statuslog);
      setOwner(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDate = (item) => {
    const date = new Date(item);
    return date.toLocaleDateString();
  };

  const handleTime = (item) => {
    const date = new Date(item);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  }

  async function checkRequest() {
    try {
      mainApi.checkRequest({
        _id: request._id,
        status: "Утверждение ГД",
        stageStatus: 1,
        message: message,
        user: user.user.name + " " + user.user.fullname,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  async function cancelRequest() {
    try {
      mainApi.cancelRequest({
        _id: request._id,
        message: message,
        user: user.user.name + " " + user.user.fullname,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataRequest();
  }, []);

  console.log(request, owner);
  console.log(statuslog);

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
        <ul className="request__form_caption">Статус</ul>
        <div className="request__form_field">{request.status}</div>
        <ul className="request__form_caption">Текущий ответственный</ul>
        <div className="request__form_field">Анастасия Климантовичъ</div>
      </form>

      <textarea className="request__commentInput" placeholder="Укажите комментарий" onChange={(evt) => { setMessage(evt.target.value) }}></textarea>
      <div className="requestBtnContainer">
        <button className="requestBtn" type="submit" onClick={checkRequest}>
          Утвердить заявку
        </button>
        <button className="requestBtn_cancel" onClick={cancelRequest}>Отменить заявку</button>
      </div>

      <div className="request__log">Лог заявки</div>
      <div className="request__logCaptions">
        <p>date</p>
        <p>time</p>
        <p>stage</p>
        <p>user</p>
        <p>message</p>
      </div>

      {statuslog.map((item, index) => {
        return (
          <div key={index} className="request__logFields request__logCaptions">
            <p>{handleDate(item.date)}</p>
            <p>{handleTime(item.date)}</p>
            <p>{item.stage}</p>
            <p>{item.user}</p>
            <p>{item.message}</p>
          </div>
        )
      })}

    </div>



  );
}

export default Request;
