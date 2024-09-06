import React, { useEffect, useState } from "react";
import "./NewRequest.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";
import mainApi from "../../utils/api/mainApi";
import { useNavigate } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch } from "react-redux";

function NewRequest() {
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [typeOfPay, setTypeOfPay] = useState("");
  const [contragent, setContragent] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [dateToPay, setDateToPay] = useState("");

  function handleChangeTypeOfPay(evt) {
    setTypeOfPay(evt.target.value);
  }

  function handleChangeContragent(evt) {
    setContragent(evt.target.value);
  }

  function handleChangeAmount(evt) {
    setAmount(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleChangeFile(evt) {
    setFile(evt.target.value);
  }

  function handleChangeDateToPay(evt) {
    setDateToPay(evt.target.value);
  }

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
    console.log(typeOfPay);

    onAddRequest({
      type: typeOfPay,
      amount: amount,
      contragent: contragent,
      dateToPay: dateToPay,
      owner: { currentUser },
      description: description,
    });
  };

useEffect(() => {
  dispatch(setHeaderTitle("Создать заявку"));
})

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
          onChange={handleChangeContragent}
        />
        <ul className="request__form_caption">Инициатор</ul>
        <ul className="request__form_field request__form_field_input">
          {currentUser.name + " " + currentUser.fullname}
        </ul>
        <ul className="request__form_caption">Содержание</ul>
        <input
          className="request__form_field"
          type="text"
          placeholder="За что платим"
          name="description"
          onChange={handleChangeDescription}
        />
        <ul className="request__form_caption">Тип заявки</ul>
        <div className="request_form_radioContainer">
          <input
            className="request__form_field"
            id="radioCash"
            type="radio"
            name="radioCash"
            value="Безнал"
            onChange={handleChangeTypeOfPay}
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
            onChange={handleChangeTypeOfPay}
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
          onChange={handleChangeAmount}
        />
        <ul className="request__form_caption">Срок оплаты</ul>
        <input
          className="request__form_field"
          type="date"
          name="dateToPay"
          onChange={handleChangeDateToPay}
        />
      </form>

      <button className="requestBtn" type="submit" onClick={onHandleSubmit}>
        Создать заявку
      </button>
      <button className="requestBtn">Сохранить черновик</button>
      <button className="requestBtn" onClick={() => (navigate('/requestlist'))}>Отменить</button>
    </div>
  );
}

export default NewRequest;
