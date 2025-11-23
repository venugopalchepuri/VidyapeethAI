import * as gemini from './gemini';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function generateImage(prompt: string): Promise<string> {
  if (!GOOGLE_API_KEY) {
    console.warn('Missing Google API key, using placeholder');
    return createPlaceholderImage(prompt);
  }

  try {
    const enhancedPrompt = await gemini.generateImagePrompt(prompt);
    const placeholderUrl = createPlaceholderImage(prompt);
    return placeholderUrl;
  } catch (error) {
    console.error('Image generation error:', error);
    return createPlaceholderImage(prompt);
  }
}

function createPlaceholderImage(prompt: string): string {
  const shortPrompt = prompt.substring(0, 30).replace(/[^a-zA-Z0-9\s]/g, '');
  const encodedText = encodeURIComponent(`Educational Diagram: ${shortPrompt}`);
  return `https://placehold.co/800x600/4F46E5/FFFFFF?text=${encodedText}&font=raleway`;
}
