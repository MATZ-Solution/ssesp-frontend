import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteForm = ({ children }) => {

  const location = useLocation().pathname;
  const formPath = location.split("/")[2];
  const formName = formPath.split("-");
  const formNumber = formName[formName.length - 1];

  const currentStepPath = useSelector(state => state.auth.user.formStatus);
  const currentStepName = currentStepPath.split("-");
  const currentStepNumber = currentStepPath === 'completed' 
    ? null 
    : currentStepName[currentStepName.length - 1];


  if (!currentStepNumber) {
    return <Navigate to="/form/complete" replace />;
  }

  if (currentStepNumber && (Number(formNumber) > Number(currentStepNumber))) {
    return <Navigate to={`/form/${currentStepPath}`} replace />;
  }

  return children;
};

export default ProtectedRouteForm;