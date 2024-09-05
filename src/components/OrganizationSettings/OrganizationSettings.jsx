import React, { useState } from "react";
import './OrganizationSettings.css';
import mainApi from "../../utils/api/mainApi";
import { useParams } from "react-router-dom";

function OrganizationSettings() {

    const { id } = useParams();
    const [organization, setOrganization] = useState([]);
    const [requestGB, setRequestGB] = useState("")
    const [requestFD, setRequestFD] = useState("");
    const [requestGD, setRequestGD] = useState("");

    async function handleChooseUser(e) {
        e.preventDefault();
        const { user } = await mainApi.getInfoUserByEmail(requestGB);

        if (!user) return;
        const res = await mainApi.updateOrganizationApprovers(id, [
            {
                name: "Согласование ГБ",
                id: user._id,
            },
        ]);
        console.log(res);
    }


    async function getDataOrganization() {
        try {
            const dataOrganization = await mainApi.getOrganizationByID(id);
            const userGB = await mainApi.getInfoUserByID(
                dataOrganization.approveUsers[0].id
            );
            const userFD = await mainApi.getInfoUserByID(
                dataOrganization.approveUsers[1].id
            );
            //const userGD = await mainApi.getInfoUserByID(dataOrganization.approveUsers[2].id);
            setRequestGB(userGB.user.email);
            setRequestFD(userFD.user.email);
            //setRequestGD(userGD.data.email);

            const newnewGB = mainApi.getInfoUserByEmail(userGB.user.email);
            console.log(newnewGB.id);

            setOrganization(dataOrganization);
        } catch (err) {
            console.log(err);
        }
    }

    useState(() => {
        getDataOrganization();
    }, []);


    return (
        <div className="organizationSettings">
            <div>
                <form onSubmit={handleChooseUser}>
                    <p>Маршрут согласования заявок и реестров</p>
                    <div className="organization__trackContainer">
                        <p>Согласование ГБ</p>
                        {/* <input
                            name="requestGB"
                            id="requestGB"
                            className="organization__input"
                            type="email"
                            value={requestGB}
                            onChange={(e) => setRequestGB(e.target.value)}
                        ></input> */}
                        <select name="requestGB" id="reguestGB"></select>
                        <p>Согласование ФД</p>
                        <input
                            name="requestFD"
                            id="requestFD"
                            className="organization__input"
                            type="email"
                            value={requestFD}
                            onChange={(e) => setRequestFD(e.target.value)}
                        ></input>
                        <p>Утверждение ГД</p>
                        <input
                            name="requestGD"
                            id="requestGD"
                            className="organization__input"
                            type="email"
                            value={requestGD}
                            onChange={(e) => setRequestGD(e.target.value)}
                        ></input>
                    </div>
                    <button className="organizations__button" >Изменить маршрут</button>
                </form>
            </div>
        </div>
    )
}

export default OrganizationSettings;