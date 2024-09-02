import React, { useEffect, useState } from "react";
import "./Organizations.css";
import mainApi from "../../utils/api/mainApi";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useSelector, useDispatch } from "react-redux";

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    mainApi.getOrganizations().then((data) => {
      setOrganizations(data.organizations);
    });
  }, []);

  return (
    <div className="organizations">
      <div className="organizations__container">
        <div className="organizations__values">
          <p>Организация</p>
          <p>ИНН</p>
          <p>Оплачено до</p>
        </div>

        {Object.values(organizations).map((item, index) => {
          return (
            <div key={index} className="organizations__values">
              <p>{item.name}</p>
              <p>{item.inn}</p>
              <p>{item.expiredof}</p>
            </div>
          );
        })}
      </div>
      <button
        className="organizations__addBtn"
        to="/organizations/add"
        onClick={() => dispatch(setHeaderTitle("Создать организацию"))}
        type="button"
      >
        Добавить организацию
      </button>
    </div>
  );
}

export default Organizations;
