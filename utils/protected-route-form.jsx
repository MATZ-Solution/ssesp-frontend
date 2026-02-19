import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteForm = ({ children }) => {

  const location = useLocation().pathname;
  const formPath = location.split("/")[2];

  // ✅ Guard against undefined formPath
  if (!formPath) {
    return <Navigate to="/form/personal-info-1" replace />;
  }

  const formName = formPath.split("-");
  const formNumber = formName[formName.length - 1];

  const currentStepPath = useSelector(state => state.auth.user?.formStatus);

  // ✅ If no formStatus, allow access (or redirect to first step)
  if (!currentStepPath) {
    return children;
  }

  // ✅ CHECK IF COMPLETED FIRST - before splitting
  if (currentStepPath === "completed") {
    // If user is on /form/complete, allow it
    if (formPath === "complete") {
      return children;
    }
    // Otherwise redirect to complete page
    return <Navigate to="/form/complete" replace />;
  }

  // ✅ Only split if NOT completed
  const currentStepName = currentStepPath.split("-");
  const currentStepNumber = currentStepName[currentStepName.length - 1];

  // ✅ Prevent skipping steps
  if (Number(formNumber) > Number(currentStepNumber)) {
    return <Navigate to={`/form/${currentStepPath}`} replace />;
  }

  return children;
};

export default ProtectedRouteForm;