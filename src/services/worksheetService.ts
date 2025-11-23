import { supabase } from '../lib/supabase';
import { Worksheet, Question } from '../types';

export const worksheetService = {
  async createWorksheet(data: {
    lesson_id: string;
    title: string;
    questions: Question[];
  }): Promise<Worksheet> {
    const { data: worksheet, error } = await supabase
      .from('worksheets')
      .insert({
        lesson_id: data.lesson_id,
        title: data.title,
        questions: data.questions,
      })
      .select()
      .single();

    if (error) throw error;
    return worksheet;
  },

  async getWorksheet(id: string): Promise<Worksheet | null> {
    const { data, error } = await supabase
      .from('worksheets')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAllWorksheets(): Promise<Worksheet[]> {
    const { data, error } = await supabase
      .from('worksheets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getWorksheetsByLesson(lessonId: string): Promise<Worksheet[]> {
    const { data, error } = await supabase
      .from('worksheets')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateWorksheet(
    id: string,
    updates: Partial<Omit<Worksheet, 'id' | 'created_at'>>
  ): Promise<Worksheet> {
    const { data, error } = await supabase
      .from('worksheets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteWorksheet(id: string): Promise<void> {
    const { error } = await supabase.from('worksheets').delete().eq('id', id);

    if (error) throw error;
  },
};
