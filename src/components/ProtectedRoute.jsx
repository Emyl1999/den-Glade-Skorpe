import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, role, redirectTo = "/", children }) => {
  if (!isAllowed || role !== "admin") {
    return <Navigate to={redirectTo} />;
  }
  return children;
};

export default ProtectedRoute;
