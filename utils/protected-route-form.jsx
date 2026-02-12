import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRouteForm = ({ children }) => {

    const location = useLocation().pathname
    const formPath = location.split("/")[2];
    const formNumber = formPath.split("-")[2];

    const currentStepName = useSelector(state => state.auth.user.formStatus)
    
    console.log("currentStepName: ", currentStepName)

    const currentStepNumber = formPath.split("-")[2];

    if (!currentStepName) {
        if (formPath !== "student-info-1") {
            return <Navigate to={`/form/student-info-1`} replace />
        }
        return children;
    }

    if (currentStepName && (Number(formNumber) <= Number(currentStepNumber))) {
        return children;
    }
    
    <Navigate to={`/form/${currentStepName}`} replace />;
    console.log("1")
    return children
};

export default ProtectedRouteForm;