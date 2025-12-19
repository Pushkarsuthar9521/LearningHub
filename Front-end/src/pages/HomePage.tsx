'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, GraduationCap, Sparkles } from 'lucide-react'
import { type FC } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard'
import QuizCard from '../components/quiz/QuizCard'
import Button from '../components/ui/Button'
import InteractiveBackground from '../components/ui/InteractiveBackground'
import { SpotlightImage } from '../components/ui/SpotlightImage'
import { SpotlightText } from '../components/ui/SpotlightText'
import {
  type Blog,
  useGetBlogsQuery,
  useGetQuizzesQuery
} from '../generated/graphql'
import HeroImage from '../Images/heroSectionImage2.png'
import { useAuthStore } from '../store/authStore'

const HomePage: FC = () => {
  const { data: blogData } = useGetBlogsQuery()
  const { data: quizData } = useGetQuizzesQuery()
  const { isAuthenticated } = useAuthStore()

  const posts = (blogData?.getBlogs as Blog[]) || []
  const quizzes = quizData?.getQuizzes || []

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100/10 rounded-full blur-3xl"></div>

          {/* Animated Floating Balls */}
          <InteractiveBackground />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-teal-100/80 backdrop-blur-sm border border-teal-200">
                <Sparkles className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-700">
                  AI-Powered Learning Platform
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance text-slate-900 cursor-pointer"
              >
                <SpotlightText text="Learn, Create, and" />{' '}
                <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Test Your Knowledge
                </span>
              </motion.h1>
              <p className="text-lg sm:text-xl mb-10 text-slate-600 text-pretty max-w-2xl mx-auto lg:mx-0 cursor-pointer">
                <SpotlightText
                  text="
                An AI-powered platform for interactive learning through blogs
                and quizzes. Start your journey to mastery today."
                />
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
                <Link
                  to="/blog"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-teal-700 hover:scale-105 transition-all duration-300"
                >
                  <BookOpen className="h-5 w-5" />
                  Explore Blog
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/quizzes"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-full font-semibold border-2 border-teal-200 hover:border-teal-400 hover:scale-105 transition-all duration-300"
                >
                  <GraduationCap className="h-5 w-5" />
                  Browse Quizzes
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-slate-200">
                  <div className="text-2xl sm:text-3xl font-bold mb-1 text-teal-600">
                    {posts.length}+
                  </div>
                  <div className="text-sm text-slate-600">Articles</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-slate-200">
                  <div className="text-2xl sm:text-3xl font-bold mb-1 text-blue-600">
                    {quizzes.length}+
                  </div>
                  <div className="text-sm text-slate-600">Quizzes</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-slate-200">
                  <div className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    AI
                  </div>
                  <div className="text-sm text-slate-600">Powered</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 hidden lg:block">
              <div className="relative max-w-lg mx-auto">
                <SpotlightImage
                  src={HeroImage}
                  alt="Learning Platform"
                  className="w-full h-auto"
                />
                <div className="absolute -z-10 -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Articles
              </h2>
              <p className="text-gray-600 mt-2">
                Expand your knowledge with our latest content
              </p>
            </div>
            <Link
              to="/blog"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Popular Quizzes
              </h2>
              <p className="text-gray-600 mt-2">
                Test your understanding and challenge yourself
              </p>
            </div>
            <Link
              to="/quizzes"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center transition-colors"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {quizzes.slice(0, 2).map(quiz => (
              <QuizCard key={quiz.id} quiz={quiz} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-2">
              Simple steps to start learning and testing your knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Read Articles
              </h3>
              <p className="text-gray-600">
                Explore our collection of articles written by experts on various
                topics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Take Quizzes
              </h3>
              <p className="text-gray-600">
                Test your understanding with interactive quizzes on various
                subjects.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-teal-100 text-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your learning journey and see your improvement over
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {!isAuthenticated && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Start Learning?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join our community of learners and expand your knowledge today!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold shadow-lg"
                  onClick={() => (window.location.href = '/signup')}
                >
                  Sign Up for Free
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
                  onClick={() => (window.location.href = '/login')}
                >
                  Already have an account? Login
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default HomePage
