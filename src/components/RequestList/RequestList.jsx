import React, { useState } from "react";
import "./RequestList.css";
import NavBar from "../NavBar/NavBar";
import requests from "../../data/requests";

function RequestList() {
  const [filterRequests, setFilterRequests] = useState(requests);

  return (
    <div className="request__container">
      <NavBar setFilterRequests={setFilterRequests} requests={requests} />

      <div className="requestlist">
        <div className="requestlist__captions requestlist__items">
          <p className="requestlist__header_caption">Дата создания</p>
          <p className="requestlist__header_caption">Контрагент</p>
          <p className="requestlist__header_caption">Инициатор</p>
          <p className="requestlist__header_caption">Файл</p>
          <p className="requestlist__header_caption">Сумма</p>
          <p className="requestlist__header_caption">Статус</p>
        </div>
        {filterRequests.map((item, index) => {
          return (
            <div key={index} className="requestlist__items">
              <p className="requestlist__items_caption">{item.dateToCreate}</p>
              <p className="requestlist__items_caption">{item.contrAgent}</p>
              <p className="requestlist__items_caption">{item.initiator}</p>
              <p className="requestlist__items_caption">{item.file}</p>
              <p className="requestlist__items_caption">{item.sum}</p>
              <p className="requestlist__items_caption">{item.state}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RequestList;
