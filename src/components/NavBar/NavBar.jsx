import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <li className="navbar__status navbar__status_active">Все</li>
      <li className="navbar__status">Черновик</li>
      <li className="navbar__status">Согласование ФД</li>
      <li className="navbar__status">Согласование ГД</li>
      <li className="navbar__status">Утверждено</li>
      <li className="navbar__status">В реестре</li>
      <li className="navbar__status">В оплате</li>
      <li className="navbar__status">Оплачено</li>
      <li className="navbar__status">Отменено</li>
    </div>
  );
}

export default NavBar;
