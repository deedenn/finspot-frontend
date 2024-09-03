import React, { useState } from "react";
import './NewOrganization.css';
import mainApi from "../../utils/api/mainApi";
import { useNavigate } from "react-router-dom";

function NewOrganization() {

    const [name, setName] = useState("");
    const [inn, setInn] = useState("");
    const navigate = useNavigate();

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeInn = (evt) => {
        setInn(evt.target.value);
    }

    const onAddOrganization = (newOrganization) => {
        console.log(newOrganization);
        mainApi.addOrganization(newOrganization).then((newOrganization) => {
          console.log(newOrganization);
        })
          .catch((err) => {
            console.error(`Ошибка: ${err}`);
          })
    }

    const onHandleSubmit = () => {
        onAddOrganization({
            inn: inn,
            name: name,
        });
        navigate('/organizationslist');
    }

    return (
        <div className="newOrganization">
            <div className="newOrganization__container">
                <p>ИНН</p>
                <input name="inn" placeholder="Введите ИНН" onChange={handleChangeInn}></input>
                <p>Название</p>
                <input name="name" placeholder="Введите название" onChange={handleChangeName}></input>
            </div>
            <button className="newOrganization__addBtn" onClick={onHandleSubmit}>Создать организацию</button>
        </div>
    )
}

export default NewOrganization;