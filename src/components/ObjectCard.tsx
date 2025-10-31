import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Volume2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ObjectCardProps {
  image: string;
  label: string;
  onSpeak: () => Promise<void>;
}

export const ObjectCard = ({ image, label, onSpeak }: ObjectCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = async () => {
    if (isLoading || isSpeaking) return;
    
    setIsLoading(true);
    try {
      await onSpeak();
      setIsSpeaking(true);
      // Reset speaking state after 2 seconds
      setTimeout(() => setIsSpeaking(false), 2000);
    } catch (error) {
      console.error("Error speaking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "relative cursor-pointer overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "bg-card border-2 border-border hover:border-primary",
        isSpeaking && "ring-4 ring-primary ring-opacity-50 scale-105",
        isLoading && "opacity-75"
      )}
      style={{
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="p-6">
        <div className="relative aspect-square mb-4 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={label}
            className="w-full h-full object-contain p-4"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          {isSpeaking && (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center animate-pulse">
              <Volume2 className="w-12 h-12 text-primary" />
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{label}</p>
        </div>
      </div>
    </Card>
  );
};
