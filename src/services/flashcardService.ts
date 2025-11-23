import { supabase } from '../lib/supabase';
import { Flashcard } from '../types';

export const flashcardService = {
  async createFlashcard(data: {
    lesson_id: string;
    front: string;
    back: string;
  }): Promise<Flashcard> {
    const { data: flashcard, error } = await supabase
      .from('flashcards')
      .insert({
        lesson_id: data.lesson_id,
        front: data.front,
        back: data.back,
      })
      .select()
      .single();

    if (error) throw error;
    return flashcard;
  },

  async createMultipleFlashcards(
    lessonId: string,
    cards: Array<{ front: string; back: string }>
  ): Promise<Flashcard[]> {
    const flashcardsToInsert = cards.map((card) => ({
      lesson_id: lessonId,
      front: card.front,
      back: card.back,
    }));

    const { data, error } = await supabase
      .from('flashcards')
      .insert(flashcardsToInsert)
      .select();

    if (error) throw error;
    return data || [];
  },

  async getFlashcard(id: string): Promise<Flashcard | null> {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAllFlashcards(): Promise<Flashcard[]> {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getFlashcardsByLesson(lessonId: string): Promise<Flashcard[]> {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateFlashcard(
    id: string,
    updates: Partial<Omit<Flashcard, 'id' | 'created_at' | 'lesson_id'>>
  ): Promise<Flashcard> {
    const { data, error } = await supabase
      .from('flashcards')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteFlashcard(id: string): Promise<void> {
    const { error } = await supabase.from('flashcards').delete().eq('id', id);

    if (error) throw error;
  },
};
