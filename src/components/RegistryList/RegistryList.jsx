import React from "react";
import './RegistryList.css';
import NavBar from "../NavBar/NavBar";

function RegistryList() {
    return (
        <div >
            <NavBar />

            <div className="registrylist">

                <div className="registrylist__captions registrylist__items">
                    <p className="registrylist__header_caption">№ реестра</p>
                    <p className="registrylist__header_caption">Дата создания</p>
                    <p className="registrylist__header_caption">Дата оплаты</p>
                    <p className="registrylist__header_caption">Итоговая сумма</p>
                    <p className="registrylist__header_caption">Статус</p>
                </div>

                <div className="registrylist__items">
                    <ul className="registrylist__itemCaption">12343213-001</ul>
                    <ul className="registrylist__itemCaption">20.02.2024</ul>
                    <ul className="registrylist__itemCaption">25.03.2024</ul>
                    <ul className="registrylist__itemCaption">2 000 000.00</ul>
                    <ul className="registrylist__itemCaption">Утверждение ГД</ul>

                    <ul className="registrylist__itemCaption">12343213-002</ul>
                    <ul className="registrylist__itemCaption">20.02.2024</ul>
                    <ul className="registrylist__itemCaption">25.03.2024</ul>
                    <ul className="registrylist__itemCaption">6 000.00</ul>
                    <ul className="registrylist__itemCaption">Отменено</ul>
                </div>

            </div>

        </div>


    )
}

export default RegistryList;