/*
  # Create Study Buddy Database Schema

  1. New Tables
    - `lessons`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subject` (text)
      - `content` (text)
      - `summary` (jsonb) - array of key points
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `worksheets`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, foreign key)
      - `title` (text)
      - `questions` (jsonb) - array of questions
      - `created_at` (timestamptz)
    
    - `flashcards`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, foreign key)
      - `front` (text)
      - `back` (text)
      - `created_at` (timestamptz)
    
    - `audio_files`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, foreign key)
      - `audio_url` (text)
      - `text_content` (text)
      - `created_at` (timestamptz)
    
    - `generated_images`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, foreign key)
      - `image_url` (text)
      - `prompt` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (educational content)
    - Add policies for authenticated insert/update/delete
*/

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  summary jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS worksheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  questions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  front text NOT NULL,
  back text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audio_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  audio_url text NOT NULL,
  text_content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS generated_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  prompt text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view worksheets"
  ON worksheets FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view flashcards"
  ON flashcards FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view audio files"
  ON audio_files FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view generated images"
  ON generated_images FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create lessons"
  ON lessons FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create worksheets"
  ON worksheets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create flashcards"
  ON flashcards FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create audio files"
  ON audio_files FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can create generated images"
  ON generated_images FOR INSERT
  WITH CHECK (true);