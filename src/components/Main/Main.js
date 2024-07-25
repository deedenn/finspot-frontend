import React from "react";
import './Main.css';
import RequestList from "../RequestList/RequestList";

function Main() {
    return (
        <div className="Main">
            <p>Главное окно</p>

            <div className="navRequestStatus">Статус заявок</div>
            <RequestList />

        </div>

    )
}

export default Main;