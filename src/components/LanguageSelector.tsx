import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "@/data/objects";
import { Languages } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-lg border-2 border-border shadow-sm">
      <Languages className="w-5 h-5 text-primary" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[240px] border-2">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{lang.name}</span>
                <span className="text-muted-foreground text-sm">({lang.nativeName})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
