import React, { useState } from "react";
import { MainLayout } from "@/layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import AvatarUpload from "@/components/AvatarUpload";

export const Profile: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("nav.profile")}
          </h2>
          <p className="text-muted-foreground">{t("profile.description")}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
          <form className="space-y-6">
            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  {t("users.firstName")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full border border-border rounded-md p-2"
                  placeholder={t("users.firstName")}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  {t("users.lastName")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full border border-border rounded-md p-2"
                  placeholder={t("users.lastName")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  {t("users.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-border rounded-md p-2"
                  placeholder={t("users.email")}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  {t("users.contact")}
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full border border-border rounded-md p-2"
                  placeholder={t("users.contact")}
                />
              </div>
            </div>
            <div className="flex justify-start">
              <AvatarUpload
                value={avatarFile}
                onChange={setAvatarFile}
                initialImage=""
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" color="cyan" variant="success" size="sm">
                {t("profile.saveChanges")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
