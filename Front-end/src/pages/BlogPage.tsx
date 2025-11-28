import { Filter, Search } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import BlogCard from '../components/blog/BlogCard'
import { Card, CardContent } from '../components/ui/Card'
import Input from '../components/ui/Input'
import { Blog, useGetBlogsQuery } from '../generated/graphql'

const BlogPage: React.FC = () => {
  const { data, loading } = useGetBlogsQuery()
  const [filteredPosts, setFilteredPosts] = useState<Blog[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const posts = useMemo(() => data?.getBlogs || [], [data])

  // Extract unique categories and tags from posts
  const categories = useMemo(
    () => Array.from(new Set(posts.map(p => p.category))),
    [posts]
  )
  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap(p => p.tags))),
    [posts]
  )

  useEffect(() => {
    let result = [...posts]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          (post.excerpt?.toLowerCase().includes(query) ?? false)
      )
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory)
    }

    // Apply tag filter
    if (selectedTag) {
      result = result.filter(post => post.tags.includes(selectedTag))
    }

    setFilteredPosts(result as Blog[])
  }, [posts, searchQuery, selectedCategory, selectedTag])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTag(null)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">The Blog</h1>
            <p className="text-xl opacity-90">
              Explore articles on technology, programming, and web development
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                fullWidth
              />
            </div>
            <div className="w-full md:w-1/2 flex gap-2">
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedTag === tag
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                      }`}
                      onClick={() => handleTagChange(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Post
            </h2>
            <BlogCard post={filteredPosts[0]} variant="featured" />
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {searchQuery || selectedCategory || selectedTag
              ? 'Search Results'
              : 'Latest Articles'}
          </h2>

          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts
                .slice(searchQuery || selectedCategory || selectedTag ? 0 : 1)
                .map(post => (
                  <BlogCard key={post.id} post={post} />
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
              <div
                key={category}
                className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategoryChange(category)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogPage
