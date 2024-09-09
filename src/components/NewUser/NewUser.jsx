import React, { useEffect, useState } from "react";
import "./NewUser.css";
import mainApi from "../../utils/api/mainApi";
import { useNavigate, useParams } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch } from "react-redux";

function NewUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [supervisor, setSupervisor] = useState(false);
  const [newUserID, setNewUserID] = useState("");

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }

  const handleChangeFullname = (evt) => {
    setFullname(evt.target.value);
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  }

  const handleChangeSupervisor = (evt) => {
    setSupervisor(evt.target.value);
  }

  const onAddNewUser = (newUser) => {
    mainApi.addUser(newUser).then((newUser) => {
      setNewUserID(newUser.id)
      console.log(newUser);
      console.log(newUserID);  
    })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }

  const onAddUserByOrg = (id, newUser) => {
      mainApi.patchUserByOrg(id, newUser).then((org) => {
        console.log(org);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }

  const onHandleSubmit = () => {
    onAddNewUser({
      email: email,
      password: password,
      name: name,
      fullname: fullname,
    })
    onAddUserByOrg({
      id: id,
      newUser: newUserID,
    })
  }

  useEffect(() => {
    dispatch(setHeaderTitle("Создать пользователя"));
  })


  return (
    <div className="newuser">
      <div className="newuser__formContainer">
        <p className="newuser__captions">Организация</p>
        <div className="newuser__input">{id}</div>
        <p className="newuser__captions">Фамилия</p>
        <input className="newuser__input" placeholder="Введите фамилию" onChange={handleChangeFullname} />
        <p className="newuser__captions">Имя</p>
        <input className="newuser__input" placeholder="Введите имя" onChange={handleChangeName} />
        <p className="newuser__captions">Супервайзер</p>
        <div className="newuser__radioContainer">
          <label htmlFor="radioUser1">Да</label>
          <input
            className="newuser__radioButton"
            id="radioUser1"
            name="radioUser"
            type="radio"
            value="true"
            onChange={handleChangeSupervisor}
          />
          <label htmlFor="radioUser2">Нет</label>
          <input
            className="newuser__radioButton"
            id="radioUser2"
            name="radioUser"
            type="radio"
            value="false"
            onChange={handleChangeSupervisor}
          />
        </div>
        <p className="newuser__captions">E-mail</p>
        <input
          className="newuser__input"
          type="email"
          placeholder="Введите email для отправки приглашения"
          onChange={handleChangeEmail}
        ></input>
        <p className="newuser__captions">Пароль</p>
        <input
          className="newuser__input"
          type="password"
          placeholder="Введите пароль"
          onChange={handleChangePassword}
        ></input>
      </div>

      <button className="newuser__submitBtn" onClick={() => {
        onHandleSubmit();
        navigate(`/organizations/users/${id}`);
      }}>Зарегистрировать</button>
    </div>
  );
}

export default NewUser;
