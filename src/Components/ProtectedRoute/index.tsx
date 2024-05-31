import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }: any) => {
    const { user } = useAuth()

    if (!user) {
        toast.error(`You are not authenticated , you should Log in` , 
                {   autoClose:1500, 
                    position:'top-center',
                });
        return <Navigate to="/login" />;
    }
    
    return (
    <>
        {children}
    </>
    )
};

export default ProtectedRoute