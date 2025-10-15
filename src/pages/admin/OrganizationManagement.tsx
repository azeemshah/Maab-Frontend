import React, { useState } from "react";
import { UserType } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { MainLayout } from "@/layout";

export const OrganizationManagement: React.FC = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t("users.title")}
            </h2>
            <p className="text-muted-foreground">
              Manage organizations and their details
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t("users.addUser")}
            </Button>

            <Button
              className="gap-2">
              <Plus className="h-4 w-4" />
              {t("users.addSupplier") ?? "Add Supplier"}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("common.search")}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap"></div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[7rem]">
                    {t("users.firstName")}
                  </TableHead>
                  <TableHead className="min-w-[7rem]">
                    {t("users.lastName")}
                  </TableHead>
                  <TableHead>{t("users.email")}</TableHead>
                  <TableHead className="min-w-[7rem]">
                    {t("users.userType")}
                  </TableHead>
                  <TableHead>{t("users.organization")}</TableHead>
                  <TableHead>{t("users.status")}</TableHead>
                  <TableHead>{t("users.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
              </TableBody>
            </Table>

            {[].length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No organizations found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};
