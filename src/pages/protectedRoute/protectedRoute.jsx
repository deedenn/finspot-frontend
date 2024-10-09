import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import auth from "../../utils/api/auth";

export default function ProtectedRoute({ children }) {
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    auth.checkToken()
      .then(() => setIsChecked(true))
      .catch(() => navigate('/signin'))
      .finally(() => setLoading(false))
  }, [navigate])

  return !loading && isChecked ? children : null
}
