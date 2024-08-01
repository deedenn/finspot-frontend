import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h1>Заявки</h1>
      <button className="header__createRequestBtn">+ Создать заявку</button>
      <div classname="header__user">
        <div className="header__user_logo"></div>
        <div className="header__user_company">ООО "Лютик"</div>
        <div className="header__user_role">Главный бухгалтер</div>
      </div>
    </div>
  );
}

export default Header;
