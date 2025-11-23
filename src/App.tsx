import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import Chapters from './pages/Chapters';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Worksheets from './pages/Worksheets';
import Flashcards from './pages/Flashcards';
import SavedLessons from './pages/SavedLessons';
import HowItWorks from './pages/HowItWorks';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/student" element={<Student />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/worksheets" element={<Worksheets />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/saved" element={<SavedLessons />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
