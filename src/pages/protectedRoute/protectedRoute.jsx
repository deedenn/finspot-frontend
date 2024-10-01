import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector(state => state.userSlice)

  return user ? children : null
}


