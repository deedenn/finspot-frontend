import React, { useEffect } from "react";
import './NewRegistry.css';
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "../../redux/slices/viewSlice";

function NewRegistry() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeaderTitle("Создать реестр"));
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
        <div className="newregistryList">
          <ul className="newregistrylist__item">20.03.2024</ul>
          <ul className="newregistrylist__item">ООО "Ромашковые сети"</ul>
          <ul className="newregistrylist__item">Климантович А.В.</ul>
          <ul className="newregistrylist__item">schet-act.jpg</ul>
          <ul className="newregistrylist__item">2 000 000.00</ul>
          <ul className="newregistrylist__item">Черновик</ul>
  
          <ul className="newregistrylist__item">01.03.2024</ul>
          <ul className="newregistrylist__item">ООО "Незабудка"</ul>
          <ul className="newregistrylist__item">Климантович А.В.</ul>
          <ul className="newregistrylist__item">schet-act.jpg</ul>
          <ul className="newregistrylist__item">6 000.00</ul>
          <ul className="newregistrylist__item">Согласование ФД</ul>
        </div>
  
  
  
        <button className="newregistryBtn">Создать реестр</button>
        <button className="newregistryBtn">Сохранить</button>
        <button className="newregistryBtn">Отменить</button>
      </div>
    )
}

export default NewRegistry;