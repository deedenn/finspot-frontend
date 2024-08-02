import React from "react";
import { Link, useLocation } from 'react-router-dom';

import "./Sidebar.css";
import { actionSidebar } from "../../redux/slices/viewSlice";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/logo.png";
import requestImg from "../../images/sidebarBtn_request.png";
import registryImg from "../../images/sidebarBtn_registry.png";
import profileImg from "../../images/sidebarBtn_profile.png";
import addReguestImg from "../../images/sidebarBtn_addRequest.png";
import addRegistryImg from "../../images/sidebarBtn_addRegistry.png";
import logoutImg from "../../images/sidebarBtn_logout.png";
import navbarBtnImg from "../../images/navbarBtn.png";

function Sidebar() {
  const openedSidebar = useSelector((state) => state.viewSlice.openedSidebar);
  const dispatch = useDispatch();

  return (
    <div className={`sidebar ${!openedSidebar && "sidebar_close"}`}>
      <div className="sidebar__logo">
        <img className="sidebar__logo_image" alt="Finspot" src={logo}></img>
        <div className="sidebar__logo_caption">FINSPOT</div>
        <button
          className="sidebarHideBtn"
          onClick={() => dispatch(actionSidebar())}
        ></button>
      </div>

      <div className="sidebarMenu">
        <div className="sidebarMenuCaption">Меню</div>
        <Link to="/requestlist" className="sidebarBtn" alt="Заявки" type="button">
          <img className="sidebarBtnLogo" alt="Заявки" src={requestImg}></img>
          <div className="sidebarBtnCaption">Заявки</div>
          <div className="sidebarBtnCounter">3</div>
        </Link>

        <Link to="/registrylist" className="sidebarBtn" alt="Реестры" type="button">
          <img className="sidebarBtnLogo" alt="Реестры" src={registryImg}></img>
          <div className="sidebarBtnCaption">Реестры</div>
          <div className="sidebarBtnCounter">2</div>
          </Link>

        <Link to="/profile" className="sidebarBtn" alt="Профиль" type="button">
          <img
            className="sidebarBtnLogo"
            alt="Личный кабинет"
            src={profileImg}
          ></img>
          <div className="sidebarBtnCaption">Личный кабинет</div>
          </Link>

      </div>
      <div className="sidebarMenu">
        <div className="sidebarMenuCaption">Быстрые действия</div>

        <Link to="/request" className="sidebarBtn" alt="Создать заявку" type="button">
          <img
            className="sidebarBtnLogo"
            alt="Создать заявку"
            src={addReguestImg}
          ></img>
          <div className="sidebarBtnCaption">Создать заявку</div>
          </Link>

          <Link to="/registry" className="sidebarBtn" alt="Создать реестр" type="button">
          <img
            className="sidebarBtnLogo"
            alt="Создать реестр"
            src={addRegistryImg}
          ></img>
          <div className="sidebarBtnCaption">Создать реестр</div>
          </Link>

      </div>
      <div className="sidebarMenu">
        <div className="sidebarMenuCaption">Компания</div>
        <button className="sidebarBtn">Пользователи</button>
        <button className="sidebarBtn">Изменить логотип</button>
      </div>
      <Link to="/login" className="sidebarBtn" alt="Выйти" type="button">
        <img className="sidebarBtnLogo" alt="Выйти" src={logoutImg}></img>
        <div className="sidebarBtnCaption">Выйти</div>
        </Link>
    </div>
  );
}

export default Sidebar;
