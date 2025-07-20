import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import QuizzesPage from './pages/QuizzesPage'
import QuizPage from './pages/QuizPage'
import { LoginPage } from './pages/LoginPage'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'blog',
        element: <BlogPage />
      },
      {
        path: 'blog/:slug',
        element: <BlogPostPage />
      },
      {
        path: 'quizzes',
        element: <QuizzesPage />
      },
      {
        path: 'quizzes/:slug',
        element: <QuizPage />
      }
    ]
  }
])
