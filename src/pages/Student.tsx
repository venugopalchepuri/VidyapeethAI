import { useState } from 'react';
import { Mic, Volume2, Save, CheckCircle, Loader2, Sparkles, Play, Image as ImageIcon, Award, ArrowRight } from 'lucide-react';
import { aiService } from '../services/aiService';
import { audioService } from '../services/audioService';
import { imageService } from '../services/imageService';
import { Question } from '../types';

export default function Student() {
  const [language, setLanguage] = useState('english');
  const [question, setQuestion] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Question[]>([]);

  const sampleQuestions = [
    { text: "What is photosynthesis?", icon: "🌿" },
    { text: "Explain Newton's laws", icon: "⚛️" },
    { text: "How do fractions work?", icon: "🔢" },
    { text: "What causes rain?", icon: "🌧️" }
  ];

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setAudioUrl(null);
    setImageUrl(null);

    try {
      const response = await aiService.generateLessonContent({
        question,
        language,
        subject: 'General',
      });

      setExplanation(response.explanation);
      setQuiz(response.quiz);
      setLessonId(response.lesson.id);

      setIsLoading(false);
      setHasResult(true);
      setIsSaved(false);
      setShowResults(false);
      setSelectedAnswers({});

      generateAudio(response.explanation, response.lesson.id);
      generateDiagram(question, response.lesson.id);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setQuestion("What is the water cycle?");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const generateAudio = async (text: string, lessonIdParam: string) => {
    setIsGeneratingAudio(true);
    try {
      const audioFile = await audioService.generateAndSaveAudio(lessonIdParam, text);
      setAudioUrl(audioFile.audio_url);
    } catch (error) {
      console.error('Audio generation error:', error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const generateDiagram = async (prompt: string, lessonIdParam: string) => {
    setIsGeneratingImage(true);
    try {
      const image = await imageService.generateAndSaveImage(lessonIdParam, prompt);
      setImageUrl(image.image_url);
    } catch (error) {
      console.error('Image generation error:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      audioService.playAudio(audioUrl);
    }
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    if (!showResults) {
      setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    }
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 px-5 py-2.5 rounded-full text-sm font-semibold shadow-md">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI-Powered Learning Assistant</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 animate-fade-in-up">
            Ask Your Study Buddy
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in-up delay-200">
            Ask any question from your syllabus in your own language
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">

          {/* Left Column: Input Area */}
          <div className="space-y-6 animate-fade-in-left">

            {/* Language Selector */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">Select Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all text-lg font-medium"
              >
                <option value="english">English</option>
                <option value="hindi">हिंदी (Hindi)</option>
                <option value="telugu">తెలుగు (Telugu)</option>
                <option value="tamil">தமிழ் (Tamil)</option>
                <option value="kannada">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>

            {/* Question Input */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
              <label className="block text-sm font-bold text-gray-700 mb-3">Your Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here... or use voice"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all text-lg resize-none"
                rows={4}
              />
            </div>

            {/* Mic and Ask Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleMicClick}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-6 rounded-2xl font-bold text-lg shadow-xl transition-all relative overflow-hidden group ${
                  isListening
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white scale-105 animate-breathe'
                    : 'bg-white text-teal-700 border-2 border-teal-300 hover:border-teal-500 hover:shadow-2xl hover:-translate-y-1'
                }`}
              >
                {isListening && (
                  <>
                    <div className="absolute inset-0 animate-ripple bg-red-400 rounded-2xl opacity-30"></div>
                    <div className="absolute inset-0 animate-ripple bg-red-400 rounded-2xl opacity-30" style={{ animationDelay: '0.5s' }}></div>
                  </>
                )}
                <Mic className={`w-6 h-6 ${isListening ? 'animate-pulse' : ''}`} />
                <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
              </button>

              <button
                onClick={handleAsk}
                disabled={!question.trim() || isLoading}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <span>Ask AI</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Sample Questions */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
              <p className="text-sm font-bold text-gray-700 mb-4">Try These Sample Questions:</p>
              <div className="flex flex-wrap gap-3">
                {sampleQuestions.map((sq, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuestion(sq.text)}
                    className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 px-4 py-2 rounded-xl text-sm font-semibold text-teal-800 transition-all hover:scale-105 hover:shadow-md border border-teal-200"
                  >
                    <span className="text-lg">{sq.icon}</span>
                    <span>{sq.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Response Area */}
          <div className="space-y-6">
            {!hasResult ? (
              <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-blue-100 text-center h-full flex flex-col items-center justify-center animate-fade-in-right">
                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 w-24 h-24 rounded-3xl flex items-center justify-center mb-6">
                  <Sparkles className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Help!</h3>
                <p className="text-gray-600 text-lg">
                  Ask any question and get instant AI-powered explanations with diagrams and quizzes
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Explanation Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-teal-100 animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-teal-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Explanation</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{explanation}</p>
                </div>

                {/* Diagram Card */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl border-2 border-blue-200 animate-fade-in-up delay-200 hover-lift">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Visual Diagram</h3>
                  </div>
                  <div className="bg-white rounded-2xl p-8 text-center group cursor-pointer transition-transform hover:scale-105">
                    {isGeneratingImage ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                        <p className="text-gray-600 font-semibold">Generating visual diagram...</p>
                      </div>
                    ) : imageUrl ? (
                      <img src={imageUrl} alt="Generated diagram" className="w-full h-auto rounded-xl" />
                    ) : (
                      <>
                        <div className="text-8xl mb-4">🌊☁️🌧️💧</div>
                        <p className="text-gray-600 font-semibold">Visual Illustration</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Audio Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl border-2 border-green-200 animate-fade-in-up delay-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center">
                      <Volume2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Audio Explanation</h3>
                  </div>
                  <button
                    onClick={playAudio}
                    disabled={isGeneratingAudio || !audioUrl}
                    className="w-full bg-white rounded-2xl p-6 flex items-center justify-center gap-4 hover:shadow-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingAudio ? (
                      <>
                        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
                        <span className="text-lg font-bold text-gray-700">Generating audio...</span>
                      </>
                    ) : (
                      <>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                        <span className="text-lg font-bold text-gray-700">Play Audio Explanation</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quiz Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100 animate-fade-in-up delay-400">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Practice Quiz</h3>
                  </div>

                  <div className="space-y-6">
                    {quiz.map((q) => (
                      <div key={q.id} className="space-y-3">
                        <p className="font-bold text-gray-900 text-lg">{q.id}. {q.question}</p>
                        <div className="space-y-2">
                          {q.options.map((option) => {
                            const isSelected = selectedAnswers[q.id] === option;
                            const isCorrect = option === q.correct;
                            const showFeedback = showResults && isSelected;

                            return (
                              <button
                                key={option}
                                onClick={() => handleAnswerSelect(q.id, option)}
                                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                                  showFeedback && isCorrect
                                    ? 'bg-green-100 border-2 border-green-500 text-green-800 animate-success-pop'
                                    : showFeedback && !isCorrect
                                    ? 'bg-red-100 border-2 border-red-500 text-red-800 animate-shake'
                                    : isSelected
                                    ? 'bg-teal-100 border-2 border-teal-500 text-teal-800'
                                    : 'bg-gray-50 border-2 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                                }`}
                              >
                                {option}
                                {showFeedback && isCorrect && <CheckCircle className="inline-block ml-2 w-5 h-5" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!showResults && (
                    <button
                      onClick={handleCheckAnswers}
                      disabled={Object.keys(selectedAnswers).length !== quiz.length}
                      className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Check Answers
                    </button>
                  )}
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all ${
                    isSaved
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      <span>Lesson Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-6 h-6" />
                      <span>Save Lesson</span>
                    </>
                  )}
                </button>

                {isSaved && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 text-center animate-slide-in-toast">
                    <p className="text-green-800 font-semibold">
                      ✨ Saved! Check 'Saved Lessons' page.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
