import React, { useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const dispatch = useDispatch();

  useEffect(() => {dispatch(setHeaderTitle("Личный кабинет"))}, []);

  return (
    <div className="profile">
      <div className="profile__container">
        <p className="profile__caption">Фамилия</p>
        <p>{currentUser.fullname}</p>
        <p className="profile__caption">Имя</p>
        <p>{currentUser.name}</p>
        <p className="profile__caption">email</p>
        <p>{currentUser.email}</p>
      </div>
      <button className="profile__button">Изменить данные</button>
      <button className="profile__button">Изменить пароль</button>
    </div>
  );
}

export default Profile;
