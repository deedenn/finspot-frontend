import React, { useEffect, useState } from "react";
import "./Users.css";
import { Link, useNavigate } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useSelector, useDispatch } from "react-redux";
import mainApi from '../../utils/api/mainApi'

function Users() {
  const dispatch = useDispatch();

const [users, setUsers] = useState([]);
const navigate = useNavigate();

useEffect(() => {
  mainApi.getUsers().then((data) => {
    setUsers(data.users);
  })
}, [])

  return (
    <div className="users">
      <div className="users__container">
        <div className="users__values users__captions">
          <p>Фамилия</p>
          <p>Имя</p>
          <p>email</p>
          <p>Роль</p>
        </div>
      {users.map((item, index) => {
        return (
          <div key={index} className="users__values">
          <p>{item.fullname}</p>
          <p>{item.name}</p>
          <p>{item.email}</p>
          <p></p>
        </div>
        )
      })}

      </div>
      <button
        className="users__addBtn"
        onClick={() => {
          navigate('/users/add');
          dispatch(setHeaderTitle("Создать пользователя"))}
        }
        type="button"
      >
        Добавить пользователя
      </button>
    </div>
  );
}

export default Users;
