import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  User,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTES } from "@/routes";
import { SidebarItem } from "@/types";

const sidebarItems: SidebarItem[] = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    label: "nav.dashboard",
    path: ADMIN_ROUTES.DASHBOARD,

  },
  {
    key: "organizations",
    icon: Building2,
    label: "nav.organizations",
    path: ADMIN_ROUTES.ORGANIZATIONS,
  },
  {
    key: "profile",
    icon: User,
    label: "nav.profile",
    path: "/profile",
  },
];

export const AdminSidebar: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="flex-1 p-4">
        <ul className="space-y-2">
        {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = false;

            return (
            <li key={item.key}>
                <button
                onClick={() => navigate(item.path)}
                className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors",
                    isActive
                    ? "bg-enterprise-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{t(item.label)}</span>
                </button>
            </li>
            );
        })}
        </ul>
    </nav>
  );
};
