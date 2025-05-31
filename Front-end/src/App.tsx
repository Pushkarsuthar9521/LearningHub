import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// Pages
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import QuizzesPage from './pages/QuizzesPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quizzes/:slug" element={<QuizPage />} />
      </Routes>
    </Router>
  )
}

export default App
