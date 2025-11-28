import { ArrowRight, BookOpen, GraduationCap, Search } from 'lucide-react'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard'
import QuizCard from '../components/quiz/QuizCard'
import Button from '../components/ui/Button'
import { Blog, useGetBlogsQuery } from '../generated/graphql'
import { useAuthStore } from '../store/authStore'
import useQuizStore from '../store/quizStore'

const HomePage: FC = () => {
  const { data: blogData } = useGetBlogsQuery()
  const { quizzes, fetchQuizzes } = useQuizStore()
  const { isAuthenticated } = useAuthStore()

  const posts = (blogData?.getBlogs as Blog[]) || []

  useEffect(() => {
    fetchQuizzes()
  }, [fetchQuizzes])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Learn, Create, and Test Your Knowledge
            </h1>
            <p className="text-xl sm:text-2xl mb-8 opacity-90">
              An AI-powered platform for interactive learning through blogs and
              quizzes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* <Button 
                size="lg" 
                variant="primary" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                as={Link}
                to="/blog"
                leftIcon={<BookOpen className="h-5 w-5" />}
              >
                Explore Blog
              </Button> */}
              {/* <Button 
                size="lg" 
                variant="secondary"
                className="bg-purple-700 hover:bg-purple-800 border border-purple-500"
                as={Link}
                to="/quizzes"
                leftIcon={<GraduationCap className="h-5 w-5" />}
              >
                Browse Quizzes
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-10 bg-white shadow-md relative -mt-8 rounded-t-3xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for blogs, quizzes, or topics..."
                className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
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

      {/* Featured Quiz Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Popular Quizzes
              </h2>
              <p className="text-gray-600 mt-2">
                Test your knowledge and challenge yourself
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

      {/* How It Works Section */}
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

      {/* CTA Section */}
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
              <Button
                size="lg"
                variant="primary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Sign Up for Free
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default HomePage
