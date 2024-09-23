import React, { useEffect } from "react";
import "./Profile.css";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(setHeaderTitle("Личный кабинет")) }, []);

  return (
    <div className="profile">
      <div className="profile__container">
        <p className="profile__caption">Фамилия</p>
        <p>{user.fullname}</p>
        <p className="profile__caption">Имя</p>
        <p>{user.name}</p>
        <p className="profile__caption">email</p>
        <p>{user.email}</p>
      </div>
      <button className="profile__button">Изменить данные</button>
      <button className="profile__button">Изменить пароль</button>
    </div>
  );
}

export default Profile;
