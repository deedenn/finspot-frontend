import React, { useEffect, useState } from "react";
import "./RegistryList.css";
import registrys from "../../data/registrys";
import NavBar from "../NavBar/NavBar";
import mainApi from "../../utils/api/mainApi";

function RegistryList() {
  const [filterRegistrys, setFilterRegistrys] = useState([]);

  useEffect(() => {
    mainApi.getRegistries().then((data) => {
      setFilterRegistrys(data.registry);
      console.log(data.registry);
    }
    )
  }, []);
   

  return (
    <div>
      <NavBar setFilterRequests={setFilterRegistrys} requests={registrys} />

      <div className="registrylist">
        <div className="registrylist__captions registrylist__items">
          <p className="registrylist__header_caption">№ реестра</p>
          <p className="registrylist__header_caption">Дата создания</p>
          <p className="registrylist__header_caption">Дата оплаты</p>
          <p className="registrylist__header_caption">Итоговая сумма</p>
          <p className="registrylist__header_caption">Статус</p>
        </div>
        {Object.values(filterRegistrys).map((item, index) => {
          return (
            <div key={index} className="registrylist__items">
              <p className="registrylist__itemCaption"></p>
              <p className="registrylist__itemCaption">{item.createdAt}</p>
              <p className="registrylist__itemCaption">{item.dateOfPay}</p>
              <p className="registrylist__itemCaption">{item.amount}</p>
              <p className="registrylist__itemCaption">{item.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RegistryList;
