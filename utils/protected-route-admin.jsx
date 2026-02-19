import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ allowedRoles, children }) => {

  const user = useSelector(state => state.auth.user);
  const { token, role } = user || {}; 

  if (!token || !role) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;