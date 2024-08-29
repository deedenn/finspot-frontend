import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContexts";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div>
      <p>Фамилия</p>
      <p>{currentUser.fullname}</p>
      <p>Имя</p>
      <p>{currentUser.name}</p>
      <p>email</p>
      <p>{currentUser.email}</p>
      <button>Изменить пароль</button>
    </div>
  );
}

export default Profile;
