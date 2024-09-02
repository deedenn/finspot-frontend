import React, { useEffect, useState } from "react";
import './Organization.css';
import mainApi from "../../utils/api/mainApi";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";

function Organization() {

    const currentUser = CurrentUserContext;
    const [organization, setOrganization] = useState([]);
    const [requestGB, setRequestGB] = useState('');
    const [requestFD, setRequestFD] = useState('');
    const [requestGD, setRequestGD] = useState('');
    const { id } = useParams();
    const [user, setUser] = useState({});

    async function getDataOrganization() {
        try {
            const dataOrganization = await mainApi.getOrganizationByID(id);
            const userGB = await mainApi.getInfoUserByID(dataOrganization.approveUsers[0].id);
            const userFD = await mainApi.getInfoUserByID(dataOrganization.approveUsers[1].id);
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

    function handleChooseUser() {
        const newGB = mainApi.getInfoUserByEmail(requestGB);

        console.log(newGB);
        mainApi.updateOrganizationApprovers(id, [{
             name: "Согласование ГБ",
             user: newGB,
        },
        {
            name: "Согласование ФД",
            user: requestFD,
        },
        {
            name: "Утверждение ГД",
            user: requestGD,
        },
    ])
    }

    useEffect(() => {
        getDataOrganization();
     
    }, []);

    console.log(organization);


    return (
        <div className="organizaion">
            <div className="organization__container">
                <div className="organization__headerContainer">
                    <p className="organization__caption">ИНН</p>
                    <p className="organization__value">{organization.inn}</p>
                    <p className="organization__caption">Название</p>
                    <p className="organization__value">{organization.name}</p>
                    <p className="organization__caption">Активная</p>
                    <p className="organization__value">{organization.isActive}</p>
                    <p className="organization__caption">Оплачено до</p>
                    <p className="organization__value">{organization.paystatus}</p>
                </div>

                <form>
                    <p>Маршрут согласования заявок и реестров</p>
                    <div className="organization__trackContainer">
                        <p>Согласование ГБ</p>
                        <input name='requestGB' id="requestGB" className="organization__input" type="email" value={requestGB} onChange={e => setRequestGB(e.target.value)}></input>
                        <p>Согласование ФД</p>
                        <input name='requestFD' id="requestFD" className="organization__input" type="email" value={requestFD} onChange={e => setRequestFD(e.target.value)}></input>
                        <p>Утверждение ГД</p>
                        <input name='requestGD' id="requestGD" className="organization__input" type="email" value={requestGD} onChange={e => setRequestGD(e.target.value)}></input>
                    </div>
                    {/* <p>Маршрут согласования реестров</p>
                    <div className="organization__trackContainer">
                        <p>Согласование ГБ</p>
                        <input className="organization__input"></input>
                        <p>Согласование ФД</p>
                        <input className="organization__input"></input>
                        <p>Утверждение ГД</p>
                        <input className="organization__input"></input>
                    </div> */}
                    <button onSubmit={handleChooseUser}>Изменить маршрут</button>
                </form>
            </div>
        </div >
    )
}

export default Organization;