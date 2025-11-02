import { Filter, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QuizCard from '../components/quiz/QuizCard'
import { Card, CardContent } from '../components/ui/Card'
import Input from '../components/ui/Input'
import useQuizStore from '../store/quizStore'
import { Quiz } from '../types'

const QuizzesPage: React.FC = () => {
  const {
    quizzes,
    categories,
    tags,
    fetchQuizzes,
    fetchCategories,
    fetchTags
  } = useQuizStore()
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    fetchQuizzes()
    fetchCategories()
    fetchTags()
  }, [fetchQuizzes, fetchCategories, fetchTags])

  useEffect(() => {
    let result = [...quizzes]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        quiz =>
          quiz.title.toLowerCase().includes(query) ||
          quiz.description.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(quiz =>
        quiz.categories.some(category => category.id === selectedCategory)
      )
    }

    // Apply tag filter
    if (selectedTag) {
      result = result.filter(quiz =>
        quiz.tags.some(tag => tag.id === selectedTag)
      )
    }

    setFilteredQuizzes(result)
  }, [quizzes, searchQuery, selectedCategory, selectedTag])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  const handleTagChange = (tagId: string) => {
    setSelectedTag(selectedTag === tagId ? null : tagId)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTag(null)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Challenge Yourself</h1>
            <p className="text-xl opacity-90">
              Test your knowledge with our collection of interactive quizzes
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-md relative -mt-8 rounded-t-3xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                fullWidth
              />
            </div>
            <div className="w-full md:w-1/2 flex gap-2">
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() =>
                  document
                    .getElementById('filters-modal')
                    ?.classList.toggle('hidden')
                }
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              {(selectedCategory || selectedTag || searchQuery) && (
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Filters Modal */}
          <div
            id="filters-modal"
            className="mt-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        checked={selectedCategory === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <span className="ml-2 text-gray-700">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Difficulty
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags
                    .filter(tag =>
                      ['Beginner', 'Intermediate', 'Advanced'].includes(
                        tag.name
                      )
                    )
                    .map(tag => (
                      <button
                        key={tag.id}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedTag === tag.id
                            ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                        }`}
                        onClick={() => handleTagChange(tag.id)}
                      >
                        {tag.name}
                      </button>
                    ))}
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-3 mt-6">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags
                    .filter(
                      tag =>
                        !['Beginner', 'Intermediate', 'Advanced'].includes(
                          tag.name
                        )
                    )
                    .map(tag => (
                      <button
                        key={tag.id}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedTag === tag.id
                            ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                        }`}
                        onClick={() => handleTagChange(tag.id)}
                      >
                        {tag.name}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quiz */}
      {filteredQuizzes.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Quiz
            </h2>
            <QuizCard quiz={filteredQuizzes[0]} variant="featured" />
          </div>
        </section>
      )}

      {/* All Quizzes */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {searchQuery || selectedCategory || selectedTag
              ? 'Search Results'
              : 'Browse Quizzes'}
          </h2>

          {filteredQuizzes.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No quizzes found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredQuizzes
                .slice(searchQuery || selectedCategory || selectedTag ? 0 : 1)
                .map(quiz => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/quizzes/category/${category.slug}`}
                className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-2 text-gray-600">{category.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default QuizzesPage
