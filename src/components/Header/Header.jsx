import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";

function Header() {
  const headerTitle = useSelector((state) => state.viewSlice.headerTitle);

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="header">
      <h1>{headerTitle}</h1>

      <div className="header__user">
        <div className="header__user_logo"></div>
        <div className="header__user_logoContainer">
          <div className="header__user_company">ООО "Лютик"</div>
          <div className="header__user_role">{currentUser.name+' '+currentUser.fullname}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
