import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

type ElementType = {
  element: JSX.Element;
};

export const PrivateRoute = ({ element }: ElementType) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};
