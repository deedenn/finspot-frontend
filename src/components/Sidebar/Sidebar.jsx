import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Sidebar.css";
import { actionSidebar, setHeaderTitle } from "../../redux/slices/viewSlice";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/logo.png";
import requestImg from "../../images/sidebarBtn_request.png";
import registryImg from "../../images/sidebarBtn_registry.png";
import profileImg from "../../images/sidebarBtn_profile.png";
import addReguestImg from "../../images/sidebarBtn_addRequest.png";
import addRegistryImg from "../../images/sidebarBtn_addRegistry.png";
import usersImg from "../../images/sidebarBtn_users.png";
import logoChange from "../../images/sidebarBtn_changeLogo.png";
import logoutImg from "../../images/sidebarBtn_logout.png";
import navbarBtnImg from "../../images/navbarBtn.png";

function Sidebar(onSignOut) {
  const openedSidebar = useSelector((state) => state.viewSlice.openedSidebar);
  const dispatch = useDispatch();

  return (
    <div className={`sidebar ${!openedSidebar && "sidebar_close"}`}>
      <Link to="/" className="sidebar__logo">
        <img className="sidebar__logo_image" alt="Finspot" src={logo}></img>
        {openedSidebar && <div className="sidebar__logo_caption">FINSPOT</div>}
        <button
          className={`sidebarHideBtn ${
            !openedSidebar && "sidebarHideBtn-close"
          }`}
          onClick={() => dispatch(actionSidebar())}
        ></button>
      </Link>

      <div className="sidebarMenu">
        {openedSidebar && <div className="sidebarMenuCaption">Меню</div>}
        <Link
          onClick={() => dispatch(setHeaderTitle("Заявки"))}
          to="/requestlist"
          className="sidebarBtn"
          alt="Заявки"
          type="button"
        >
          <img className="sidebarBtnLogo" alt="Заявки" src={requestImg}></img>
          {openedSidebar && <div className="sidebarBtnCaption">Заявки</div>}
          <div className="sidebarBtnCounter">3</div>
        </Link>

        <Link
          onClick={() => dispatch(setHeaderTitle("Реестры"))}
          to="/registrylist"
          className="sidebarBtn"
          alt="Реестры"
          type="button"
        >
          <img className="sidebarBtnLogo" alt="Реестры" src={registryImg}></img>
          {openedSidebar && <div className="sidebarBtnCaption">Реестры</div>}
          <div className="sidebarBtnCounter">2</div>
        </Link>

        <Link
          onClick={() => dispatch(setHeaderTitle("Профиль"))}
          to="/profile"
          className="sidebarBtn"
          alt="Профиль"
          type="button"
        >
          <img
            className="sidebarBtnLogo"
            alt="Личный кабинет"
            src={profileImg}
          ></img>
          {openedSidebar && (
            <div className="sidebarBtnCaption">Личный кабинет</div>
          )}
        </Link>
      </div>
      <div className="sidebarMenu">
        {openedSidebar && (
          <div className="sidebarMenuCaption">Быстрые действия</div>
        )}

        <Link
          onClick={() => dispatch(setHeaderTitle("Создать заявку"))}
          to="/request/add"
          className="sidebarBtn"
          alt="Создать заявку"
          type="button"
        >
          <img
            className="sidebarBtnLogo"
            alt="Создать заявку"
            src={addReguestImg}
          ></img>
          {openedSidebar && (
            <div className="sidebarBtnCaption">Создать заявку</div>
          )}
        </Link>

        <Link
          onClick={() => dispatch(setHeaderTitle("Создать реестр"))}
          to="/registry"
          className="sidebarBtn"
          alt="Создать реестр"
          type="button"
        >
          <img
            className="sidebarBtnLogo"
            alt="Создать реестр"
            src={addRegistryImg}
          ></img>
          {openedSidebar && (
            <div className="sidebarBtnCaption">Создать реестр</div>
          )}
        </Link>
      </div>
      <div className="sidebarMenu">
        <div className="sidebarMenuCaption">Компания</div>
        <Link
          onClick={() => dispatch(setHeaderTitle("Пользователи"))}
          to="/users"
          className="sidebarBtn"
          alt="Пользовователи"
          type="button"
        >
          <img
            className="sidebarBtnLogo"
            alt="Пользователи"
            src={usersImg}
          ></img>
          {openedSidebar && (
            <div className="sidebarBtnCaption">Пользователи</div>
          )}
        </Link>
        <Link
          onClick={() => dispatch(setHeaderTitle("Организации"))}
          to="/organizations"
          className="sidebarBtn"
          alt="Организации"
          type="button"
        >
          <img className="sidebarBtnLogo" alt="Органзации" src={usersImg}></img>
          {openedSidebar && (
            <div className="sidebarBtnCaption">Организации</div>
          )}
        </Link>
      </div>
      <Link
        to="/signin"
        className="sidebarBtn"
        alt="Выйти"
        type="button"
        onClick={onSignOut}
      >
        <img className="sidebarBtnLogo" alt="Выйти" src={logoutImg}></img>
        <div className="sidebarBtnCaption">Выйти</div>
      </Link>
    </div>
  );
}

export default Sidebar;
