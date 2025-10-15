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
interface CreateSupplierProps {
  onBack: () => void;
}
export const CreateSupplier: React.FC<CreateSupplierProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    taxId: "",
    notes: "",
    isActive: true,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting supplier:", formData);
    // TODO: Send to backend
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between align-top">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("users.createSupplier")}
          </h2>
          <p className="text-muted-foreground">{t("users.addSupplier")}</p>
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
          <CardTitle>{t("users.supplierinformation")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">{t("users.company")}</Label>
                <Input
                  id="companyName"
                  placeholder={t("users.company")}
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson">
                  {t("users.contactPerson")}
                </Label>
                <Input
                  id="contactPerson"
                  placeholder={t("users.contactPerson")}
                  value={formData.contactPerson}
                  onChange={(e) =>
                    handleChange("contactPerson", e.target.value)
                  }
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

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">{t("users.address")}</Label>
                <Input
                  id="address"
                  placeholder={t("users.address")}
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
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

              {/* <div className="space-y-2">
                <Label htmlFor="taxId">{t("Tax ID / Registration No.")}</Label>
                <Input
                  id="taxId"
                  placeholder={t("Tax ID / Registration No.")}
                  value={formData.taxId}
                  onChange={(e) => handleChange("taxId", e.target.value)}
                />
              </div> */}

              <div className="space-y-2">
                <Label>{t("users.activestatus")}</Label>
                <div className="flex items-center space-x-2">
                  <div dir={language === "ar" ? "ltr" : undefined}>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        handleChange("isActive", checked)
                      }
                    />
                  </div>
                  <span className="px-2">
                    {formData.isActive
                      ? t("users.active")
                      : t("users.inactive")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t("users.notes")}</Label>
              <Textarea
                id="notes"
                placeholder={t("users.notesPlaceholder")}
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
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
