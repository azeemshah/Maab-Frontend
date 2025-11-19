import React, { useState } from "react";
import { useAuth, UserType } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTES, PUBLIC_ROUTES } from "@/routes";
import { LanguageSwitcher } from "@/components/Layout/LanguageSwitcher";

export const Login: React.FC = () => {
  const { login, loading, errors } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "" as UserType | "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate(ADMIN_ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-enterprise-gray-50 to-enterprise-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-enterprise-gray-900 mb-2">
            {t("gen.mainHeading")}
          </h1>
          <p className="text-enterprise-gray-600">{t("auth.heading")}</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold">
                {t("auth.login")}
              </CardTitle>
              <LanguageSwitcher />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder={"john@example.com"}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  error={errors.password}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-enterprise-primary hover:bg-enterprise-primary-dark"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("auth.signingIn")}
                  </>
                ) : (
                  t("auth.loginButton")
                )}
              </Button>
              <NavLink
                to={PUBLIC_ROUTES.FORGOT_PASSWORD}
                className="text-sm text-enterprise-primary hover:underline mt-2 block text-center"
              >
                {t("auth.forgotPassword")}
              </NavLink>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
