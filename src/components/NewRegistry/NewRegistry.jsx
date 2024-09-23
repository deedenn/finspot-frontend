import React, { useEffect, useState } from "react";
import './NewRegistry.css';
import { useDispatch, useSelector } from "react-redux";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import mainApi from "../../utils/api/mainApi";

function NewRegistry() {

  const dispatch = useDispatch();
  const { currentOrganization } = useSelector(state => state.organizationSlice);
  const [approvedRequests, setApprovedRequests] = useState([]);

  const handleDate = (item) => {
    const date = new Date(item);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    dispatch(setHeaderTitle("Создать реестр"));
    mainApi.getRequestsApproved(currentOrganization._id)
      .then((data) => {
        setApprovedRequests(data.request);
      }).catch((err) => console.log(err))
  })

  return (
    <div className="newregistry">
      <div className="newregistryInfo">

        <p className="newregistryInfoCaption">№ реестра</p>
        <p className="newregistryInfoCaption">Дата создания</p>
        <p className="newregistryInfoCaption">Итоговая сумма</p>
        <p className="newregistryInfoCaption">Статус</p>

        <p className="newregistryInfoValue">7843548949</p>
        <p className="newregistryInfoValue">20.03.2024</p>
        <p className="newregistryInfoValue">4 006 000,00</p>
        <p className="newregistryInfoValue">Черновик</p>

      </div>
      {approvedRequests.map((item, index) => {
        return (
          <div key={index} className="newregistryList">
            <input className="newregistrylist__item" type="checkbox"></input>
            <ul className="newregistrylist__item">{handleDate(item.createdAt)}</ul>
            <ul className="newregistrylist__item">{item.contragent}</ul>
            <ul className="newregistrylist__item">{item.description}</ul>
            <ul className="newregistrylist__item">{item.file}</ul>
            <ul className="newregistrylist__item">{item.amount}</ul>
            <ul className="newregistrylist__item">{item.status}</ul>
          </div>
        )
      })}


      <button className="newregistryBtn">Создать реестр</button>
      <button className="newregistryBtn">Сохранить</button>
      <button className="newregistryBtn">Отменить</button>
    </div>
  )
}

export default NewRegistry;