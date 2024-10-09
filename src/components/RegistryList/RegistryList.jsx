import React, { useEffect, useState } from "react";
import "./RegistryList.css";
import registrys from "../../data/registrys";
import NavBar from "../NavBar/NavBar";
import mainApi from "../../utils/api/mainApi";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RegistryList() {
  const { currentOrganization } = useSelector(state => state.organizationSlice);
  const [filterRegistrys, setFilterRegistrys] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (item) => {
    const date = new Date(item);
    return date.toLocaleDateString();
  }

  const handleSelectedRegistry = ({ _id }) => {
    navigate("/registry/" + _id);
  };

  useEffect(() => {
    if (currentOrganization) {
      dispatch(setHeaderTitle("Реестры"));
      mainApi.getRegistriesByOrgID(currentOrganization._id).then((data) => {
        setFilterRegistrys(data.registry);
      }).catch((err) => console.log(err));
    }
  }, [currentOrganization]);

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
            <div key={index} onClick={() => {
              dispatch(setHeaderTitle("Реестр " + item.registryID));
              handleSelectedRegistry(item);
            }
            } className="registrylist__items">
              <p className="registrylist__itemCaption">{item.registryID}</p>
              <p className="registrylist__itemCaption">{formatDate(item.createdAt)}</p>
              <p className="registrylist__itemCaption">{formatDate(item.dateOfPay)}</p>
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
