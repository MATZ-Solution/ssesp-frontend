import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRouteForm = ({ children }) => {

    const location = useLocation().pathname
    const formPath = location.split("/")[2];
    const formNumber = formPath.split("-")[2];

    const currentStepName = useSelector(state => state.auth.user.formStatus)
    const state = useSelector(state => state.auth.user.formStatus)

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

    return <Navigate to={`/form/${currentStepName}`} replace />;
};

export default ProtectedRouteForm;