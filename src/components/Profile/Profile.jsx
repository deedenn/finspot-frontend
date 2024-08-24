import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div>
      <div>Фамилия</div>
      <div>{currentUser.data.fullname}</div>
      <div>Имя</div>
      <div>{currentUser.data.name}</div>
      <div>email</div>
      <div>{currentUser.data.email}</div>
      <button>Изменить пароль</button>
    </div>
  );
}

export default Profile;
