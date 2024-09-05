import React, { useEffect, useState } from "react";
import "./Organization.css";
import mainApi from "../../utils/api/mainApi";
import { useNavigate, useParams } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch } from "react-redux";

function Organization() {
  const currentUser = CurrentUserContext;
  const [organization, setOrganization] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getDataOrganization() {
    try {
      const dataOrganization = await mainApi.getOrganizationByID(id);
      setOrganization(dataOrganization);
      } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataOrganization();
  }, []);

  console.log(organization);
  console.log(organization.isActive);

  return (
    <div className="organization">
      <div className="organization__container">
        <div className="organization__headerContainer">
          <p className="organization__caption">ИНН</p>
          <p className="organization__value">{organization.inn}</p>
          <p className="organization__caption">Название</p>
          <p className="organization__value">{organization.name}</p>
          <p className="organization__caption">Активная</p>
          <p className="organization__value">{organization.isActive}</p>
          <p className="organization__caption">Оплачено до</p>
          <p className="organization__value">{organization.paystatus}</p>
        </div>

        <button className="organization__button" onClick={() => {
          navigate(`/organizations/users/${id}`);
          dispatch(setHeaderTitle("Пользователи"))
        }}>Пользователи</button>
        <button className="organization__button" onClick={() => {
          navigate('/organization/settings/:id');
          dispatch(setHeaderTitle("Настройки организации"))
        }}>Изменить маршруты</button>

      </div>
    </div>
  );
}

export default Organization;
