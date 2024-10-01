import React, { useState } from "react";
import './NewOrganization.css';
import mainApi from "../../utils/api/mainApi";
import { useNavigate } from "react-router-dom";

function NewOrganization() {

    const [name, setName] = useState("");
    const [inn, setInn] = useState("");
    const [prefix, setPrefix] = useState("");
    const navigate = useNavigate();

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
            prefix: prefix,
        });
        navigate('/organizationslist');
    }

    return (
        <div className="newOrganization">
            <div className="newOrganization__container">
                <p>ИНН</p>
                <input name="inn" placeholder="Введите ИНН" onChange={(evt) => setInn(evt.target.value)}></input>
                <p>Название</p>
                <input name="name" placeholder="Введите название" onChange={(evt) => setName(evt.target.value)}></input>
                <p>Префикс (макс 4 символа)</p>
                <input name="prefix" placeholder="Введите префикс" onChange={(evt) => setPrefix(evt.target.value)}></input>
            </div>
            <button className="newOrganization__addBtn" onClick={onHandleSubmit}>Создать организацию</button>
        </div>
    )
}

export default NewOrganization;