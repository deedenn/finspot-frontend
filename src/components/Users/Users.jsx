import React, { useEffect, useState } from "react";
import "./Users.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useSelector, useDispatch } from "react-redux";
import mainApi from '../../utils/api/mainApi';

function Users() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [organization, setOrganization] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  async function getDataOrganization() {
    try {
      const dataOrganization = await mainApi.getOrganizationByID(id);
      setOrganization(dataOrganization);
      console.log(dataOrganization.users);
      setUsers(dataOrganization.users);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    dispatch(setHeaderTitle("Пользователи"));
    getDataOrganization();
  }, []);


  return (
    <div className="users">
      <div>{`Организация ${organization.name}`}</div>
      <div className="users__container">
        <div className="users__values users__captions">
          <p>ID</p>
          <p>Имя</p>
          <p>email</p>
          <p>Роль</p>
        </div>
        {users.map((item, index) => {
          return (
            <div key={index} className="users__values">
              <p>{item.id}</p>
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
          navigate(`/users/add/${id}`);
        }
        }
        type="button"
      >
        Добавить пользователя
      </button>
    </div>
  );
}

export default Users;
