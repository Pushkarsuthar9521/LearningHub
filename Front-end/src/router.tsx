import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import AdminPage from './pages/AdminPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import HomePage from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import QuizPage from './pages/QuizPage'
import QuizzesPage from './pages/QuizzesPage'
import { SignUpPage } from './pages/SignUpPage'

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
        path: 'signup',
        element: <SignUpPage />
      },
      {
        path: 'blog',
        element: <BlogPage />
      },
      {
        path: 'blog/:id',
        element: <BlogPostPage />
      },
      {
        path: 'quizzes',
        element: <QuizzesPage />
      },
      {
        path: 'quizzes/:id',
        element: <QuizPage />
      },
      {
        path: 'admin',
        element: <AdminPage />
      }
    ]
  }
])
