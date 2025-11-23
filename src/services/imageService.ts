import { supabase } from '../lib/supabase';
import { generateImage } from '../lib/google';
import { GeneratedImage } from '../types';

export const imageService = {
  async generateAndSaveImage(
    lessonId: string,
    prompt: string
  ): Promise<GeneratedImage> {
    try {
      const educationalPrompt = `Educational diagram illustrating: ${prompt}. Simple, clear, and colorful diagram suitable for students learning.`;
      const imageUrl = await generateImage(educationalPrompt);

      const { data, error } = await supabase
        .from('generated_images')
        .insert({
          lesson_id: lessonId,
          image_url: imageUrl,
          prompt: educationalPrompt,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Image generation and save error:', error);
      throw error;
    }
  },

  async getImage(id: string): Promise<GeneratedImage | null> {
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getImagesByLesson(lessonId: string): Promise<GeneratedImage[]> {
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async deleteImage(id: string): Promise<void> {
    const { error } = await supabase
      .from('generated_images')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
