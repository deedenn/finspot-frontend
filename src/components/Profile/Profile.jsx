import React from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);

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
      <button className="profile__changePasswordBtn">Изменить данные</button>
      <button className="profile__changePasswordBtn">Изменить пароль</button>
    </div>
  );
}

export default Profile;
