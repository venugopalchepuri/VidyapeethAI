export function validateElevenLabsConfig(apiKey: string, voiceId: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!apiKey) {
    errors.push('ElevenLabs API key is missing');
  } else if (!apiKey.startsWith('sk_')) {
    errors.push('ElevenLabs API key should start with "sk_"');
  } else if (apiKey.length < 40) {
    errors.push('ElevenLabs API key appears to be too short');
  }

  if (!voiceId) {
    errors.push('ElevenLabs Voice ID is missing');
  } else if (voiceId.length < 10) {
    errors.push('Voice ID appears to be too short');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateGoogleApiKey(apiKey: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!apiKey) {
    errors.push('Google API key is missing');
  } else if (!apiKey.startsWith('AIza')) {
    errors.push('Google API key should start with "AIza"');
  } else if (apiKey.length < 30) {
    errors.push('Google API key appears to be too short');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateSupabaseConfig(url: string, anonKey: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!url) {
    errors.push('Supabase URL is missing');
  } else if (!url.startsWith('https://')) {
    errors.push('Supabase URL should start with "https://"');
  } else if (!url.includes('.supabase.co')) {
    errors.push('Supabase URL should contain ".supabase.co"');
  }

  if (!anonKey) {
    errors.push('Supabase Anon Key is missing');
  } else if (!anonKey.startsWith('eyJ')) {
    errors.push('Supabase Anon Key should be a JWT token starting with "eyJ"');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateAllAPIs(): {
  elevenlabs: ReturnType<typeof validateElevenLabsConfig>;
  google: ReturnType<typeof validateGoogleApiKey>;
  supabase: ReturnType<typeof validateSupabaseConfig>;
} {
  return {
    elevenlabs: validateElevenLabsConfig(
      import.meta.env.VITE_ELEVENLABS_API_KEY || '',
      import.meta.env.VITE_ELEVENLABS_VOICE_ID || ''
    ),
    google: validateGoogleApiKey(import.meta.env.VITE_GOOGLE_API_KEY || ''),
    supabase: validateSupabaseConfig(
      import.meta.env.VITE_SUPABASE_URL || '',
      import.meta.env.VITE_SUPABASE_ANON_KEY || ''
    ),
  };
}
