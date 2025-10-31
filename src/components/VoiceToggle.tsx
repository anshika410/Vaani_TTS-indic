import { Button } from "@/components/ui/button";
import { User, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceToggleProps {
  value: "male" | "female";
  onChange: (value: "male" | "female") => void;
}

export const VoiceToggle = ({ value, onChange }: VoiceToggleProps) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-card rounded-lg border-2 border-border shadow-sm">
      <Button
        variant={value === "male" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("male")}
        className={cn(
          "flex-1 transition-all",
          value === "male" && "shadow-md"
        )}
      >
        <User className="w-4 h-4 mr-2" />
        Male Voice
      </Button>
      <Button
        variant={value === "female" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("female")}
        className={cn(
          "flex-1 transition-all",
          value === "female" && "shadow-md"
        )}
      >
        <UserCircle className="w-4 h-4 mr-2" />
        Female Voice
      </Button>
    </div>
  );
};
