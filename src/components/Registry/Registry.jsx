import React, { useEffect, useState } from "react";
import './Registry.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import mainApi from "../../utils/api/mainApi";

function Registry() {
  const { id } = useParams();

  const user = useSelector(state => state.userSlice);

  const [registry, setRegistry] = useState({});
  const [requests, setReguests] = useState([]);
  const [requestList, setReguestList] = useState([]);
  const [statuslog, setStatuslog] = useState([]);
  const [owner, setOwner] = useState({});
  const [message, setMessage] = useState("");

  async function getDataRegistry() {
    try {
      const dataRegistry = await mainApi.getRegistryByID(id);
      const { data } = await mainApi.getInfoUser(dataRegistry.owner);
      setReguests(dataRegistry.requests);
      setRegistry(dataRegistry);
      setStatuslog(dataRegistry.statuslog);
      setOwner(data);
      const requestList = await mainApi.getRequestByID(requests);
      setReguestList(requestList);
    } catch (err) {
      console.log(err);
    }
  }

  const formatDate = (item) => {
    const date = new Date(item);
    return date.toLocaleDateString();
  };

  const formatTime = (item) => {
    const date = new Date(item);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  }

  // async function checkRegistry() {
  //   try {
  //     mainApi.checkRequest({
  //       _id: request._id,
  //       status: "Утверждение ГД",
  //       stageStatus: 1,
  //       message: message,
  //       user: user.user.name + " " + user.user.fullname,
  //     });
  //     navigate('/');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function cancelRegistry() {
  //   try {
  //     mainApi.cancelRequest({
  //       _id: request._id,
  //       message: message,
  //       user: user.user.name + " " + user.user.fullname,
  //     });
  //     navigate('/');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    getDataRegistry();
  }, []);

  return (
    <div className="registry">
      <div className="registryInfo">

        <p className="registryInfoCaption">№ реестра</p>
        <p className="registryInfoCaption">Дата создания</p>
        <p className="registryInfoCaption">Итоговая сумма</p>
        <p className="registryInfoCaption">Статус</p>

        <p className="registryInfoValue">{registry.registryID}</p>
        <p className="registryInfoValue">{formatDate(registry.createdAt)}</p>
        <p className="registryInfoValue">{registry.amount}</p>
        <p className="registryInfoValue">{registry.status}</p>

      </div>
      {requestList.map((item, index) => {
        return (
          <div key={index} className="registryList">
            <ul className="registrylist__item">{item.createdAt}</ul>
            <ul className="registrylist__item">{item.contragent}</ul>
            <ul className="registrylist__item">d</ul>
            <ul className="registrylist__item">{item.file}</ul>
            <ul className="registrylist__item">{item.amount}</ul>
            <ul className="registrylist__item">{item.status}</ul>
          </div>
        )

      })}

      <button className="requestBtn">Создать реестр</button>
      <button className="requestBtn">Отменить</button>
    </div>

  );
}

export default Registry;
