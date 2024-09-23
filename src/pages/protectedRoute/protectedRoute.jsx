import { useEffect } from "react";
import auth from "../../utils/api/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector(state => state.userSlice)

  return user ? children : null
}


