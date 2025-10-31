import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, language, gender } = await req.json();
    
    console.log('TTS Request:', { text, language, gender });

    const HUGGING_FACE_TOKEN = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    
    // Map language codes to voice settings
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

    const langCode = languageMap[language] || 'en-IN';
    
    // Try using a simpler, more accessible TTS model
    if (HUGGING_FACE_TOKEN) {
      console.log('Attempting TTS with Hugging Face');
      
      try {
        // Use facebook/mms-tts which is more accessible and supports Indian languages
        const modelId = `facebook/mms-tts-${language === 'english' ? 'eng' : langCode.split('-')[0]}`;
        
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${modelId}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUGGING_FACE_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: text,
            }),
          }
        );

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          const base64Audio = btoa(
            String.fromCharCode(...new Uint8Array(audioBuffer))
          );

          console.log('TTS generation successful with Hugging Face');

          return new Response(
            JSON.stringify({ 
              audio: `data:audio/flac;base64,${base64Audio}`,
              success: true,
              method: 'huggingface'
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        } else {
          console.log('Hugging Face TTS failed, falling back to browser TTS');
        }
      } catch (hfError) {
        console.log('Hugging Face error, using fallback:', hfError);
      }
    }
    
    // Fallback: Return language code for browser-based TTS
    console.log('Using browser-based TTS fallback');
    return new Response(
      JSON.stringify({ 
        useBrowserTTS: true,
        langCode: langCode,
        text: text,
        success: true,
        method: 'browser'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in indic-tts function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
