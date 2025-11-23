import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getAllSubjects } from '../data/curriculum';

export default function Subjects() {
  const subjects = getAllSubjects();

  const getColorStyles = (color: string) => {
    const colorMap: Record<string, any> = {
      'from-green-500 to-emerald-500': {
        gradient: 'from-green-500 to-emerald-500',
        bg: 'from-green-50 to-emerald-50',
        hover: 'hover:border-green-300',
        text: 'text-green-700'
      },
      'from-blue-500 to-indigo-500': {
        gradient: 'from-blue-500 to-indigo-500',
        bg: 'from-blue-50 to-indigo-50',
        hover: 'hover:border-blue-300',
        text: 'text-blue-700'
      },
      'from-orange-500 to-red-500': {
        gradient: 'from-orange-500 to-red-500',
        bg: 'from-orange-50 to-red-50',
        hover: 'hover:border-orange-300',
        text: 'text-orange-700'
      },
      'from-purple-500 to-pink-500': {
        gradient: 'from-purple-500 to-pink-500',
        bg: 'from-purple-50 to-pink-50',
        hover: 'hover:border-purple-300',
        text: 'text-purple-700'
      },
      'from-yellow-500 to-orange-500': {
        gradient: 'from-yellow-500 to-orange-500',
        bg: 'from-yellow-50 to-orange-50',
        hover: 'hover:border-yellow-300',
        text: 'text-yellow-700'
      }
    };
    return colorMap[color] || colorMap['from-blue-500 to-indigo-500'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>NCERT Aligned Curriculum</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 animate-fade-in-up">
            Choose Your Subject
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 animate-fade-in-up delay-200">
            Comprehensive study materials for Classes 6-10
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => {
            const styles = getColorStyles(subject.color);
            return (
              <Link
                key={subject.id}
                to={`/chapters?subject=${subject.id}`}
                className={`group bg-gradient-to-br ${styles.bg} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent ${styles.hover} animate-scale-in hover-lift`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${styles.gradient} shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  <span className="text-4xl">{subject.icon}</span>
                </div>

                <h3 className="text-3xl font-black text-gray-900 mb-3">
                  {subject.name}
                </h3>

                <p className={`${styles.text} font-semibold mb-6`}>
                  Classes 6-10 • Complete NCERT Coverage
                </p>

                <div className="flex items-center gap-2 text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                  <span>Explore Chapters</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/60 rounded-full text-xs font-semibold text-gray-700">
                    AI-Powered
                  </span>
                  <span className="px-3 py-1 bg-white/60 rounded-full text-xs font-semibold text-gray-700">
                    Audio Lessons
                  </span>
                  <span className="px-3 py-1 bg-white/60 rounded-full text-xs font-semibold text-gray-700">
                    Worksheets
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 text-center animate-fade-in-up delay-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Use our AI assistant to ask any question from your syllabus
          </p>
          <Link
            to="/student"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Ask AI Anything
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
