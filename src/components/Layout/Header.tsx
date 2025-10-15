import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Menu } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { COMMON_ROUTES } from "@/routes";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="h-auto py-2 bg-card border-b border-border flex flex-wrap items-center justify-between sm:px-6 px-1">
      <div>
        {isMobileScreen && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:justify-end justify-center px-2">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            {t("dashboard.welcome")}, {user?.first_name}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span>{user?.first_name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(COMMON_ROUTES.PROFILE)}>
                <User className="h-4 w-4 mr-2" />
                {t("nav.profile")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t("auth.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
