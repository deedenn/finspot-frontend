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
        }
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  return children;
}
