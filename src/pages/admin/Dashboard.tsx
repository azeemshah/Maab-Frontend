import React from "react";
import { DashboardOverview } from "@/components/Dashboard/DashboardOverview";
import { MainLayout } from "@/layout";

export const Dashboard: React.FC = () => {

  return (
    <MainLayout>
      <DashboardOverview />
    </MainLayout>
  );
};