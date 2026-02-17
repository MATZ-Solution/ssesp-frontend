import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteAmin = ({ allowedRoles, children }) => {

  const user = useSelector(state => state.auth.user);
  const { id, role } = user || {}; 

  if (!id || !role) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRouteAmin;