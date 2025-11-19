import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

import { SidebarProps } from "@/types";
import { AdminSidebar } from "./AdminSidebar";

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onMobileToggle,
}) => {
  const { user, selectedOrganization } = useAuth();
  const { t, direction } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}
      <div
        className={cn(
          "sidebar fixed lg:relative w-[17rem] h-full bg-card border-border flex flex-col z-50 transform transition-transform duration-300 ease-in-out",
          direction === "rtl" ? "border-l" : "border-r",
          isMobileOpen || !isMobile
            ? "translate-x-0"
            : direction === "rtl"
            ? "translate-x-full"
            : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-enterprise-primary">
              {t("gen.mainHeading")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedOrganization?.name || t("gen.systemAdministration")}
            </p>
          </div>
          {isMobile && (
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={onMobileToggle}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <AdminSidebar />
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-enterprise-primary flex items-center justify-center text-primary-foreground font-medium">
              {user.first_name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {t(`userType.${user.user_type}`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
