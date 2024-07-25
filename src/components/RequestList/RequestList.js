import React from "react";
import './RequestList.css';

function RequestList() {
    return (
        <div className="requestlist">
            <div classname="requestlist__captions">
                <p className="requestlist__header_caption">Дата создания</p>
                <p className="requestlist__header_caption">Контрагент</p>
                <p className="requestlist__header_caption">Инициатор</p>
                <p className="requestlist__header_caption">Файл</p>
                <p className="requestlist__header_caption">Сумма</p>
                <p className="requestlist__header_caption">Статус</p>
            </div>
            <div classname="requestlist__list">
                <p classname="">20.03.2024</p>
            </div>
        </div>

    )
}

export default RequestList;