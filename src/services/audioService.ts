import { supabase } from '../lib/supabase';
import { textToSpeech } from '../lib/elevenlabs';
import { AudioFile } from '../types';

export const audioService = {
  async generateAndSaveAudio(
    lessonId: string,
    text: string
  ): Promise<AudioFile | null> {
    try {
      console.log('Generating audio for lesson:', lessonId);
      console.log('Text length:', text.length);

      const audioUrl = await textToSpeech(text);

      console.log('Audio generated successfully, saving to database...');

      const { data, error } = await supabase
        .from('audio_files')
        .insert({
          lesson_id: lessonId,
          audio_url: audioUrl,
          text_content: text.substring(0, 1000),
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error('Database save error:', error);
        throw error;
      }

      console.log('Audio saved to database successfully');
      return data;
    } catch (error) {
      console.error('Audio generation and save error:', error);
      console.warn('Continuing without audio - audio will not be available for this lesson');
      return null;
    }
  },

  async getAudioFile(id: string): Promise<AudioFile | null> {
    const { data, error } = await supabase
      .from('audio_files')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAudioFilesByLesson(lessonId: string): Promise<AudioFile[]> {
    const { data, error } = await supabase
      .from('audio_files')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  playAudio(audioUrl: string): void {
    try {
      const audio = new Audio(audioUrl);
      audio.play().catch(err => {
        console.error('Audio playback error:', err);
      });
    } catch (error) {
      console.error('Audio playback initialization error:', error);
    }
  },

  async deleteAudioFile(id: string): Promise<void> {
    const { error } = await supabase.from('audio_files').delete().eq('id', id);
    if (error) throw error;
  },
};
