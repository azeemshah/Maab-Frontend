import { Navigate } from "react-router-dom";
import { PUBLIC_ROUTES } from ".";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-enterprise-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={PUBLIC_ROUTES.LOGIN} replace />
  );
};
