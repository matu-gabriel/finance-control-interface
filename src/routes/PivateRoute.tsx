import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

type ElementType = {
  element: JSX.Element;
};

export const PrivateRoute = ({ element }: ElementType) => {
  const { isAuthenticated } = useAuth();
  const userData = localStorage.getItem("userData");

  if (!isAuthenticated && !userData) {
    return <Navigate to="/login" />;
  }

  return element;
};
