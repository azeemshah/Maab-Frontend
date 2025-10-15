import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
interface CreateCustomerProps {
  onBack?: () => void;
}

export const CreateCustomer: React.FC<CreateCustomerProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    country: "",
    notes: "",
    isActive: true,
    newsletter: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting customer:", formData);
    // TODO: send to backend API
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between align-top">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("users.createCustomer")}
          </h2>
          <p className="text-muted-foreground">{t("users.addnewcustomer")}</p>
        </div>
        <Button onClick={onBack} className="gap-2">
          {language === "ar" ? (
            <ArrowRight className="h-4 w-4" />
          ) : (
            <ArrowLeft className="h-4 w-4" />
          )}
          {t("users.back")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("users.customerinformation")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("users.firstName")}</Label>
                <Input
                  id="firstName"
                  placeholder={t("users.firstName")}
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{t("users.lastName")}</Label>
                <Input
                  id="lastName"
                  placeholder={t("users.lastName")}
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("users.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("users.email")}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("users.phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  className="rtl:text-right ltr:text-left"
                  placeholder={t("users.phone")}
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">{t("users.company")}</Label>
                <Input
                  id="company"
                  placeholder={t("users.company")}
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">{t("users.city")}</Label>
                <Input
                  id="city"
                  placeholder={t("users.city")}
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">{t("users.country")}</Label>
                <Input
                  id="country"
                  placeholder={t("users.country")}
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">{t("users.address")}</Label>
                <Input
                  id="address"
                  placeholder={t("users.address")}
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t("users.description")}</Label>
              <Textarea
                id="notes"
                placeholder={t("users.notesPlaceholder")}
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">{t("users.activestatus")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("users.toggletoactivate")}
                  </p>
                </div>
                <div dir={language === "ar" ? "ltr" : undefined}>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      handleChange("isActive", checked)
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletter">{t("users.newsletter")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Enable to send promotional emails to the customer.")}
                  </p>
                </div>
                <div dir={language === "ar" ? "ltr" : undefined}>
                  <Switch
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) =>
                      handleChange("newsletter", checked)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 text-right">
              <Button type="submit" className="w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />
                {t("users.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
