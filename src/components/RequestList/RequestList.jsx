import React, { useEffect, useState } from "react";
import "./RequestList.css";
import NavBar from "../NavBar/NavBar";
import mainApi from "../../utils/api/mainApi";
import { useNavigate } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch } from "react-redux";

function RequestList() {
  const [filterRequests, setFilterRequests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectedRequest = ({ _id }) => {
    navigate("/request/" + _id);
  };

  const handleDate = (item) => {
    const date = new Date(item);
    return date.toLocaleDateString();
  }

  useEffect(() => {
    dispatch(setHeaderTitle("Заявки"));
    mainApi.getRequests().then((data) => {
      setFilterRequests(data);
      console.log(typeof (data[0].createdAt));

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
          return (
            <div
              key={index}
              className="requestlist__items requestlist__hover"
              onClick={() => {
                dispatch(setHeaderTitle("Заявка " + item._id));
                handleSelectedRequest(item);
              }}
            >
              <p className="requestlist__items_caption">{handleDate(item.createdAt)}</p>
              <p className="requestlist__items_caption">{item.contragent}</p>
              <p className="requestlist__items_caption">
                {item.owner.name} {item.owner.fullname}{" "}
              </p>
              <p className="requestlist__items_caption">{item.file}</p>
              <p className="requestlist__items_caption requestlist__items_sum">{item.amount}</p>
              <p className="requestlist__items_caption requestlist__items_status">{item.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RequestList;
