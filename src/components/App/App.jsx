import React from "react";
import "./App.css";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import RequestList from "../RequestList/RequestList";
import RegistryList from "../RegistryList/RegistryList";
import NewRequest from "../NewRequest/NewRequest";
import Request from "../Request/Request";
import Registry from "../Registry/Registry";
import Login from "../Login/Login";
import Users from "../Users/Users";
import NewUser from "../NewUser/NewUser";
import OrganizationsList from "../OrganizationsList/OrganizationsList";
import Profile from "../Profile/Profile";
import mainApi from "../../utils/api/mainApi";
import ProtectedRoute from "../../pages/protectedRoute/protectedRoute";

import auth from "../../utils/api/auth";

import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NewOrganization from "../NewOrganization/NewOrganization";
import Organization from "../Organization/Organization";
import OrganizationSettings from "../OrganizationSettings/OrganizationSettings";
import NewRegistry from "../NewRegistry/NewRegistry";
import { setUser } from "../../redux/slices/userSlice";
import { setOrganization } from "../../redux/slices/organizationSlice";
import AdminPage from "../AdminPage/AdminPage";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    document.title = 'Finspot - финансовая платформа';
    const jwt = localStorage.getItem("token");
    if (jwt) {
      Promise.all([auth.checkToken(), mainApi.getRequests(), mainApi.getOrganizations()])
        .then(([userData, requestsData, organizations]) => {
          dispatch(setOrganization(organizations.organizations));
          setLoggedIn(true);
          dispatch(setUser(userData.data));
          navigate(pathname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  return (
    <div className="app">
      {pathname !== "/signin" ? (
        <Sidebar />
      ) : null}
      <div className="page">
        {pathname !== "/signin" ? <Header /> : null}
        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
          <Route
            path="/requestlist"
            element={
              <ProtectedRoute >
                <RequestList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute >
                <RequestList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registrylist"
            element={
              <ProtectedRoute >
                <RegistryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request/:id"
            element={
              <ProtectedRoute >
                <Request />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request/add"
            element={
              <ProtectedRoute >
                <NewRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registry"
            element={
              <ProtectedRoute >
                <Registry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registry/:id"
            element={
              <ProtectedRoute >
                <Registry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registry/add"
            element={
              <ProtectedRoute >
                <NewRegistry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizations/users/:id"
            element={
              <ProtectedRoute >
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add/:id"
            element={
              <ProtectedRoute >
                <NewUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizationslist"
            element={
              <ProtectedRoute >
                <OrganizationsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/:id"
            element={<ProtectedRoute >
              <Organization />
            </ProtectedRoute>
            }
          />
          <Route
            path="/organization/settings/:id"
            element={
              <ProtectedRoute >
                <OrganizationSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizations/add"
            element={
              <ProtectedRoute >
                <NewOrganization />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute >
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute >
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
