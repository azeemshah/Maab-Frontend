import React, { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";

// Define the props for the layout component
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // State for mobile sidebar visibility remains here
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toggle function remains here
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar component */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={toggleMobileSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header component */}
        <Header onMenuToggle={toggleMobileSidebar} />

        {/* The main content area where your page components will render */}
        <main className="flex-1 overflow-auto p-6 bg-[#dfdfdf42]">
          <div className="max-w-7xl mx-auto">
            {children} {/* Renders the content passed to the layout */}
          </div>
        </main>
      </div>
    </div>
  );
};
