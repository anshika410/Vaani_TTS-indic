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
    
    if (!HUGGING_FACE_TOKEN) {
      throw new Error('HUGGING_FACE_ACCESS_TOKEN not configured');
    }

    // Map language codes to AI4Bharat language codes
    const languageMap: { [key: string]: string } = {
      'english': 'en',
      'hindi': 'hi',
      'tamil': 'ta',
      'telugu': 'te',
      'kannada': 'kn',
      'malayalam': 'ml',
      'bengali': 'bn',
      'gujarati': 'gu',
      'marathi': 'mr',
    };

    const langCode = languageMap[language] || 'en';
    
    // Construct prompt for Indic Parler TTS
    const genderPrefix = gender === 'male' ? 'A male voice' : 'A female voice';
    const prompt = `${genderPrefix} speaks in ${language} with an Indian accent`;

    console.log('Calling Hugging Face API with prompt:', prompt);

    // Call Hugging Face Inference API for ai4bharat/indic-parler-tts
    const response = await fetch(
      'https://api-inference.huggingface.co/models/ai4bharat/indic-parler-tts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            description: prompt,
            language: langCode,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', response.status, errorText);
      
      // If model is loading, return a helpful message
      if (response.status === 503) {
        return new Response(
          JSON.stringify({ 
            error: 'Model is loading. Please try again in a few moments.',
            loading: true 
          }),
          { 
            status: 503,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    // Get audio data
    const audioBuffer = await response.arrayBuffer();
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(audioBuffer))
    );

    console.log('TTS generation successful');

    return new Response(
      JSON.stringify({ 
        audio: `data:audio/wav;base64,${base64Audio}`,
        success: true 
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
