import { GenerateContentRequest, GenerateContentResponse, Question } from '../types';
import { lessonService } from './lessonService';
import { worksheetService } from './worksheetService';
import { flashcardService } from './flashcardService';
import * as gemini from '../lib/gemini';

export const aiService = {
  async generateLessonContent(
    request: GenerateContentRequest
  ): Promise<GenerateContentResponse> {
    const { question, language = 'English', subject = 'General' } = request;

    try {
      const lessonData = await gemini.generateLesson(question, language);
      const quizQuestions = await gemini.generateQuiz(question, 5);
      const flashcardData = await gemini.generateFlashcards(question, 8);

      const quiz: Question[] = quizQuestions.map((q, idx) => ({
        id: idx + 1,
        question: q.question,
        options: q.options,
        correct: q.correct,
        type: 'mcq',
      }));

      const lesson = await lessonService.createLesson({
        title: question,
        subject: subject,
        content: lessonData.explanation,
        summary: lessonData.summary || lessonData.keyPoints || [],
      });

      await worksheetService.createWorksheet({
        lesson_id: lesson.id,
        title: `${question} - Quiz`,
        questions: quiz,
      });

      await flashcardService.createMultipleFlashcards(lesson.id, flashcardData);

      return {
        lesson,
        explanation: lessonData.explanation,
        quiz,
        flashcards: flashcardData,
      };
    } catch (error) {
      console.error('Gemini API error, using fallback:', error);
      return this.generateFallbackContent(question, subject);
    }
  },

  async generateWorksheetContent(topic: string, subject: string): Promise<{
    title: string;
    questions: Question[];
  }> {
    try {
      const worksheetData = await gemini.generateWorksheetQuestions(topic);

      const questions: Question[] = [
        ...worksheetData.mcq.map((q, idx) => ({
          id: idx + 1,
          question: q.question,
          options: q.options,
          correct: q.answer,
          type: 'mcq' as const,
        })),
        ...worksheetData.short.map((q, idx) => ({
          id: idx + worksheetData.mcq.length + 1,
          question: q.question,
          answer: q.answer,
          type: 'short' as const,
          options: [],
        })),
      ];

      return {
        title: `${topic} - Practice Worksheet`,
        questions,
      };
    } catch (error) {
      console.error('Worksheet generation error:', error);
      throw error;
    }
  },

  async generateFlashcardsForTopic(topic: string): Promise<Array<{ front: string; back: string }>> {
    try {
      return await gemini.generateFlashcards(topic, 10);
    } catch (error) {
      console.error('Flashcard generation error:', error);
      throw error;
    }
  },

  async generateTeacherMaterials(fileName: string, fileContent?: string) {
    const lessonTitle = fileName.replace(/\.[^/.]+$/, '');
    const subject = 'Teacher Upload';

    try {
      const lessonData = await gemini.generateLesson(lessonTitle);

      const lesson = await lessonService.createLesson({
        title: lessonTitle,
        subject: subject,
        content: lessonData.explanation,
        summary: lessonData.summary || lessonData.keyPoints || [],
      });

      const quizQuestions = await gemini.generateQuiz(lessonTitle, 5);
      const questions: Question[] = quizQuestions.map((q, idx) => ({
        id: idx + 1,
        question: q.question,
        options: q.options,
        correct: q.correct,
        type: 'mcq',
      }));

      await worksheetService.createWorksheet({
        lesson_id: lesson.id,
        title: `${lessonTitle} - Assessment Quiz`,
        questions,
      });

      return lesson;
    } catch (error) {
      console.error('Teacher materials generation error:', error);
      throw error;
    }
  },

  async generateFallbackContent(
    question: string,
    subject: string
  ): Promise<GenerateContentResponse> {
    const explanation = `This is a comprehensive explanation about ${question}. The concept involves understanding the fundamental principles, key components, and practical applications.`;

    const summary = [
      `Overview of ${question} and its fundamental importance`,
      "Key concepts and definitions",
      "Main components and applications",
    ];

    const quiz: Question[] = [
      {
        id: 1,
        question: `What is the main concept of ${question}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: "Option B",
        type: 'mcq'
      }
    ];

    const flashcards = [
      {
        front: `What is ${question}?`,
        back: `A fundamental concept with important applications`
      }
    ];

    const lesson = await lessonService.createLesson({
      title: question,
      subject: subject,
      content: explanation,
      summary: summary,
    });

    await worksheetService.createWorksheet({
      lesson_id: lesson.id,
      title: `${question} - Quiz`,
      questions: quiz,
    });

    await flashcardService.createMultipleFlashcards(lesson.id, flashcards);

    return {
      lesson,
      explanation,
      quiz,
      flashcards,
    };
  },
};
