import { Navigate } from "react-router-dom";
import { useReduxSelector } from "../store";
import { ReactNode } from "react";

interface ProtectedRouteInter {
  children:ReactNode
}

const ProtectedRoute = ({children}:ProtectedRouteInter):ReactNode => {
  const { role} = useReduxSelector((store) => store.user);
  if (role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;