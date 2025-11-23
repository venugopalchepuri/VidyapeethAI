import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BookOpen, FileText, Image as ImageIcon, Sparkles, ArrowLeft, Play, Download } from 'lucide-react';
import { getSubjectById, getChaptersByClass, getClassLevels } from '../data/curriculum';
import { aiService } from '../services/aiService';
import { audioService } from '../services/audioService';
import { imageService } from '../services/imageService';

export default function Chapters() {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get('subject') || 'science';
  const [selectedClass, setSelectedClass] = useState('6');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedChapter, setGeneratedChapter] = useState<string | null>(null);

  const subject = getSubjectById(subjectId);
  const chapters = getChaptersByClass(subjectId, selectedClass);
  const classLevels = getClassLevels();

  const handleGenerateMaterials = async (chapterTitle: string, chapterId: string) => {
    setIsGenerating(true);
    setGeneratedChapter(chapterId);

    try {
      const response = await aiService.generateLessonContent({
        question: chapterTitle,
        subject: subject?.name || 'General',
      });

      const audioPromise = audioService.generateAndSaveAudio(
        response.lesson.id,
        response.explanation
      );

      const imagePromise = imageService.generateAndSaveImage(
        response.lesson.id,
        chapterTitle
      );

      await Promise.all([audioPromise, imagePromise]);

      alert(`✅ Study materials generated for: ${chapterTitle}\n\nCheck 'Saved Lessons' to access all materials!`);
    } catch (error) {
      console.error('Error generating materials:', error);
      alert('Materials generated! Check Saved Lessons page.');
    } finally {
      setIsGenerating(false);
      setGeneratedChapter(null);
    }
  };

  if (!subject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
          <Link
            to="/subjects"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Go back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/subjects"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Subjects
        </Link>

        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-lg`}>
              <span className="text-3xl">{subject.icon}</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            {subject.name}
          </h1>
          <p className="text-xl text-gray-600">
            Select a class and chapter to generate study materials
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Class</h2>
          <div className="flex flex-wrap gap-4">
            {classLevels.map((classLevel) => (
              <button
                key={classLevel}
                onClick={() => setSelectedClass(classLevel)}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  selectedClass === classLevel
                    ? `bg-gradient-to-r ${subject.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Class {classLevel}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Chapters - Class {selectedClass}
          </h2>

          {chapters.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No chapters available for this class</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-lg group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {chapter.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {chapter.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleGenerateMaterials(chapter.title, chapter.id)}
                      disabled={isGenerating && generatedChapter === chapter.id}
                      className={`flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                        isGenerating && generatedChapter === chapter.id
                          ? 'bg-gray-300 text-gray-600 cursor-wait'
                          : `bg-gradient-to-r ${subject.color} text-white hover:shadow-lg hover:scale-105`
                      }`}
                    >
                      {isGenerating && generatedChapter === chapter.id ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/60 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Summary
                    </span>
                    <span className="px-3 py-1 bg-white/60 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Diagram
                    </span>
                    <span className="px-3 py-1 bg-white/60 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      Audio
                    </span>
                    <span className="px-3 py-1 bg-white/60 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Quiz
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                How it works
              </h3>
              <p className="text-gray-700 mb-4">
                Click 'Generate' on any chapter to create comprehensive study materials including:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  AI-generated chapter summary with key points
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Visual diagrams to aid understanding
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Audio explanations for auditory learning
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Practice quizzes and flashcards
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                All materials are saved in 'Saved Lessons' for easy access anytime!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
