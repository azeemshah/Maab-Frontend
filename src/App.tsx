import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import { UserManagement } from "./pages/admin/UserManagement";
import { OrganizationManagement } from "./components/Organizations/OrganizationManagement";
import { ADMIN_ROUTES, COMMON_ROUTES, PUBLIC_ROUTES } from "./routes";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { Profile } from "./pages/Profile";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route
      path={COMMON_ROUTES.PROFILE}
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path={PUBLIC_ROUTES.LOGIN}
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path={PUBLIC_ROUTES.FORGOT_PASSWORD}
      element={
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      }
    />
    <Route
      path={PUBLIC_ROUTES.RESET_PASSWORD}
      element={
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      }
    />
    <Route
      path={ADMIN_ROUTES.DASHBOARD}
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path={ADMIN_ROUTES.USERS}
      element={
        <ProtectedRoute>
          <UserManagement />
        </ProtectedRoute>
      }
    />
    <Route
      path={ADMIN_ROUTES.ORGANIZATIONS}
      element={
        <ProtectedRoute>
          <OrganizationManagement />
        </ProtectedRoute>
      }
    />
    <Route path="/" element={<Navigate to={PUBLIC_ROUTES.LOGIN} replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
