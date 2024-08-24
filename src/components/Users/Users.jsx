import React from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useSelector, useDispatch } from "react-redux";

function Users() {
  const dispatch = useDispatch();

  return (
    <div className="users">
      <div className="users__container">
        <div className="users__values users__captions">
          <p>Фамилия</p>
          <p>Имя</p>
          <p>email</p>
          <p>Роль</p>
        </div>

        <div className="users__values">
          <p>Климантович</p>
          <p>Александра</p>
          <p>ivanova@mail.ru</p>
          <p>Главный бухгалтер</p>
        </div>
      </div>
      <Link
        className="users__addBtn"
        to="/users/add"
        onClick={() => dispatch(setHeaderTitle("Создать пользователя"))}
        type="button"
      >
        Добавить пользователя
      </Link>
    </div>
  );
}

export default Users;
