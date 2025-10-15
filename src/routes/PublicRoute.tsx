import { Navigate } from "react-router-dom";
import { ADMIN_ROUTES } from ".";
import { useAuth } from "@/contexts/AuthContext";

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    isAuthenticated,
    // loading,
  } = useAuth();

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-enterprise-primary"></div>
  //     </div>
  //   );
  // }

  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={ADMIN_ROUTES.DASHBOARD} replace />
  );
};
