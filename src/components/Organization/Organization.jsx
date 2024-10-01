import React, { useEffect, useState } from "react";
import "./Organization.css";
import mainApi from "../../utils/api/mainApi";
import { useNavigate, useParams } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch } from "react-redux";

function Organization() {
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

  return (
    <div className="organization">
      <div className="organization__container">
        <div className="organization__headerContainer">
          <p className="organization__caption">ИНН</p>
          <p className="organization__value">{organization.inn}</p>
          <p className="organization__caption">Название</p>
          <p className="organization__value">{organization.name}</p>
          <p className="organization__caption">Активная</p>
          <p className="organization__value">{organization.isActive ? "Да" : "Нет"}</p>
          <p className="organization__caption">Оплачено</p>
          <p className="organization__value">{organization.paystatus ? "Да" : "Нет"}</p>
          <p className="organization__caption">Оплачено до</p>
          <p className="organization__value">{organization.expiredof}</p>
        </div>

        <button className="organization__button" onClick={() => {
          navigate(`/organizations/users/${id}`);
          dispatch(setHeaderTitle("Пользователи"))
        }}>Пользователи</button>
        <button className="organization__button" onClick={() => {
          navigate(`/organization/settings/${id}`);
          dispatch(setHeaderTitle(`Настройки организации ${organization.name}`))
        }}>Изменить маршруты</button>

      </div>
    </div>
  );
}

export default Organization;
