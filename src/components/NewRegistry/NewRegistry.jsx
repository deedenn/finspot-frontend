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

  const formatDate = (item) => {
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

  useEffect(() => {
    setRegistrySum(approvedRequests.reduce((acc, item) => {
      return item.checked ? acc + item.amount : acc + 0
    }, 0))
  }, [approvedRequests])

  useEffect(() => {
    dispatch(setHeaderTitle("Создать реестр"));
    mainApi.getRequestsApproved(currentOrganization._id)
      .then((data) => {
        setApprovedRequests(data.request.map(item => ({ ...item, checked: false })));
      }).catch((err) => console.log(err));

  }, [currentOrganization])

  function onHandleSubmit() {
    console.log(registrySum);

    onAddRegistry({
      organization: currentOrganization._id,
      owner: { user },
      amount: registrySum,
      requests: requests,
      statuslog: [{
        date: Date.now(),
        stage: "Черновик",
        user: user.name,
      }]
    });
    navigate('/registrylist');
  }

  return (
    <div className="newregistry">
      <div className="newregistryInfo">

        <p className="newregistryInfoCaption">Организация</p>
        <p className="newregistryInfoCaption">Дата создания</p>
        <p className="newregistryInfoCaption">Итоговая сумма</p>
        <p className="newregistryInfoCaption">Статус</p>

        <p className="newregistryInfoValue">{currentOrganization.name}</p>
        <p className="newregistryInfoValue">{formatDate(Date())}</p>
        <p className="newregistryInfoValue">{registrySum}</p>
        <p className="newregistryInfoValue">Черновик</p>

      </div>
      {approvedRequests.map((item, index) => {
        return (
          <div key={index} className="newregistryList">
            <input onChange={(e) => {
              setApprovedRequests(approvedRequests.map(elem => {
                item.checked = e.target.checked
                return item._id === elem._id ? item : elem
              }))
              setRegistrySum(item.amount);
              setRequests(item._id);
            }
            }
              className="newregistrylist__item" type="checkbox"></input>
            <ul className="newregistrylist__item">{formatDate(item.createdAt)}</ul>
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