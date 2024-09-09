import React, { useEffect, useState } from "react";
import "./OrganizationsList.css";
import mainApi from "../../utils/api/mainApi";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrganizationsList() {
  const [organizations, setOrganizations] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectedOrganization = ({ _id }) => {
    navigate("/organization/" + _id);
  };


  useEffect(() => {
    dispatch(setHeaderTitle("Организации"))
    mainApi.getOrganizations().then((data) => {
      setOrganizations(data.organizations);
    });
  }, []);

  return (
    <div className="organizationsList">
      <div className="organizationsList__container">
        <div className=" organizationsList__values organizationsList__captions">
          <p>Организация</p>
          <p>ИНН</p>
          <p>Оплачено до</p>
        </div>

        {Object.values(organizations).map((item, index) => {
          return (
            <div key={index} className="organizationsList__values organizationsList__hover"
              onClick={() => {
                dispatch(setHeaderTitle("Организация " + item.name));
                handleSelectedOrganization(item);
              }}>
              <p>{item.name}</p>
              <p>{item.inn}</p>
              <p>{item.expiredof}</p>
            </div>
          );
        })}
      </div>
      <button
        className="organizationsList__addBtn"
        onClick={() => {
          navigate("/organizations/add");
        }}
        type="button"
      >
        Добавить организацию
      </button>
    </div>
  );
}

export default OrganizationsList;
