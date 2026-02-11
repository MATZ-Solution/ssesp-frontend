import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const status = "guardian-info/2";

    if (status === 'incomplete') {
        return <Navigate to="/form/student-info" replace />;
    }

    if (status === 'complete') {
        return <Navigate to="/complete" replace />;
    }

    if (status.includes('/')) {
        const [route, step] = status.split("/");
        <Navigate to={`/form/${route}`} replace />;
    }
    return children;

};

export default ProtectedRoute;