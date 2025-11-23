import { Users, Mic, Brain, Image as ImageIcon, Volume2, Wifi, Code } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h1>
          <p className="text-xl text-gray-600">
            Behind the scenes of AI-powered learning for rural schools
          </p>
        </div>

        <section className="mb-16">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Rural students face significant barriers to quality education, creating a widening learning gap with their urban counterparts.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Lack of Quality Teachers:</strong> Many government schools struggle with teacher shortages and limited subject expertise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Language Barriers:</strong> Educational content is predominantly available in English, excluding millions of regional language speakers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700"><strong>Poor Internet Connectivity:</strong> Unreliable or absent internet access prevents students from accessing online learning resources</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Solution</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Multilingual Voice Q&A</h3>
              <p className="text-gray-600">
                Students can ask questions in their native language using voice input. The AI understands and responds in the same language, breaking down language barriers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visual Diagrams for Concepts</h3>
              <p className="text-gray-600">
                Complex scientific concepts are automatically converted into easy-to-understand visual diagrams, making learning more engaging and effective.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Teacher Content Generator</h3>
              <p className="text-gray-600">
                Teachers can upload chapters and instantly receive summaries, quiz questions, and audio lessons, saving hours of preparation time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Offline Access to Saved Lessons</h3>
              <p className="text-gray-600">
                Students can save lessons locally and access them anytime without internet, ensuring continuous learning regardless of connectivity.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How the AI Works</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Mic className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Speech to Text</h3>
                  </div>
                  <p className="text-gray-600">
                    Student speaks in their native language. Advanced speech recognition converts the audio into text while preserving language and context.
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-200 ml-5"></div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">Understanding & Answer Generation</h3>
                  </div>
                  <p className="text-gray-600">
                    AI analyzes the question, searches NCERT-aligned knowledge base, and generates a clear, grade-appropriate explanation in the student's language.
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-200 ml-5"></div>

              <div className="flex items-start gap-4">
                <div className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <ImageIcon className="w-5 h-5 text-pink-600" />
                    <h3 className="text-lg font-bold text-gray-900">Diagram Creation</h3>
                  </div>
                  <p className="text-gray-600">
                    For visual concepts, AI generates relevant diagrams and illustrations to complement the text explanation, enhancing comprehension.
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-200 ml-5"></div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Volume2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">Text to Speech</h3>
                  </div>
                  <p className="text-gray-600">
                    The explanation is converted to natural-sounding audio in the student's language, enabling audio-based learning for better accessibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <Wifi className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Offline-First Learning</h2>
                <p className="text-lg leading-relaxed mb-4 opacity-95">
                  Understanding the connectivity challenges in rural areas, we've built the platform with offline-first principles.
                </p>
                <ul className="space-y-2 opacity-95">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Last few lessons, diagrams, and audio files are automatically stored locally on the device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Students can open saved lessons even when internet is completely unavailable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Smart caching ensures essential content is always accessible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technology Stack</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Code className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Frontend</h3>
                  <p className="text-gray-600">React with TypeScript, Tailwind CSS for beautiful, responsive UI</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Code className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Backend</h3>
                  <p className="text-gray-600">Node.js with Express, Python for AI processing</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Brain className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">AI Models</h3>
                  <p className="text-gray-600">OpenAI GPT-4o, Whisper for speech recognition, DALL-E for diagrams, TTS for audio</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Wifi className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Storage</h3>
                  <p className="text-gray-600">Local device storage with IndexedDB for offline access, Supabase for cloud sync</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
