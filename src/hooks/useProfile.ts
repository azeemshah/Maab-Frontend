import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/services/axiosService";
import { useLanguage } from "@/contexts/LanguageContext";
import { set } from "date-fns";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string | null;
  avatar_url?: string;
  avatarFile?: File | null;
}

export function useProfile() {
  const { user, setUser } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState<UserProfile>({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    contact_number: user.contact_number ?? null,
    avatar_url: user.avatar_url,
    avatarFile: null,
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    const userFormData = new FormData();
    userFormData.append("first_name", formData.first_name);
    userFormData.append("last_name", formData.last_name);
    userFormData.append("email", formData.email);
    userFormData.append("contact_number", formData.contact_number);

    if (avatarFile) {
      userFormData.append("avatar", avatarFile);
    }

    try {
      setErrors({});
      setSuccessMessage(null);
      setErrorMessage(null);

      const result = await axiosInstance.patch("/users/me", userFormData, {
        headers: {
          "Content-Type": undefined,
        },
      });

      console.log(result);

      if (result.status === 200) {
        setSuccessMessage(t("users.profileUpdated"));
        localStorage.setItem("user", JSON.stringify(result.data.user));
        localStorage.setItem("token", result.data.access_token);
        setUser(result.data.user);
      } else if (result.status === 400) {
        setErrors((result as any).response.data.errors);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(t("users.profileUpdateError"));
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    avatarFile,
    setAvatarFile,
    update,
    errors,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
  };
}
