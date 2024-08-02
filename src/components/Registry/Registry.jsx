import React from "react";
import './Registry.css';

function Registry() {
  return (

    <div className="registry">
      <div className="registryInfo">

        <p className="registryInfoCaption">№ реестра</p>
        <p className="registryInfoCaption">Дата создания</p>
        <p className="registryInfoCaption">Итоговая сумма</p>
        <p className="registryInfoCaption">Статус</p>

        <p className="registryInfoValue">7843548949</p>
        <p className="registryInfoValue">20.03.2024</p>
        <p className="registryInfoValue">4 006 000,00</p>
        <p className="registryInfoValue">Черновик</p>

      </div>
      <div className="registryList">
        <ul className="registrylist__item">20.03.2024</ul>
        <ul className="registrylist__item">ООО "Ромашковые сети"</ul>
        <ul className="registrylist__item">Климантович А.В.</ul>
        <ul className="registrylist__item">schet-act.jpg</ul>
        <ul className="registrylist__item">2 000 000.00</ul>
        <ul className="registrylist__item">Черновик</ul>

        <ul className="registrylist__item">01.03.2024</ul>
        <ul className="registrylist__item">ООО "Незабудка"</ul>
        <ul className="registrylist__item">Климантович А.В.</ul>
        <ul className="registrylist__item">schet-act.jpg</ul>
        <ul className="registrylist__item">6 000.00</ul>
        <ul className="registrylist__item">Согласование ФД</ul>
      </div>



      <button className="requestBtn">Создать реестр</button>
      <button className="requestBtn">Сохранить</button>
      <button className="requestBtn">Отменить</button>
    </div>

  );
}

export default Registry;
