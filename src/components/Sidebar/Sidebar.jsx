import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Sidebar.css";
import { actionSidebar, closeSidebar } from "../../redux/slices/viewSlice";
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
import mainApi from "../../utils/api/mainApi";

function Sidebar() {
  const smallSidebar = useSelector((state) => state.viewSlice.smallSidebar);
  const closedSidebar = useSelector((state) => state.viewSlice.closedSidebar);
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // запрос заявок для реакции пользователем

  const onUpdateCounter = () => {
    mainApi.getUserRequests(user)
      .then((requests) => {
        console.log(requests);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  // useEffect(() => {
  // }, []);

  // выход
  const onSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  return (
    <div className={`${!closedSidebar && 'sidebar__close'} sidebar__overlay`}>

      <div className={`sidebar ${!smallSidebar && "sidebar__small"} `}>
        <Link to="/" className="sidebar__logo">
          <img className="sidebar__logo_image" alt="Finspot" src={logo}></img>
          {smallSidebar && <div className="sidebar__logo_caption">FINSPOT</div>}
          <button
            className={`sidebarHideBtn ${!smallSidebar && "sidebarHideBtn-close"
              }`}
            onClick={() => dispatch(actionSidebar())}
          ></button>
        </Link>
        <button className="sidebarCloseBtn" onClick={() => dispatch(closeSidebar())}>X</button>

        <div className="sidebarMenu">
          {smallSidebar && <div className="sidebarMenuCaption">Меню</div>}
          <Link

            to="/requestlist"
            className="sidebarBtn"
            alt="Заявки"
            type="button"
          >
            <img className="sidebarBtnLogo" alt="Заявки" src={requestImg}></img>
            {smallSidebar && <div className="sidebarBtnCaption">Заявки</div>}
            <div className="sidebarBtnCounter">3</div>
          </Link>

          <Link

            to="/registrylist"
            className="sidebarBtn"
            alt="Реестры"
            type="button"
          >
            <img className="sidebarBtnLogo" alt="Реестры" src={registryImg}></img>
            {smallSidebar && <div className="sidebarBtnCaption">Реестры</div>}
            <div className="sidebarBtnCounter">2</div>
          </Link>

          <Link

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
            {smallSidebar && (
              <div className="sidebarBtnCaption">Личный кабинет</div>
            )}
          </Link>
        </div>
        <div className="sidebarMenu">
          {smallSidebar && (
            <div className="sidebarMenuCaption">Быстрые действия</div>
          )}

          <Link
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
            {smallSidebar && (
              <div className="sidebarBtnCaption">Создать заявку</div>
            )}
          </Link>

          <Link

            to="/registry/add"
            className="sidebarBtn"
            alt="Создать реестр"
            type="button"
          >
            <img
              className="sidebarBtnLogo"
              alt="Создать реестр"
              src={addRegistryImg}
            ></img>
            {smallSidebar && (
              <div className="sidebarBtnCaption">Создать реестр</div>
            )}
          </Link>
        </div>
        <div className="sidebarMenu">
          {smallSidebar && (
            <div className="sidebarMenuCaption">Компания</div>
          )}

          <Link

            to="/organizationslist"
            className="sidebarBtn"
            alt="Организации"
            type="button"
          >
            <img className="sidebarBtnLogo" alt="Организации" src={usersImg}></img>
            {smallSidebar && (
              <div className="sidebarBtnCaption">Организации</div>
            )}
          </Link>
        </div>
        <Link
          to="/signin"
          className="sidebarBtn sidebarBtn__signout"
          alt="Выйти"
          type="button"
          onClick={onSignOut}
        >
          <img className="sidebarBtnLogo" alt="Выйти" src={logoutImg}></img>
          {smallSidebar && (
            <div className="sidebarBtnCaption">Выйти</div>
          )}
        </Link>
      </div>

    </div>
  );
}

export default Sidebar;
