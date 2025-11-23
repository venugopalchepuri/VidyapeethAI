import { supabase } from '../lib/supabase';
import { Lesson, LessonWithMaterials } from '../types';

export const lessonService = {
  async createLesson(data: {
    title: string;
    subject: string;
    content: string;
    summary: string[];
  }): Promise<Lesson> {
    const { data: lesson, error } = await supabase
      .from('lessons')
      .insert({
        title: data.title,
        subject: data.subject,
        content: data.content,
        summary: data.summary,
      })
      .select()
      .single();

    if (error) throw error;
    return lesson;
  },

  async getLesson(id: string): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAllLessons(): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getLessonWithMaterials(id: string): Promise<LessonWithMaterials | null> {
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (lessonError) throw lessonError;
    if (!lesson) return null;

    const [worksheets, flashcards, audioFiles, images] = await Promise.all([
      this.getLessonWorksheets(id),
      this.getLessonFlashcards(id),
      this.getLessonAudioFiles(id),
      this.getLessonImages(id),
    ]);

    return {
      ...lesson,
      worksheets: worksheets || [],
      flashcards: flashcards || [],
      audio_files: audioFiles || [],
      generated_images: images || [],
    };
  },

  async getLessonWorksheets(lessonId: string) {
    const { data, error } = await supabase
      .from('worksheets')
      .select('*')
      .eq('lesson_id', lessonId);

    if (error) throw error;
    return data;
  },

  async getLessonFlashcards(lessonId: string) {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('lesson_id', lessonId);

    if (error) throw error;
    return data;
  },

  async getLessonAudioFiles(lessonId: string) {
    const { data, error } = await supabase
      .from('audio_files')
      .select('*')
      .eq('lesson_id', lessonId);

    if (error) throw error;
    return data;
  },

  async getLessonImages(lessonId: string) {
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .eq('lesson_id', lessonId);

    if (error) throw error;
    return data;
  },

  async updateLesson(
    id: string,
    updates: Partial<Omit<Lesson, 'id' | 'created_at'>>
  ): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteLesson(id: string): Promise<void> {
    const { error } = await supabase.from('lessons').delete().eq('id', id);

    if (error) throw error;
  },
};
