import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/loginUser" replace />;
};

export default PrivateRoute;
