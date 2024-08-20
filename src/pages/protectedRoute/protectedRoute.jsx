import { useEffect } from "react";
import auth from "../../utils/api/auth";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    auth
      .checkToken()
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);

  return children;
}
