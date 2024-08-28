import { useEffect } from "react";
import auth from "../../utils/api/auth";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    auth
      .checkToken()
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          // сохранять данные юзера в redux
        } else {
          navigate("/signin");
          console.log("Ошибка обработки");
        }
      })
      .catch(() => {
        navigate("/signin");
        console.log("Ошибка обработки входа");
      });
  }, []);

  return children;
}


// import React from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ isLoggedIn, children }) {
//     if (!isLoggedIn) {
//         return (
//             <Navigate to="/signin" />
//         )

//     }
//     return children;
// }

// export default ProtectedRoute;
