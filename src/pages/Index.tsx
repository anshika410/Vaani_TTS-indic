import { useState, useEffect } from "react";
import { objects } from "@/data/objects";
import { ObjectCard } from "@/components/ObjectCard";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceToggle } from "@/components/VoiceToggle";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [selectedGender, setSelectedGender] = useState<"male" | "female">("female");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { toast } = useToast();

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        console.log('Available voices:', availableVoices);
      }
    };

    // Initial load
    loadVoices();

    // Some browsers load voices asynchronously
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const speakText = async (text: string) => {
    try {
      // Try to use browser TTS directly for better compatibility
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language based on selected language
        const languageMap: { [key: string]: string } = {
          'english': 'en-IN',
          'hindi': 'hi-IN',
          'tamil': 'ta-IN',
          'telugu': 'te-IN',
          'kannada': 'kn-IN',
          'malayalam': 'ml-IN',
          'bengali': 'bn-IN',
          'gujarati': 'gu-IN',
          'marathi': 'mr-IN',
        };

        const langCode = languageMap[selectedLanguage] || 'en-IN';
        utterance.lang = langCode;
        utterance.rate = 0.9; // Slightly slower for clarity

        // Log available voices for debugging
        console.log('Selected language:', selectedLanguage);
        console.log('Selected gender:', selectedGender);
        console.log('Target language code:', langCode);
        console.log('Available voices:', voices);

        // Filter voices by language
        const languageVoices = voices.filter(voice => 
          voice.lang === langCode || 
          voice.lang.startsWith(langCode.split('-')[0]) ||
          voice.lang.includes('IN')
        );
        
        console.log('Language voices:', languageVoices);

        // Try to find an appropriate voice based on language and gender
        let preferredVoice = null;
        
        // First, try to find a voice that matches both language and gender
        if (languageVoices.length > 0) {
          // Look for gender-specific voices
          if (selectedGender === "female") {
            preferredVoice = languageVoices.find(voice => 
              voice.name.toLowerCase().includes('female') || 
              (!voice.name.toLowerCase().includes('male') && voice.name.toLowerCase().includes('female'))
            );
          } else {
            preferredVoice = languageVoices.find(voice => 
              voice.name.toLowerCase().includes('male')
            );
          }
          
          // If no gender-specific voice found, use the first available language voice
          if (!preferredVoice) {
            preferredVoice = languageVoices[0];
          }
        }

        if (preferredVoice) {
          utterance.voice = preferredVoice;
          console.log('Selected voice:', preferredVoice.name);
        } else {
          console.log('No specific voice found, using default');
        }

        // Use type assertion to avoid TypeScript error
        (window as any).speechSynthesis.speak(utterance);
        console.log(`Speaking: ${text} in ${langCode} with ${selectedGender} voice`);
        return;
      }

      // Fallback to Supabase function if browser TTS is not available
      const { data, error } = await supabase.functions.invoke('indic-tts', {
        body: {
          text,
          language: selectedLanguage,
          gender: selectedGender,
        },
      });

      if (error) throw error;

      if (data?.loading) {
        toast({
          title: "Model Loading",
          description: "The AI model is warming up. Please try again in a moment.",
          variant: "default",
        });
        return;
      }

      // If using browser TTS from Supabase response
      if (data?.useBrowserTTS && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = data.langCode;
        utterance.rate = 0.9; // Slightly slower for clarity
        
        // Try to find an Indian voice with gender preference
        const languageVoices = voices.filter(voice => 
          voice.lang.startsWith(data.langCode) || 
          voice.lang.includes('IN')
        );
        
        let preferredVoice = null;
        
        if (languageVoices.length > 0) {
          if (selectedGender === "female") {
            preferredVoice = languageVoices.find(voice => 
              voice.name.toLowerCase().includes('female') || 
              (!voice.name.toLowerCase().includes('male') && voice.name.toLowerCase().includes('female'))
            );
          } else {
            preferredVoice = languageVoices.find(voice => 
              voice.name.toLowerCase().includes('male')
            );
          }
          
          if (!preferredVoice) {
            preferredVoice = languageVoices[0];
          }
        }
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        // Use type assertion to avoid TypeScript error
        (window as any).speechSynthesis.speak(utterance);
        return;
      }

      // If using server-generated audio
      if (data?.audio) {
        const audio = new Audio(data.audio);
        await audio.play();
      }
    } catch (error) {
      console.error('TTS Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate speech. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative py-16 px-4 mb-8"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Learn with{" "}
            <span className="text-primary">Indian Voices</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Click on any object to hear its name in authentic Indian languages
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
          <LanguageSelector 
            value={selectedLanguage} 
            onChange={setSelectedLanguage} 
          />
          <VoiceToggle 
            value={selectedGender} 
            onChange={setSelectedGender} 
          />
        </div>
      </div>

      {/* Objects Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {objects.map((obj) => (
            <ObjectCard
              key={obj.id}
              image={obj.image}
              label={obj.translations[selectedLanguage]}
              onSpeak={() => speakText(obj.translations[selectedLanguage])}
            />
          ))}
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-muted/50 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Powered by <span className="font-semibold text-primary">AI4Bharat Indic-TTS</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Supporting 13+ Indian languages with authentic accents
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;