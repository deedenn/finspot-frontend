import React, { useState } from "react";
import "./RegistryList.css";
import registrys from "../../data/registrys";

import NavBar from "../NavBar/NavBar";

function RegistryList() {
  const [filterRegistrys, setFilterRegistrys] = useState(registrys);

  return (
    <div>
      <NavBar setFilterReguests={setFilterRegistrys} reguests={registrys} />

      <div className="registrylist">
        <div className="registrylist__captions registrylist__items">
          <p className="registrylist__header_caption">№ реестра</p>
          <p className="registrylist__header_caption">Дата создания</p>
          <p className="registrylist__header_caption">Дата оплаты</p>
          <p className="registrylist__header_caption">Итоговая сумма</p>
          <p className="registrylist__header_caption">Статус</p>
        </div>
        {filterRegistrys.map((item, index) => {
          return (
            <div key={index} className="registrylist__items">
              <p className="registrylist__itemCaption">{item.number}</p>
              <p className="registrylist__itemCaption">{item.dateToCreate}</p>
              <p className="registrylist__itemCaption">{item.dateOfPay}</p>
              <p className="registrylist__itemCaption">{item.sum}</p>
              <p className="registrylist__itemCaption">{item.state}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RegistryList;
