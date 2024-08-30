import React, { useEffect, useState } from "react";
import "./RequestList.css";
import NavBar from "../NavBar/NavBar";
import mainApi from "../../utils/api/mainApi";

function RequestList() {
  const [filterRequests, setFilterRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState();

  const handleSelectedRequest = (evt) => {
    setSelectedRequest(evt.target.value);
    console.log(evt.target);
  }

  useEffect(() => {
    mainApi.getRequests().then((data) => {
      setFilterRequests(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="request__container">
      <NavBar setFilterRequests={setFilterRequests} requests={filterRequests} />

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
          console.log(typeof(filterRequests))
          return (
            <div key={index} className="requestlist__items" onClick={handleSelectedRequest}>
              <p className="requestlist__items_caption">{item.createdAt}</p>
              <p className="requestlist__items_caption">{item.contragent}</p>
              <p className="requestlist__items_caption">
                {item.owner.name} {item.owner.fullname}              </p>
              <p className="requestlist__items_caption">{item.file}</p>
              <p className="requestlist__items_caption">{item.amount}</p>
              <p className="requestlist__items_caption">{item.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RequestList;
