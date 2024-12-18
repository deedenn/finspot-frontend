import React, { useEffect } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsByOrg } from "../../redux/slices/requestsSlice";
import imgBurger from '../../images/menu_burger.svg';
import mainApi from "../../utils/api/mainApi";
import { setCurrentOrganization, setOrganization } from "../../redux/slices/organizationSlice";
import { closeSidebar } from "../../redux/slices/viewSlice";


function Header() {
  const headerTitle = useSelector((state) => state.viewSlice.headerTitle);
  const { organizations, currentOrganization } = useSelector((state) => state.organizationSlice);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userSlice);

  useEffect(() => {
    const saveCurrentOrganization = JSON.parse(localStorage.getItem('currentOrg'))
    console.log(saveCurrentOrganization)
    if (saveCurrentOrganization) {
      dispatch(setCurrentOrganization(saveCurrentOrganization));
      console.log(`Current organization: ${saveCurrentOrganization._id}`)
    } else {
      dispatch(setCurrentOrganization(organizations[0]));
      console.log(`Current organization: ${saveCurrentOrganization._id}`)
    }
  }, [])


  async function handleChange(e) {
    const value = e.target.value;
    console.log(value);
    const currentOrganization = await mainApi.getOrganizationByID(value);
    if (currentOrganization) {
      localStorage.setItem('currentOrg', JSON.stringify(currentOrganization))
      dispatch(setCurrentOrganization(currentOrganization));
      console.log(`Current organization: ${currentOrganization._id}`)
    }
  }

  return (
    <div className="header">
      <h1>{headerTitle}</h1>

      <div className="header__user">
        <div className="header__user_logo"></div>
        <div className="header__user_logoContainer">

          <select className="header__user_company" value={currentOrganization?._id || organizations[0]?._id} c onChange={handleChange}>
            {organizations.map(item => {
              return <option key={item._id} value={item._id}>{item.name}</option>
            })}
          </select>
          <div className="header__user_role">{user ? user.name + ' ' + user.fullname : ''}</div>

        </div>
        <button className="header__burger" src={imgBurger} onClick={() => dispatch(closeSidebar())}></button>
      </div>
    </div>
  );
}

export default Header;
