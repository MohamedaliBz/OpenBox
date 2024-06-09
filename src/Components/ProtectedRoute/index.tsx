import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Role } from "../../Utils/userRoles";

type Props = {
  children: React.ReactNode;
  roles: Role[];
};

const ProtectedRoute = ({ children, roles }: Props) => {
  const { user, userRole } = useAuth();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      toast.error(`You are not authenticated, you should Log in`, {
        autoClose: 1500,
        position: 'top-center',
      });
      setAuthorized(false);
    } else if (userRole.current && roles.includes(userRole.current)) {
      setAuthorized(true);
    } else {
      toast.error('You do not have permission to access this page', {
        autoClose: 1500,
        position: 'top-center',
      });
      setAuthorized(false);
    }
  }, [user, userRole, roles]);

  if (authorized === null) {
    // Show loading or placeholder while checking authorization
    return <div>Loading...</div>;
  }

  if (authorized === false) {
    return <Navigate to="/inventory" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
