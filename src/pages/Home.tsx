import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  BookOpen, Mic, Image as ImageIcon, GraduationCap, Users, Sparkles,
  Backpack, School, Building2, ArrowRight, Play, CheckCircle2,
  Globe, Wifi, Zap, Heart, Code, Brain, X, Volume2
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { textToSpeech } from '../lib/elevenlabs';

export default function Home() {
  const whoIsThisForRef = useScrollReveal();
  const howItWorksRef = useScrollReveal();
  const liveDemoRef = useScrollReveal();
  const valueRef = useScrollReveal();
  const impactRef = useScrollReveal();

  const [showAudioModal, setShowAudioModal] = useState(false);
  const [showDiagramModal, setShowDiagramModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState('');

  const demoText = "The water cycle is the continuous movement of water on, above, and below the Earth's surface. It involves evaporation, condensation, precipitation, and collection.";

  const handlePlayAudio = async () => {
    setIsPlayingAudio(true);
    setAudioError('');
    try {
      const audioUrl = await textToSpeech(demoText);
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => {
        setIsPlayingAudio(false);
        setAudioError('Audio playback failed');
      };
      await audio.play();
      setShowAudioModal(true);
    } catch (error) {
      setIsPlayingAudio(false);
      setAudioError(error instanceof Error ? error.message : 'Failed to generate audio');
      setShowAudioModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 overflow-hidden">

      {/* Audio Modal */}
      {showAudioModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAudioModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Volume2 className="w-6 h-6 text-blue-600" />
                Audio Demo
              </h3>
              <button onClick={() => setShowAudioModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            {audioError ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-800 font-semibold mb-2">Audio Generation Issue</p>
                <p className="text-sm text-red-700">{audioError}</p>
                <p className="text-xs text-red-600 mt-3">Check the API Test page to verify ElevenLabs configuration</p>
              </div>
            ) : isPlayingAudio ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4 animate-pulse">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-900">Playing Audio...</p>
                <p className="text-sm text-gray-600 mt-2">Hearing AI-generated explanation</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-900">Audio Played Successfully!</p>
                <p className="text-sm text-gray-600 mt-2">ElevenLabs text-to-speech working</p>
              </div>
            )}
            <button
              onClick={() => setShowAudioModal(false)}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Diagram Modal */}
      {showDiagramModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDiagramModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-blue-600" />
                Water Cycle Diagram
              </h3>
              <button onClick={() => setShowDiagramModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <img
                src="https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Water Cycle Diagram"
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <div className="bg-white rounded-xl p-4 mt-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Water Cycle Stages
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Evaporation:</strong> Water from oceans, lakes, and rivers turns into vapor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Condensation:</strong> Water vapor cools and forms clouds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Precipitation:</strong> Water falls back as rain, snow, or hail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Collection:</strong> Water gathers in bodies of water and the cycle repeats</span>
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setShowDiagramModal(false)}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob delay-700"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Hero Content */}
            <div className="text-left space-y-8">
              <div className="inline-block animate-fade-in-down">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover-grow">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>AI-Powered Learning for Everyone</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight animate-fade-in-up">
                Vidyapeeth<br />
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  AI Study Companion
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed animate-fade-in-up delay-200 max-w-2xl">
                Complete NCERT curriculum coverage for Classes 6-10 with AI-powered explanations, voice synthesis, and visual learning tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                <Link
                  to="/student"
                  className="group bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <span>Try as Student</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/teacher"
                  className="group bg-white text-orange-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all border-2 border-orange-200 hover:border-orange-400 flex items-center justify-center gap-2"
                >
                  <span>For Teachers</span>
                  <GraduationCap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Demo Preview Card */}
            <div className="animate-scale-in delay-400">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-orange-100 card-device-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10 space-y-6">
                  {/* Question Header */}
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium mb-1">Question in Telugu</p>
                      <p className="text-lg font-bold text-gray-900">నీటి చక్రం అంటే ఏమిటి?</p>
                      <p className="text-sm text-gray-600 mt-1">(What is the water cycle?)</p>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 border border-orange-200">
                    <p className="text-gray-800 leading-relaxed">
                      The water cycle is the continuous movement of water on, above, and below the Earth's surface. It involves evaporation, condensation, precipitation, and collection...
                    </p>
                  </div>

                  {/* Diagram Preview */}
                  <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-6 flex items-center justify-center border border-teal-200">
                    <div className="text-center">
                      <div className="text-6xl mb-3">🌊☁️🌧️</div>
                      <p className="text-sm font-semibold text-teal-900">Water Cycle Diagram</p>
                    </div>
                  </div>

                  {/* Action Buttons - NOW FUNCTIONAL */}
                  <div className="flex gap-3">
                    <button
                      onClick={handlePlayAudio}
                      disabled={isPlayingAudio}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isPlayingAudio ? 'Playing...' : 'Play Audio'}</span>
                    </button>
                    <button
                      onClick={() => setShowDiagramModal(true)}
                      className="flex-1 flex items-center justify-center gap-2 bg-white text-orange-700 px-4 py-3 rounded-xl font-semibold border-2 border-orange-300 hover:shadow-lg transition-all"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>View Diagram</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section ref={whoIsThisForRef.ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${whoIsThisForRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Who Is This For?
            </h2>
            <p className="text-xl text-gray-600">Designed for everyone in the education ecosystem</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Backpack,
                title: 'Students',
                desc: 'Learn any NCERT concept in your language with voice, visuals, and quizzes',
                color: 'from-orange-500 to-red-500',
                delay: 'delay-100'
              },
              {
                icon: GraduationCap,
                title: 'Teachers',
                desc: 'Upload chapters and get instant summaries, quizzes, and audio lessons',
                color: 'from-teal-500 to-green-500',
                delay: 'delay-200'
              },
              {
                icon: Building2,
                title: 'Schools & NGOs',
                desc: 'Empower education with AI learning tools and comprehensive curriculum coverage',
                color: 'from-purple-500 to-pink-500',
                delay: 'delay-300'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all hover-lift ${whoIsThisForRef.isVisible ? `animate-fade-in-up ${item.delay}` : 'opacity-0'}`}
                >
                  <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef.ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${howItWorksRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Three simple steps to intelligent learning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Arrows (hidden on mobile) */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-red-400 to-pink-400 -translate-y-1/2 -translate-x-full"></div>

            {[
              {
                step: '01',
                title: 'Select Topic',
                desc: 'Choose your class, subject, and chapter from complete NCERT curriculum',
                icon: BookOpen,
                color: 'from-orange-500 to-red-500',
                delay: 'delay-100'
              },
              {
                step: '02',
                title: 'AI Explains',
                desc: 'Get instant explanations with diagrams, audio, and curriculum-aligned content',
                icon: Brain,
                color: 'from-red-500 to-pink-500',
                delay: 'delay-300'
              },
              {
                step: '03',
                title: 'Practice & Master',
                desc: 'Practice with flashcards, worksheets, and track your progress',
                icon: CheckCircle2,
                color: 'from-pink-500 to-purple-500',
                delay: 'delay-500'
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`relative z-10 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover-lift ${howItWorksRef.isVisible ? `animate-scale-in ${item.delay}` : 'opacity-0'}`}
                >
                  <div className="text-6xl font-black text-gray-100 mb-4">{item.step}</div>
                  <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 -mt-12`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Demo Preview Section */}
      <section ref={liveDemoRef.ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${liveDemoRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Try Live Concepts
            </h2>
            <p className="text-xl text-gray-600">Click any concept to see AI in action</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Water Cycle',
                subject: 'Class 6 Science',
                emoji: '🌊',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'from-blue-50 to-cyan-50',
                delay: 'delay-100'
              },
              {
                title: 'Photosynthesis',
                subject: 'Class 7 Science',
                emoji: '🌿',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'from-green-50 to-emerald-50',
                delay: 'delay-200'
              },
              {
                title: 'Fractions',
                subject: 'Class 6 Maths',
                emoji: '🔢',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'from-purple-50 to-pink-50',
                delay: 'delay-300'
              }
            ].map((concept, idx) => (
              <Link
                key={idx}
                to="/student"
                className={`group block ${liveDemoRef.isVisible ? `animate-zoom-in ${concept.delay}` : 'opacity-0'}`}
              >
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-100 hover:border-orange-300 hover-lift">
                  <div className={`bg-gradient-to-br ${concept.bgColor} h-48 flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-8xl group-hover:scale-110 transition-transform">{concept.emoji}</div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${concept.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{concept.title}</h3>
                    <p className="text-gray-600 mb-4">{concept.subject}</p>
                    <div className="flex items-center gap-2 text-orange-600 font-semibold">
                      <span>Try Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section ref={valueRef.ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 ${valueRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Vidyapeeth?
            </h2>
            <p className="text-xl text-gray-600">Comprehensive AI-powered learning platform</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'Complete NCERT', desc: 'Full curriculum for Classes 6-10', delay: 'delay-100' },
              { icon: Brain, title: 'AI-Powered', desc: 'Smart explanations and diagrams', delay: 'delay-200' },
              { icon: Zap, title: 'Voice + Visuals', desc: 'Audio lessons and visual learning', delay: 'delay-300' },
              { icon: CheckCircle2, title: 'Practice Tools', desc: 'Flashcards and worksheets', delay: 'delay-400' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover-lift ${valueRef.isVisible ? `animate-fade-in-up ${item.delay}` : 'opacity-0'}`}
                >
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact + Tech Strip */}
      <section ref={impactRef.ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-orange-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${impactRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-400" />
                Our Mission
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Complete NCERT curriculum coverage</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>AI-powered personalized learning</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Accessible education for all</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-cyan-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'Gemini AI', 'ElevenLabs', 'Supabase', 'Vite', 'TypeScript'].map((tech, idx) => (
                  <span key={idx} className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
