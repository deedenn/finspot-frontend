import React, { useEffect, useState } from "react";
import './NewRegistry.css';
import { useDispatch, useSelector } from "react-redux";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import mainApi from "../../utils/api/mainApi";
import { useNavigate } from "react-router-dom";

function NewRegistry() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userSlice);
  const { currentOrganization } = useSelector(state => state.organizationSlice);
  const [requests, setRequests] = useState([]);
  const [registrySum, setRegistrySum] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const navigate = useNavigate();

  const handleDate = (item) => {
    const date = new Date(item);
    return date.toLocaleDateString();
  };

  const onAddRegistry = (newRegistry) => {
    console.log(newRegistry);
    mainApi
      .addRegistry(newRegistry)
      .then((newRegistry) => {
        console.log(newRegistry);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  function onHandleSubmit() {
    onAddRegistry({
      organization: currentOrganization._id,
      owner: { user },
      requests: requests,
      statuslog: [{
        date: Date.now(),
        stage: "Черновик",
        user: user.name,
      }]
    });
    navigate('/');
  }

  const onSum = () => {

  }

  useEffect(() => {
    dispatch(setHeaderTitle("Создать реестр"));
    mainApi.getRequestsApproved(currentOrganization._id)
      .then((data) => {
        setApprovedRequests(data.request);
      }).catch((err) => console.log(err));

  }, [currentOrganization])

  return (
    <div className="newregistry">
      <div className="newregistryInfo">

        <p className="newregistryInfoCaption">№ реестра</p>
        <p className="newregistryInfoCaption">Дата создания</p>
        <p className="newregistryInfoCaption">Итоговая сумма</p>
        <p className="newregistryInfoCaption">Статус</p>

        <p className="newregistryInfoValue">7843548949</p>
        <p className="newregistryInfoValue">{Date()}</p>
        <p className="newregistryInfoValue">{registrySum}</p>
        <p className="newregistryInfoValue">Черновик</p>

      </div>
      {approvedRequests.map((item, index) => {
        return (
          <div key={index} className="newregistryList">
            <input onChange={() => {
              console.log(item._id);
              requests.push(item._id);
              setRegistrySum(item.amount);
              console.log(requests);
            }
            }
              className="newregistrylist__item" type="checkbox"></input>
            <ul className="newregistrylist__item">{handleDate(item.createdAt)}</ul>
            <ul className="newregistrylist__item">{item.contragent}</ul>
            <ul className="newregistrylist__item">{item.description}</ul>
            <ul className="newregistrylist__item">{item.file}</ul>
            <ul className="newregistrylist__item">{item.amount}</ul>
            <ul className="newregistrylist__item">{item.status}</ul>
          </div>
        )
      })}

      <button className="newregistryBtn" onClick={onHandleSubmit}>Создать реестр</button>
    </div>
  )
}

export default NewRegistry;