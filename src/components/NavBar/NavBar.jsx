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

  return (
    <div className="navbar">
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
  );
}

export default NavBar;
