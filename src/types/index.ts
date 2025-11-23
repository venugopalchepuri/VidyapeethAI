export interface Lesson {
  id: string;
  title: string;
  subject: string;
  content: string;
  summary: string[];
  created_at: string;
  updated_at: string;
}

export interface Worksheet {
  id: string;
  lesson_id: string;
  title: string;
  questions: Question[];
  created_at: string;
}

export interface Question {
  id?: number;
  question: string;
  options: string[];
  correct?: string;
  answer?: string;
  type?: 'mcq' | 'short';
}

export interface Flashcard {
  id: string;
  lesson_id: string;
  front: string;
  back: string;
  created_at: string;
}

export interface AudioFile {
  id: string;
  lesson_id: string;
  audio_url: string;
  text_content: string;
  created_at: string;
}

export interface GeneratedImage {
  id: string;
  lesson_id: string;
  image_url: string;
  prompt: string;
  created_at: string;
}

export interface LessonWithMaterials extends Lesson {
  worksheets?: Worksheet[];
  flashcards?: Flashcard[];
  audio_files?: AudioFile[];
  generated_images?: GeneratedImage[];
}

export interface GenerateContentRequest {
  question: string;
  language?: string;
  subject?: string;
}

export interface GenerateContentResponse {
  lesson: Lesson;
  explanation: string;
  quiz: Question[];
  flashcards: Array<{ front: string; back: string }>;
}
