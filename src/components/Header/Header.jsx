import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";

function Header() {
  const headerTitle = useSelector((state) => state.viewSlice.headerTitle);

  return (
    <div className="header">
      <h1>{headerTitle}</h1>
      {/* <button className="header__createRequestBtn">+ Создать заявку</button> */}
      <div className="header__user">
        <div className="header__user_logo"></div>
        <div className="header__user_logoContainer">
          <div className="header__user_company">ООО "Лютик"</div>
          <div className="header__user_role">Главный бухгалтер</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
