export interface SidebarItem {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

export interface SidebarProps {
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}