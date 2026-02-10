// src/routes/AuthRoute.tsx
import SomethingWentWrong from "../src/pages/SomeThingWent";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ status, children }) => {

  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location

  const step = status.split("-")[1]
  const route = status.split("-")[0]

  const verify_otp = localStorage.getItem("verify-otp")
  const change_pass = localStorage.getItem("change_pass")

  navigate(`/${route}`)

  return <>{children}</>;
};

export default ProtectedRoute;
