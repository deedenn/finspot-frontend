import React, { useEffect } from "react";
import './AdminPage.css';
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "../../redux/slices/viewSlice";
import { useNavigate } from "react-router-dom";

function AdminPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setHeaderTitle("Панель администратора"));
    }, []);

    return (
        <div className="adminpage">
            <div>Всего компаний</div>
            <div>Список неоплаченных</div>
            <div>Список всех пользователей</div>

            <button
                className="adminPageOrganization__addBtn"
                onClick={() => {
                    navigate("/organizations/add");
                }}
                type="button"
            >
                Добавить организацию
            </button>

        </div>
    )
}

export default AdminPage;