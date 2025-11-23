import { useState, useEffect } from 'react';
import { BookOpen, Image, Volume2, FileText, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { lessonService } from '../services/lessonService';
import { audioService } from '../services/audioService';
import { LessonWithMaterials } from '../types';

export default function SavedLessons() {
  const [lessons, setLessons] = useState<LessonWithMaterials[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<LessonWithMaterials | null>(null);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    setIsLoading(true);
    try {
      const allLessons = await lessonService.getAllLessons();
      const lessonsWithMaterials = await Promise.all(
        allLessons.map(lesson => lessonService.getLessonWithMaterials(lesson.id))
      );
      setLessons(lessonsWithMaterials.filter((l): l is LessonWithMaterials => l !== null));
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await lessonService.deleteLesson(id);
      setLessons(lessons.filter(lesson => lesson.id !== id));
      if (selectedLesson?.id === id) {
        setSelectedLesson(null);
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const playLessonAudio = (audioUrl: string) => {
    audioService.playAudio(audioUrl);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Saved Lessons
          </h1>
          <p className="text-xl text-gray-600">
            All your lessons with diagrams, audio, and quizzes
          </p>
        </div>

        {lessons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{lesson.title}</h3>
                    <p className="text-sm text-gray-500">Subject: {lesson.subject}</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    Saved
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {lesson.content.substring(0, 150)}...
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.generated_images && lesson.generated_images.length > 0 && (
                    <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      <Image className="w-3 h-3" />
                      Diagram
                    </div>
                  )}
                  {lesson.audio_files && lesson.audio_files.length > 0 && (
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      <Volume2 className="w-3 h-3" />
                      Audio
                    </div>
                  )}
                  {lesson.worksheets && lesson.worksheets.length > 0 && (
                    <div className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                      <FileText className="w-3 h-3" />
                      Quiz
                    </div>
                  )}
                </div>

                <div className="text-xs text-gray-400 mb-4">
                  Saved on {new Date(lesson.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedLesson(lesson)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open
                  </button>
                  <button
                    onClick={() => handleDelete(lesson.id)}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <BookOpen className="w-20 h-20 mx-auto text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No lessons saved yet</h2>
            <p className="text-gray-600 text-lg mb-6">
              Go to the Student page, ask a question, and tap "Save lesson" to access content.
            </p>
            <a
              href="/student"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold"
            >
              Go to Student Page
            </a>
          </div>
        )}

        {selectedLesson && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedLesson.title}</h2>
                  <p className="text-gray-500">Subject: {selectedLesson.subject}</p>
                </div>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Full Explanation</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedLesson.content}</p>
                </div>

                {selectedLesson.summary && selectedLesson.summary.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Key Points</h3>
                    <div className="space-y-2">
                      {selectedLesson.summary.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                          <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                            {idx + 1}
                          </div>
                          <p className="text-gray-700 text-sm">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLesson.generated_images && selectedLesson.generated_images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Diagram</h3>
                    <div className="space-y-3">
                      {selectedLesson.generated_images.map((image) => (
                        <img
                          key={image.id}
                          src={image.image_url}
                          alt="Lesson diagram"
                          className="w-full rounded-xl border-2 border-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedLesson.audio_files && selectedLesson.audio_files.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Audio Explanation</h3>
                    <div className="space-y-3">
                      {selectedLesson.audio_files.map((audio) => (
                        <div key={audio.id} className="bg-gray-50 rounded-xl p-6">
                          <button
                            onClick={() => playLessonAudio(audio.audio_url)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-3 transition-all font-medium"
                          >
                            <Volume2 className="w-5 h-5" />
                            Play Audio
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLesson.worksheets && selectedLesson.worksheets.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Quiz</h3>
                    <div className="space-y-4">
                      {selectedLesson.worksheets.map((worksheet) => (
                        <div key={worksheet.id} className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                          <h4 className="font-bold text-orange-900 mb-4">{worksheet.title}</h4>
                          <div className="space-y-4">
                            {worksheet.questions.map((q, idx) => (
                              <div key={idx} className="bg-white rounded-lg p-4">
                                <p className="font-medium text-gray-900 mb-2">
                                  {idx + 1}. {q.question}
                                </p>
                                {q.options && (
                                  <div className="space-y-2 ml-4">
                                    {q.options.map((opt, optIdx) => (
                                      <p key={optIdx} className="text-gray-700 text-sm">
                                        {opt}
                                      </p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLesson.flashcards && selectedLesson.flashcards.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Flashcards</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedLesson.flashcards.map((card) => (
                        <div key={card.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                          <p className="font-bold text-purple-900 mb-2">{card.front}</p>
                          <p className="text-gray-700 text-sm">{card.back}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
