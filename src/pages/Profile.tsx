import React, { useState } from "react";
import { MainLayout } from "@/layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import AvatarUpload from "@/components/AvatarUpload";
import { useProfile } from "@/hooks/useProfile";
import { Input } from "@/components/ui/input";
import { Message, MessageType } from "@/components/Message";

export const Profile: React.FC = () => {
  const { t } = useLanguage();

  const userProfile = useProfile();

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
          {userProfile.successMessage && (
            <Message
              type={MessageType.SUCCESS}
              message={userProfile.successMessage}
              onClose={() => userProfile.setSuccessMessage(null)}
            />
          )}
          {userProfile.errorMessage && (
            <Message
              type={MessageType.ERROR}
              message={userProfile.errorMessage}
            />
          )}
          <form className="space-y-6" onSubmit={userProfile.update}>
            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  name="first_name"
                  id="firstName"
                  label={t("users.firstName")}
                  value={userProfile.formData.first_name}
                  onChange={userProfile.handleInputChange}
                  className="w-full border border-border rounded-md p-2"
                  placeholder={t("users.firstName")}
                  error={userProfile.errors.first_name}
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="last_name"
                  id="lastName"
                  label={t("users.lastName")}
                  value={userProfile.formData.last_name}
                  onChange={userProfile.handleInputChange}
                  className="w-full border border-border rounded-md p-2"
                  placeholder={t("users.lastName")}
                  error={userProfile.errors.last_name}
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  label={t("users.email")}
                  value={userProfile.formData.email}
                  onChange={userProfile.handleInputChange}
                  className="w-full border border-border rounded-md p-2"
                  placeholder={t("users.email")}
                  error={userProfile.errors.email}
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="contact_number"
                  id="contact_number"
                  label={t("users.contactNumber")}
                  value={userProfile.formData.contact_number}
                  onChange={userProfile.handleInputChange}
                  className="w-full border border-border rounded-md p-2"
                  placeholder={t("users.contactNumber")}
                  error={userProfile.errors.contact_number}
                />
              </div>
            </div>
            <div className="flex justify-start">
              <AvatarUpload
                value={userProfile.avatarFile}
                onChange={userProfile.setAvatarFile}
                initialImage={userProfile.formData.avatar_url}
                error={userProfile.errors.avatar}
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
