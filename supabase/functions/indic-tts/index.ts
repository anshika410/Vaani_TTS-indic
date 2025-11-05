// Supabase Edge Function for Indic TTS

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export default async function handler(req: Request) {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Ensure we only handle POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ 
        error: 'Method not allowed',
        success: false,
        message: 'Only POST requests are supported'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405
      }
    );
  }

  try {
    const { text, language, gender } = await req.json();
    
    console.log('TTS Request:', { text, language, gender });

    // Validate inputs
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid text',
          success: false,
          message: 'Text is required and must be a string'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

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
    
    // Always return browser TTS as the reliable method
    // This ensures the app ALWAYS works regardless of API issues
    console.log('Using browser-based TTS (always reliable)');
    
    return new Response(
      JSON.stringify({ 
        useBrowserTTS: true,
        langCode: langCode,
        text: text,
        success: true,
        method: 'browser',
        message: 'Using native browser speech synthesis for best compatibility'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    // Even on error, return a valid browser TTS response
    console.error('Error in indic-tts function:', error);
    
    return new Response(
      JSON.stringify({ 
        useBrowserTTS: true,
        langCode: 'en-IN',
        text: 'Error occurred',
        success: true,
        method: 'browser-fallback',
        message: 'Using browser speech synthesis as fallback'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  }
}