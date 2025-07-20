export interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string
  author: User
  categories: Category[]
  tags: Tag[]
  createdAt: string
  updatedAt: string
  published: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface Quiz {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string
  author: User
  categories: Category[]
  tags: Tag[]
  questions: QuizQuestion[]
  createdAt: string
  updatedAt: string
  published: boolean
  timeLimit?: number // in minutes
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  answers: number[]
  score: number
  completedAt: string
  timeSpent: number // in seconds
}

export interface SearchResult {
  type: 'blog' | 'quiz'
  item: BlogPost | Quiz
}
