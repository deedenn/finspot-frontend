import React, { useEffect, useState } from "react";
import './OrganizationSettings.css';
import mainApi from "../../utils/api/mainApi";
import { useFetchers, useParams } from "react-router-dom";

function OrganizationSettings() {

    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [approveUsers, setApproveUsers] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [requestGB, setRequestGB] = useState("");
    const [requestFD, setRequestFD] = useState("");
    const [requestGD, setRequestGD] = useState('Не указано');

    async function handleChooseUser(e) {
        try {
            e.preventDefault();
            console.log(requestFD, requestGB, requestGD);
            const res = await mainApi.updateOrganizationApprovers(id, [
                {
                    name: "Согласование ГБ",
                    id: requestGB,
                },
                {
                    name: "Согласование ФД",
                    id: requestFD,
                },
                {
                    name: "Утверждение ГД",
                    id: requestGD,
                },
            ]);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }


    async function getDataOrganization() {
        try {
            const dataOrganization = await mainApi.getOrganizationByID(id);
            setOrganization(dataOrganization);

            console.log(dataOrganization.approveUsers[0].id);

            const users = await Promise.all(dataOrganization.users.map((id) => mainApi.getInfoUserByID(id)));
            setUsers(users);
            const approveUsers = await Promise.all(dataOrganization.approveUsers.map(({ id }) => mainApi.getInfoUserByID(id)));
            setApproveUsers(approveUsers);
            setRequestGB(approveUsers[0].user._id)
            setRequestFD(approveUsers[1].user._id)
            setRequestGD(approveUsers[2].user._id)

        } catch (err) {
            console.log(err);
        }
    }
    console.log(approveUsers);


    useEffect(() => {
        getDataOrganization();
    }, []);

    console.log(requestGB, requestFD, requestGD);


    return (
        <div className="organizationSettings">
            <div>
                <form onSubmit={handleChooseUser}>
                    <p>Маршрут согласования заявок</p>
                    <div className="organization__trackContainer">
                        <p>Главный бухгалтер (создание реестров, согласование заявок)</p>
                        <select name="requestGB" id="reguestGB" value={requestGB} onChange={(e) => setRequestGB(e.target.value)}>
                            <option value="">Не Указано</option>
                            {users.map((item, index) => {
                                return <option key={index} value={item.user._id}>{`${item.user.name} ${item.user.fullname}`}</option>
                            })}
                        </select>
                        <p>Согласование финансовым директором</p>
                        <select name="requestFD" id="reguestFD" value={requestFD} onChange={(e) => setRequestFD(e.target.value)}>
                            <option value="">Не Указано</option>
                            {users.map((item, index) => {
                                return <option key={index} value={item.user._id}>{`${item.user.name} ${item.user.fullname}`}</option>
                            })}
                        </select>
                        <p>Утверждение ГД</p>
                        <select name="requestGD" id="reguestGD" value={requestGD} onChange={(e) => setRequestGD(e.target.value)}>
                            <option value="">Не Указано</option>
                            {users.map((item, index) => {
                                return <option key={index} value={item.user._id}>{`${item.user.name} ${item.user.fullname}`}</option>
                            })}
                        </select>
                    </div>
                    <button className="organization__button" >Изменить маршрут</button>
                </form>
            </div>
        </div>
    )
}

export default OrganizationSettings;