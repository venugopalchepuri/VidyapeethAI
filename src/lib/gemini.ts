const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export interface GeminiGenerateContentParams {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GeminiResponse {
  text: string;
  raw?: any;
}

export async function generateContent(params: GeminiGenerateContentParams): Promise<GeminiResponse> {
  if (!GOOGLE_API_KEY) {
    throw new Error('Missing Google API key');
  }

  const {
    prompt,
    systemInstruction = 'You are an expert educational AI assistant helping students learn.',
    temperature = 0.7,
    maxTokens = 4096,
  } = params;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemInstruction + '\n\n' + prompt
            }]
          }],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
            topP: 0.95,
            topK: 40,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error response:', errorData);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return {
        text: data.candidates[0].content.parts[0].text,
        raw: data,
      };
    }

    throw new Error('No valid response from Gemini API');
  } catch (error) {
    console.error('Gemini content generation error:', error);
    throw error;
  }
}

export async function generateStructuredContent<T = any>(params: GeminiGenerateContentParams & { jsonSchema?: string }): Promise<T> {
  const response = await generateContent({
    ...params,
    prompt: params.prompt + '\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanations, just pure JSON.',
  });

  try {
    const jsonMatch = response.text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Failed to parse JSON response:', response.text);
    throw new Error('Failed to parse structured response from Gemini');
  }
}

export async function generateLesson(topic: string, language: string = 'English'): Promise<{
  title: string;
  explanation: string;
  summary: string[];
  keyPoints: string[];
}> {
  const prompt = `Create a comprehensive lesson on: "${topic}"

Language: ${language}

Provide:
1. A clear title for the lesson
2. A detailed explanation (200-300 words)
3. 5-6 key summary points
4. 4-5 important key points to remember

Format as JSON:
{
  "title": "...",
  "explanation": "...",
  "summary": ["...", "..."],
  "keyPoints": ["...", "..."]
}`;

  return generateStructuredContent({
    prompt,
    systemInstruction: 'You are an expert teacher creating educational content for students in grades 6-10. Make content clear, accurate, and engaging.',
    temperature: 0.7,
  });
}

export async function generateQuiz(topic: string, numQuestions: number = 5): Promise<Array<{
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}>> {
  const prompt = `Create ${numQuestions} multiple choice questions about: "${topic}"

Each question should:
- Test understanding of key concepts
- Have 4 options (A, B, C, D)
- Include the correct answer
- Include a brief explanation

Format as JSON array:
[
  {
    "question": "...",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correct": "A) ...",
    "explanation": "..."
  }
]`;

  const result = await generateStructuredContent<{ questions?: any[] } | any[]>({
    prompt,
    systemInstruction: 'You are an expert educator creating assessment questions.',
    temperature: 0.8,
  });

  if (Array.isArray(result)) {
    return result;
  }
  return result.questions || [];
}

export async function generateFlashcards(topic: string, numCards: number = 8): Promise<Array<{
  front: string;
  back: string;
}>> {
  const prompt = `Create ${numCards} flashcards for studying: "${topic}"

Each flashcard should:
- Have a clear question or term on the front
- Have a concise answer or definition on the back
- Cover important concepts

Format as JSON array:
[
  {
    "front": "What is...",
    "back": "..."
  }
]`;

  const result = await generateStructuredContent<{ flashcards?: any[] } | any[]>({
    prompt,
    systemInstruction: 'You are an expert educator creating study materials.',
    temperature: 0.7,
  });

  if (Array.isArray(result)) {
    return result;
  }
  return result.flashcards || [];
}

export async function generateWorksheetQuestions(topic: string, questionTypes: string[] = ['mcq', 'short']): Promise<{
  mcq: Array<{ question: string; options: string[]; answer: string }>;
  short: Array<{ question: string; answer: string }>;
  fillInBlank: Array<{ question: string; answer: string }>;
}> {
  const prompt = `Create worksheet questions for: "${topic}"

Include:
- 5 multiple choice questions
- 5 short answer questions
- 5 fill in the blank questions

Format as JSON:
{
  "mcq": [{"question": "...", "options": ["...", "..."], "answer": "..."}],
  "short": [{"question": "...", "answer": "..."}],
  "fillInBlank": [{"question": "_____ is...", "answer": "..."}]
}`;

  return generateStructuredContent({
    prompt,
    systemInstruction: 'You are an expert educator creating practice worksheets.',
    temperature: 0.8,
  });
}

export async function analyzeText(text: string, instruction: string): Promise<string> {
  const response = await generateContent({
    prompt: `${instruction}\n\nText to analyze:\n${text}`,
    systemInstruction: 'You are an expert educational content analyzer.',
    temperature: 0.5,
  });

  return response.text;
}

export async function generateImagePrompt(topic: string): Promise<string> {
  const response = await generateContent({
    prompt: `Create a detailed image prompt for an educational diagram about: "${topic}"

The prompt should describe a clear, simple, colorful diagram suitable for students learning this topic. Focus on visual clarity and educational value.

Respond with just the image prompt, no extra text.`,
    systemInstruction: 'You are an expert at creating educational visual content descriptions.',
    temperature: 0.7,
  });

  return response.text.trim();
}
