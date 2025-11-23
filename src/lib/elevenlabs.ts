const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

export async function textToSpeech(text: string): Promise<string> {
  if (!ELEVENLABS_API_KEY) {
    console.error('ElevenLabs API key is missing');
    throw new Error('ElevenLabs API key is not configured');
  }

  if (!VOICE_ID) {
    console.error('ElevenLabs Voice ID is missing');
    throw new Error('ElevenLabs Voice ID is not configured');
  }

  if (!text || text.trim().length === 0) {
    throw new Error('Text content is required for speech generation');
  }

  const textToSpeak = text.substring(0, 5000).trim();

  console.log('ElevenLabs TTS Request:', {
    apiKeyLength: ELEVENLABS_API_KEY.length,
    voiceIdLength: VOICE_ID.length,
    textLength: textToSpeak.length,
    textPreview: textToSpeak.substring(0, 50) + '...'
  });

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: textToSpeak,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      }
    );

    console.log('ElevenLabs API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });

      if (response.status === 401) {
        throw new Error('Invalid ElevenLabs API key - please check your configuration');
      } else if (response.status === 404) {
        throw new Error('Invalid Voice ID - please check your ElevenLabs voice configuration');
      } else if (response.status === 400) {
        throw new Error('Bad request to ElevenLabs API - check text content');
      } else if (response.status === 429) {
        throw new Error('ElevenLabs API rate limit exceeded - please try again later');
      }

      throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
    }

    const audioBlob = await response.blob();

    if (audioBlob.size === 0) {
      console.error('Received empty audio blob from ElevenLabs');
      throw new Error('Received empty audio response from ElevenLabs');
    }

    console.log('ElevenLabs Audio Generated:', {
      size: audioBlob.size,
      type: audioBlob.type
    });

    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;
  } catch (error) {
    console.error('Text-to-speech error:', error);
    throw error;
  }
}
