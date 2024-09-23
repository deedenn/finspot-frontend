import React, { useEffect, useState } from "react";
import "./NewRequest.css";
import mainApi from "../../utils/api/mainApi";
import { useNavigate } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch, useSelector } from "react-redux";

function NewRequest() {
  const { user } = useSelector(state => state.userSlice);
  const { currentOrganization } = useSelector(state => state.organizationSlice);

  console.log(currentOrganization);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [typeOfPay, setTypeOfPay] = useState("");
  const [contragent, setContragent] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [dateToPay, setDateToPay] = useState("");

  const onAddRequest = (newRequest) => {
    console.log(newRequest);
    mainApi
      .addRequest(newRequest)
      .then((newRequest) => {
        console.log(newRequest);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  const onHandleSubmit = () => {
    onAddRequest({
      organization: currentOrganization._id,
      type: typeOfPay,
      amount: amount,
      contragent: contragent,
      dateToPay: dateToPay,
      file: file,
      owner: { user },
      description: description,
      statuslog: [{
        date: Date.now(),
        stage: "Черновик",
        user: user.name,
      }]
    });
    navigate('/');
  };

  useEffect(() => {
    dispatch(setHeaderTitle("Создать заявку"));
  }, []);

  return (
    <div className="request">
      <form className="request__form">
        <ul className="request__form_caption">№ заявки</ul>
        <ul className="request__form_field">12334213</ul>
        <ul className="request__form_caption">Контрагент</ul>
        <input
          className="request__form_field"
          type="text"
          placeholder="Введите название контрагента"
          name="contragent"
          onChange={(evt) => setContragent(evt.target.value)}
        />
        <ul className="request__form_caption">Организация</ul>
        <ul className="request__form_field request__form_field_input">
          {currentOrganization?.name}
        </ul>
        <ul className="request__form_caption">Содержание</ul>
        <input
          className="request__form_field"
          type="text"
          placeholder="За что платим"
          name="description"
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <ul className="request__form_caption">Инициатор</ul>
        <ul className="request__form_field request__form_field_input">
          {user.name + " " + user.fullname}
        </ul>
        <ul className="request__form_caption">Файл</ul>
        <input
          className="request__form_field"
          type="text"
          placeholder="Вложите файл"
          name="file"
          onChange={(evt) => setFile(evt.target.value)}
        />
        <ul className="request__form_caption">Тип заявки</ul>
        <div className="request_form_radioContainer">
          <input
            className="request__form_field"
            id="radioCash"
            type="radio"
            name="radioCash"
            value="Безнал"
            onChange={(evt) => setTypeOfPay(evt.target.value)}
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
            onChange={(evt) => setTypeOfPay(evt.target.value)}
          />
          <label htmlFor="radioCash" className="request__form_radioLabel">
            Нал
          </label>
        </div>


        <ul className="request__form_caption">Сумма</ul>
        <input
          className="request__form_field"
          type="number"
          placeholder="Введите сумму"
          name="amount"
          onChange={(evt) => setAmount(evt.target.value)}
        />
        <ul className="request__form_caption">Срок оплаты</ul>
        <input
          className="request__form_field"
          type="date"
          name="dateToPay"
          onChange={(evt) => setDateToPay(evt.target.value)}
        />
      </form>

      <button className="requestBtn" type="submit" onClick={onHandleSubmit}>
        Создать заявку
      </button>
      <button className="requestBtn">Сохранить черновик</button>
      <button className="requestBtn" onClick={() => navigate("/requestlist")}>
        Отменить
      </button>
    </div>
  );
}

export default NewRequest;
