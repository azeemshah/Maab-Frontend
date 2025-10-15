import { Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{language}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "bg-muted" : ""}
                >
                English
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={() => setLanguage("ar")}
                className={language === "ar" ? "bg-muted" : ""}
                >
                العربية
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>);
}
