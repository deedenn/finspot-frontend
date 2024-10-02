import React, { useEffect, useRef } from "react";
import "./NavBar.css";
import { useState } from "react";

const arrCategory = [
  "Черновик",
  "Согласование ФД",
  "Утверждение ГД",
  "Утверждено",
  "В реестре",
  "В оплате",
  "Оплачено",
  "Отменено",
];

function NavBar({ setFilterRequests, requests, stateRequests }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  function handleClick(e, index) {
    setActiveIndex(index);
    setFilterRequests(() =>
      stateRequests.filter((item) => item.status === e.target.textContent)
    );
  }

  function handleClickSelect(e) {
    setFilterRequests(() =>
      stateRequests.filter((item) => item.status === e.target.value)
    );
  }

  return (
    <div className="navbar">
      <div className="navbar__list">
      <li
        onClick={() => {
          setActiveIndex(-1);
          setFilterRequests(requests);
        }}
        className={`navbar__status ${activeIndex === -1 && "navbar__status_active"
          }`}
      >
        Все
      </li>
      {arrCategory.map((item, index) => {
        return (
          <li
            key={index}
            onClick={(e) => handleClick(e, index)}
            className={`navbar__status ${activeIndex === index && "navbar__status_active"
              }`}
          >
            {item}
          </li>
        );
      })}
      </div>
      <select name="filterStatus" id="filterStatus" className="navbar__select" onChange={(e) => handleClickSelect(e)}>
        <option onClick={() => {
          setActiveIndex(-1);
          setFilterRequests(requests);
        }}>-- Фильтр -- </option>
      {arrCategory.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      })}
      </select>
    </div>
  );
}

export default NavBar;
