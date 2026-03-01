import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";


const ProtectedRoute = ({children} : {children : JSX.Element}) => {
    const user = localStorage.getItem('user');
    if(!user){
        alert("Access Denied!!! Please Login first.");
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default ProtectedRoute;