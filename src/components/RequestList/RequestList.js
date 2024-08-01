import React from "react";
import './RequestList.css';
import NavBar from "../NavBar/NavBar";

function RequestList() {
    return (
        <div >
            <NavBar />

            <div className="requestlist">

                <div className="requestlist__captions">
                    <p className="requestlist__header_caption">Дата создания</p>
                    <p className="requestlist__header_caption">Контрагент</p>
                    <p className="requestlist__header_caption">Инициатор</p>
                    <p className="requestlist__header_caption">Файл</p>
                    <p className="requestlist__header_caption">Сумма</p>
                    <p className="requestlist__header_caption">Статус</p>
                </div>

                <div className="requestlist__items">
                    <ul className="requestlist__itemCaption">20.03.2024</ul>
                    <ul className="requestlist__itemCaption">ООО "Ромашковые сети"</ul>
                    <ul className="requestlist__itemCaption">Климантович А.В.</ul>
                    <ul className="requestlist__itemCaption">schet-act.jpg</ul>
                    <ul className="requestlist__itemCaption">2 000 000.00</ul>
                    <ul className="requestlist__itemCaptionStatus">Черновик</ul>

                    <ul className="requestlist__itemCaption">01.03.2024</ul>
                    <ul className="requestlist__itemCaption">ООО "Незабудка"</ul>
                    <ul className="requestlist__itemCaption">Климантович А.В.</ul>
                    <ul className="requestlist__itemCaption">schet-act.jpg</ul>
                    <ul className="requestlist__itemCaption">6 000.00</ul>
                    <ul className="requestlist__itemCaptionStatus">Согласование ФД</ul>
                </div>

            </div>

        </div>

    )
}

export default RequestList;