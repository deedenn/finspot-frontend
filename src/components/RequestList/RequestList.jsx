import React, { useEffect, useState } from "react";
import "./RequestList.css";
import NavBar from "../NavBar/NavBar";
import mainApi from "../../utils/api/mainApi";
import { useNavigate } from "react-router-dom";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch, useSelector } from "react-redux";

const colorStatus = {
  "Утверждено": "requestlist__items_status-approved",
  "Оплачено": "requestlist__items_status-payd",
  "Отменено": "requestlist__items_status-cancel",
};

function RequestList() {
  const [filterRequests, setFilterRequests] = useState([]);
  const [stateRequests, setStateRequests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.userSlice);
  const { currentOrganization } = useSelector(state => state.organizationSlice);


  const handleSelectedRequest = ({ _id }) => {
    navigate("/request/" + _id);
  };

  const formatDate = (item) => {
    const date = new Date(item);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (currentOrganization) {
      dispatch(setHeaderTitle("Заявки"));
      mainApi.getRequestsByOrgID(currentOrganization._id).then((data) => {
        console.log(data.request);
        setStateRequests(data.request)
        setFilterRequests(data.request);
      }).catch((err) => console.log(err));
    }
  }, [currentOrganization]);

  return (
    <div className="request__container">
      <NavBar setFilterRequests={setFilterRequests} stateRequests={stateRequests} requests={filterRequests} />

      <div className="requestlist">
        <div className="requestlist__captions requestlist__items">
          <p className="requestlist__header_caption">Дата создания</p>
          <p className="requestlist__header_caption">Контрагент</p>
          <p className="requestlist__header_caption">Содержание</p>
          <p className="requestlist__header_caption requestlist__header_caption-none">Файл</p>
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
              <p className="requestlist__items_caption">
                {formatDate(item.createdAt)}
              </p>
              <p className="requestlist__items_caption">{item.contragent}</p>
              <p className="requestlist__items_caption">
                {item.description}
              </p>
              <p className="requestlist__items_caption requestlist__items_caption-none">{item.file}</p>
              <p className="requestlist__items_caption requestlist__items_sum">
                {item.amount}
              </p>
              <p className={`requestlist__items_caption requestlist__items_status ${colorStatus[item.status]}`}>
                {item.status}
              </p>
            </div>

          );
        })}
      </div>
    </div>
  );
}

export default RequestList;
