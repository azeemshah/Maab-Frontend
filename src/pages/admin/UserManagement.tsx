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

export const UserManagement: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<UserType | "all">("all");

  // Filter users
  const filteredUsers = [];

  const getUserTypeVariant = (userType: UserType) => {
    switch (userType) {
      case "admin":
        return "destructive";
      case "organization":
        return "default";
      case "user":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t("users.title")}
            </h2>
            <p className="text-muted-foreground">
              Manage users and their permissions
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setFilterType("all")}
                  className={filterType === "all" ? "bg-muted" : ""}
                >
                  All Users
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFilterType("organization")}
                  className={filterType === "organization" ? "bg-muted" : ""}
                >
                  {t("userType.organization")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFilterType("user")}
                  className={filterType === "user" ? "bg-muted" : ""}
                >
                  {t("userType.user")}
                </Button>
              </div>
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
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.first_name}
                    </TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getUserTypeVariant(user.user_type)}>
                        {t(`userType.${user.user_type}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.organizations[0].name || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={user.is_active ? "default" : "secondary"}>
                        {user.is_active ? t("users.active") : t("users.inactive")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No users found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};
