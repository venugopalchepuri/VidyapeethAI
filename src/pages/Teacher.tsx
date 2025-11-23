import { useState } from 'react';
import { Upload, FileText, Download, Volume2, Loader2, CheckCircle, Sparkles, BookOpen, Brain, Mic, FileCheck, Play } from 'lucide-react';
import { aiService } from '../services/aiService';
import { audioService } from '../services/audioService';

export default function Teacher() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [lessonId, setLessonId] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setHasGenerated(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setHasGenerated(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setAudioUrl(null);

    try {
      const lessonTitle = selectedFile.name.replace(/\.[^/.]+$/, '');
      const lesson = await aiService.generateTeacherMaterials(lessonTitle);
      setLessonId(lesson.id);

      setIsProcessing(false);
      setHasGenerated(true);

      const audioScript = `Hello students, today we'll learn about ${lessonTitle}. This is a comprehensive lesson that covers all the key concepts and practical applications. Let's understand this step by step and explore how it applies to real-world situations.`;
      generateAudio(audioScript, lesson.id);
    } catch (error) {
      console.error('Error generating lesson:', error);
      setIsProcessing(false);
      setHasGenerated(true);
    }
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

  const playAudio = () => {
    if (audioUrl) {
      audioService.playAudio(audioUrl);
    }
  };

  const demoSummary = [
    "The water cycle is a continuous natural process of water circulation between Earth's surface and atmosphere",
    "Four main stages: Evaporation (liquid to vapor), Condensation (vapor to clouds), Precipitation (rain/snow), and Collection (water returns to bodies)",
    "Solar energy drives evaporation from oceans, rivers, and lakes",
    "Temperature decrease at higher altitudes causes water vapor to condense into clouds",
    "Precipitation returns water to Earth's surface in various forms",
    "The cycle is essential for distributing water resources globally"
  ];

  const demoMCQs = [
    {
      question: "What is the primary source of energy for the water cycle?",
      options: ["A) Wind", "B) The Sun", "C) Ocean currents", "D) Earth's core"],
      answer: "B"
    },
    {
      question: "During which process does water change from liquid to gas?",
      options: ["A) Condensation", "B) Precipitation", "C) Evaporation", "D) Collection"],
      answer: "C"
    },
    {
      question: "What happens during condensation?",
      options: ["A) Water falls as rain", "B) Water vapor forms clouds", "C) Water evaporates", "D) Water flows into rivers"],
      answer: "B"
    }
  ];

  const demoShortAnswers = [
    {
      question: "Explain the process of evaporation in the water cycle.",
      answer: "Evaporation is the process by which water changes from liquid to vapor state due to heat energy from the sun. This occurs primarily in water bodies like oceans, lakes, and rivers."
    },
    {
      question: "How do clouds form?",
      answer: "Clouds form through condensation when water vapor in the atmosphere cools and changes back into tiny liquid water droplets or ice crystals around dust particles."
    }
  ];

  const aiTools = [
    {
      icon: BookOpen,
      title: 'Lesson Summaries',
      desc: 'Get comprehensive chapter summaries in seconds',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Auto-Generated Quizzes',
      desc: 'MCQs and short questions aligned with NCERT',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Mic,
      title: 'One-Tap Audio Lessons',
      desc: 'Convert any chapter into audio for students',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-5 py-2.5 rounded-full text-sm font-semibold shadow-md">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Tools for Teachers</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 animate-fade-in-up">
            Teacher Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in-up delay-200">
            Upload any chapter and get instant summaries, quizzes, and audio lessons
          </p>
        </div>

        {/* Upload Section */}
        {!hasGenerated && (
          <div className="max-w-3xl mx-auto mb-12 animate-scale-in">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-white rounded-3xl p-12 shadow-2xl border-4 border-dashed transition-all duration-300 ${
                dragOver
                  ? 'border-teal-500 bg-teal-50 scale-105'
                  : selectedFile
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-teal-400 hover:bg-blue-50'
              }`}
            >
              <div className="text-center">
                <div className={`inline-block mb-6 transition-transform duration-300 ${dragOver ? 'scale-110 animate-bounce' : ''}`}>
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center">
                    {selectedFile ? (
                      <FileCheck className="w-10 h-10 text-white" />
                    ) : (
                      <Upload className="w-10 h-10 text-white" />
                    )}
                  </div>
                </div>

                {!selectedFile ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Upload Chapter PDF or Text
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Drag and drop your file here or click to browse
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">
                      ✓ File Selected
                    </h3>
                    <p className="text-gray-700 font-semibold mb-6">
                      {selectedFile.name}
                    </p>
                  </>
                )}

                <div className="flex gap-4 justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.txt,.doc,.docx"
                    />
                    <div className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl border-2 border-blue-300 hover:border-blue-500 transition-all hover:-translate-y-1">
                      Choose File
                    </div>
                  </label>

                  {selectedFile && (
                    <button
                      onClick={handleGenerate}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-3"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <span>Generate Lesson</span>
                          <Sparkles className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-500 mt-6">
                  Supported formats: PDF, TXT, DOC, DOCX
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Generated Content */}
        {hasGenerated && (
          <div className="space-y-8">
            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-3xl p-6 text-center shadow-xl animate-slide-in-toast mb-8">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <p className="text-2xl font-bold text-green-800">
                  ✨ Lesson Materials Generated Successfully!
                </p>
              </div>
            </div>

            {/* Three Panel Layout */}
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Summary Panel */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-blue-100 animate-slide-in-left">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Summary</h3>
                  </div>
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-all group">
                    <Download className="w-5 h-5 text-blue-600 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>

                <div className="space-y-3">
                  {demoSummary.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* MCQs Panel */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-100 animate-scale-in delay-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">MCQs</h3>
                  </div>
                  <button className="p-2 hover:bg-purple-50 rounded-lg transition-all group">
                    <Download className="w-5 h-5 text-purple-600 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>

                <div className="space-y-6">
                  {demoMCQs.map((mcq, idx) => (
                    <div key={idx} className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                      <p className="font-bold text-gray-900 mb-3 text-sm">Q{idx + 1}. {mcq.question}</p>
                      <div className="space-y-2">
                        {mcq.options.map((opt) => (
                          <div key={opt} className="text-sm text-gray-700 flex items-center gap-2">
                            <span className={opt.startsWith(mcq.answer) ? 'font-bold text-green-700' : ''}>
                              {opt}
                            </span>
                            {opt.startsWith(mcq.answer) && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Short Answers Panel */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-green-100 animate-slide-in-right">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Short Q&A</h3>
                  </div>
                  <button className="p-2 hover:bg-green-50 rounded-lg transition-all group">
                    <Download className="w-5 h-5 text-green-600 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>

                <div className="space-y-6">
                  {demoShortAnswers.map((qa, idx) => (
                    <div key={idx} className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                      <p className="font-bold text-gray-900 mb-2 text-sm">Q{idx + 1}. {qa.question}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{qa.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Script Panel */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 shadow-2xl border-2 border-orange-200 animate-fade-in-up delay-400">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 w-14 h-14 rounded-xl flex items-center justify-center">
                    <Volume2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Audio Lesson Script</h3>
                    <p className="text-sm text-gray-600">Ready for text-to-speech conversion</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-orange-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-2 border-orange-300">
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  "Hello students, today we'll learn about the water cycle. The water cycle is a fascinating natural process that shows how water moves continuously through our environment. Let's understand this step by step..."
                </p>
                <button
                  onClick={playAudio}
                  disabled={isGeneratingAudio || !audioUrl}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingAudio ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating Audio...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Play Audio Lesson</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generate Another Button */}
            <div className="text-center animate-fade-in-up delay-600">
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setHasGenerated(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Generate Another Lesson
              </button>
            </div>
          </div>
        )}

        {/* AI Tools Section */}
        {!hasGenerated && (
          <div className="mt-20 animate-fade-in-up delay-400">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-4">AI Tools for Teachers</h2>
              <p className="text-xl text-gray-600">Powerful features to save time and enhance learning</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {aiTools.map((tool, idx) => {
                const Icon = tool.icon;
                return (
                  <div key={idx} className={`bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all hover-lift animate-zoom-in delay-${(idx + 1) * 100}`}>
                    <div className={`bg-gradient-to-br ${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tool.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
