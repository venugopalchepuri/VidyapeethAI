import { useState, useEffect } from 'react';
import { FileText, Download, Printer, FileDown, Sparkles, BookOpen, GraduationCap, Loader2 } from 'lucide-react';
import { worksheetService } from '../services/worksheetService';
import { aiService } from '../services/aiService';
import { lessonService } from '../services/lessonService';
import { Worksheet } from '../types';

export default function Worksheets() {
  const [subject, setSubject] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [chapter, setChapter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasWorksheet, setHasWorksheet] = useState(false);
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const subjects = ['Science', 'Mathematics', 'Social Science', 'English'];
  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const chapters = [
    'Chapter 1: Introduction',
    'Chapter 2: Basic Concepts',
    'Chapter 3: Advanced Topics',
    'Chapter 4: Practical Applications'
  ];

  useEffect(() => {
    loadWorksheets();
  }, []);

  const loadWorksheets = async () => {
    setIsLoading(true);
    try {
      const allWorksheets = await worksheetService.getAllWorksheets();
      setWorksheets(allWorksheets);
      if (allWorksheets.length > 0) {
        setHasWorksheet(true);
      }
    } catch (error) {
      console.error('Error loading worksheets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!subject || !classLevel || !chapter) {
      alert('Please select subject, class, and chapter');
      return;
    }

    setIsGenerating(true);
    try {
      const topic = `${subject} ${classLevel} ${chapter}`;

      const worksheetData = await aiService.generateWorksheetContent(topic, subject);

      const lesson = await lessonService.createLesson({
        title: topic,
        subject: subject,
        content: `Worksheet for ${topic}`,
        summary: [`Practice questions for ${chapter}`],
      });

      await worksheetService.createWorksheet({
        lesson_id: lesson.id,
        title: worksheetData.title,
        questions: worksheetData.questions,
      });

      await loadWorksheets();
      setHasWorksheet(true);
      alert(`✅ Worksheet generated successfully for ${topic}!`);
    } catch (error) {
      console.error('Worksheet generation error:', error);
      alert('⚠️ Error generating worksheet. Please check your API configuration.');
    } finally {
      setIsGenerating(false);
    }
  };

  const demoWorksheet = {
    title: 'The Water Cycle',
    subject: 'Science',
    class: 'Class 6',
    sections: [
      {
        type: 'Multiple Choice',
        questions: [
          'What is the primary source of energy for the water cycle?',
          'During which process does water change from liquid to gas?',
          'What happens during condensation?'
        ]
      },
      {
        type: 'Fill in the Blanks',
        questions: [
          'The process of water changing from liquid to vapor is called _______.',
          'Water vapor rises into the _______ and forms clouds.',
          'Rain, snow, and hail are forms of _______.'
        ]
      },
      {
        type: 'Short Answer',
        questions: [
          'Explain the process of evaporation.',
          'How do clouds form?',
          'Why is the water cycle important?'
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating gradient bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-teal-200 to-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-sky-100 to-teal-100 text-teal-800 px-5 py-2.5 rounded-full text-sm font-semibold shadow-md">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Premium Teaching Tool</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 animate-fade-in-up">
            Worksheet Generator
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in-up delay-200">
            Create customized worksheets for any chapter in seconds
          </p>
        </div>

        {/* Generator Panel */}
        {!hasWorksheet && (
          <div className="max-w-4xl mx-auto mb-12 animate-scale-in">
            <div className="glassmorphism rounded-3xl p-10 shadow-2xl animate-shadow-bloom">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Configure Worksheet</h2>
                  <p className="text-gray-600">Select your preferences below</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Subject Dropdown */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Subject</label>
                  <div className="relative">
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all text-lg font-medium bg-white appearance-none cursor-pointer hover:border-teal-300 hover:shadow-lg"
                    >
                      <option value="">Choose Subject</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <GraduationCap className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Class Dropdown */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Class</label>
                  <div className="relative">
                    <select
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all text-lg font-medium bg-white appearance-none cursor-pointer hover:border-sky-300 hover:shadow-lg"
                    >
                      <option value="">Choose Class</option>
                      {classes.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <GraduationCap className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Chapter Dropdown */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Chapter</label>
                  <div className="relative">
                    <select
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100 transition-all text-lg font-medium bg-white appearance-none cursor-pointer hover:border-lime-300 hover:shadow-lg"
                    >
                      <option value="">Choose Chapter</option>
                      {chapters.map((ch) => (
                        <option key={ch} value={ch}>{ch}</option>
                      ))}
                    </select>
                    <BookOpen className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!subject || !classLevel || !chapter || isGenerating}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 text-white px-10 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50 disabled:cursor-not-allowed animate-neon-glow"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isGenerating ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Generate Worksheet</span>
                      <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        )}

        {/* Worksheet Preview */}
        {hasWorksheet && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Export Options Bar */}
            <div className="flex flex-wrap gap-4 justify-center animate-bounce-in">
              <button className="group flex items-center gap-3 bg-white px-8 py-4 rounded-2xl font-bold text-teal-700 shadow-xl hover:shadow-2xl transition-all border-2 border-teal-200 hover:border-teal-400 hover:-translate-y-1 neon-border">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                <span>Download PDF</span>
              </button>
              <button className="group flex items-center gap-3 bg-white px-8 py-4 rounded-2xl font-bold text-sky-700 shadow-xl hover:shadow-2xl transition-all border-2 border-sky-200 hover:border-sky-400 hover:-translate-y-1 neon-border">
                <FileDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                <span>Download DOCX</span>
              </button>
              <button className="group flex items-center gap-3 bg-white px-8 py-4 rounded-2xl font-bold text-purple-700 shadow-xl hover:shadow-2xl transition-all border-2 border-purple-200 hover:border-purple-400 hover:-translate-y-1 neon-border">
                <Printer className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Print</span>
              </button>
            </div>

            {/* Worksheet Preview Card */}
            <div className="glassmorphism rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto animate-scale-in delay-200">
              {/* Worksheet Header */}
              <div className="text-center mb-10 pb-8 border-b-2 border-gray-200">
                <h2 className="text-4xl font-black text-gray-900 mb-3">{demoWorksheet.title}</h2>
                <div className="flex items-center justify-center gap-4 text-gray-600">
                  <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-xl font-bold">{demoWorksheet.subject}</span>
                  <span className="bg-sky-100 text-sky-800 px-4 py-2 rounded-xl font-bold">{demoWorksheet.class}</span>
                </div>
              </div>

              {/* Worksheet Sections */}
              <div className="space-y-10">
                {demoWorksheet.sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="animate-fade-in-up" style={{ animationDelay: `${(sectionIdx + 1) * 150}ms` }}>
                    <div className="bg-gradient-to-r from-teal-50 to-sky-50 rounded-2xl p-6 mb-6">
                      <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <span className="bg-gradient-to-r from-teal-500 to-sky-500 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg">
                          {sectionIdx + 1}
                        </span>
                        {section.type}
                      </h3>
                    </div>

                    <div className="space-y-4 pl-4">
                      {section.questions.map((question, qIdx) => (
                        <div key={qIdx} className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                          <span className="text-teal-600 font-bold text-lg flex-shrink-0">{qIdx + 1}.</span>
                          <p className="text-gray-800 text-lg leading-relaxed">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Generate Another Button */}
              <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
                <button
                  onClick={() => {
                    setHasWorksheet(false);
                    setSubject('');
                    setClassLevel('');
                    setChapter('');
                  }}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  Generate Another Worksheet
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
