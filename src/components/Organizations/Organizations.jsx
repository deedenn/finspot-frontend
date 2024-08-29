import React, { useEffect, useState } from "react";
import "./Organizations.css";
import mainApi from "../../utils/api/mainApi";

function Organizations() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    mainApi.getOrganizations().then((data) => {
      setOrganizations(data.organizations);
    });
  }, []);

  return (
    <div>
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
          )
        }
        )}
      </div>
    </div>
  );
}

export default Organizations;
