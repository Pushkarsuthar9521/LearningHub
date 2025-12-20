'use client'

import { UserOutlined } from '@ant-design/icons'
import { Menu as AntMenu, Avatar, Button, Dropdown, Modal } from 'antd'
import { BookOpen, Menu, Search, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  UserRole,
  useGetBlogsQuery,
  useGetQuizzesQuery
} from '../../generated/graphql'
import { useAuthStore } from '../../store/authStore'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  // Fetch blogs and quizzes for search
  const { data: blogsData } = useGetBlogsQuery()
  const { data: quizzesData } = useGetQuizzesQuery()

  // Filter results based on search query
  const filteredBlogs =
    blogsData?.getBlogs?.filter(
      blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags?.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ) || []

  const filteredQuizzes =
    quizzesData?.getQuizzes?.filter(
      quiz =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const handleSearchResultClick = (path: string) => {
    navigate(path)
    handleCloseSearch()
  }

  const menu = (
    <AntMenu>
      {user?.role === UserRole.Admin && (
        <AntMenu.Item key="admin">
          <Link to="/admin">Admin Dashboard</Link>
        </AntMenu.Item>
      )}
      <AntMenu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </AntMenu.Item>
      <AntMenu.Item key="settings">
        <Link to="/settings">Settings</Link>
      </AntMenu.Item>
      <AntMenu.Divider />
      <AntMenu.Item key="logout" onClick={handleLogout}>
        Logout
      </AntMenu.Item>
    </AntMenu>
  )

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 md:px-4 md:pt-4">
        <div className="container mx-auto max-w-7xl">
          <div
            className={`relative transition-all duration-500 md:rounded-full ${
              isScrolled
                ? 'bg-white md:bg-white/80 md:backdrop-blur-xl shadow-lg md:shadow-2xl md:shadow-emerald-500/5 border-b md:border border-gray-200 md:border-white/30'
                : 'bg-white md:bg-white/70 md:backdrop-blur-md shadow-md border-b md:border border-gray-200 md:border-white/30'
            }`}
          >
            <div className="hidden md:block absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-green-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative px-4 md:px-6 py-3">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    <BookOpen className="relative h-7 w-7 md:h-8 md:w-8 text-teal-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    LearnHub
                  </span>
                </Link>

                <nav className="hidden md:flex items-center">
                  <div className="flex items-center space-x-2 bg-gray-100/50 rounded-full px-2 py-1.5">
                    <Link
                      to="/blog"
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive('/blog')
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                          : 'text-gray-700 hover:bg-white/80 hover:text-blue-600'
                      }`}
                    >
                      Blog
                    </Link>
                    <Link
                      to="/quizzes"
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive('/quizzes')
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                          : 'text-gray-700 hover:bg-white/80 hover:text-blue-600'
                      }`}
                    >
                      Quizzes
                    </Link>
                    <Link
                      to="/categories"
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive('/categories')
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                          : 'text-gray-700 hover:bg-white/80 hover:text-blue-600'
                      }`}
                    >
                      Categories
                    </Link>
                  </div>
                </nav>

                {/* Right section */}
                <div className="hidden md:flex items-center space-x-3">
                  <button
                    aria-label="Search"
                    onClick={handleSearchClick}
                    className="p-2.5 text-gray-500 hover:text-teal-600 rounded-full hover:bg-teal-50 transition-all duration-300 hover:scale-110"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  {isAuthenticated && user ? (
                    <Dropdown overlay={menu} placement="bottomRight">
                      <div className="flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-full hover:bg-teal-50 transition-all duration-300 group">
                        <Avatar className="bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {user.firstName ? (
                            user.firstName.charAt(0).toUpperCase()
                          ) : (
                            <UserOutlined />
                          )}
                        </Avatar>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-gray-900">
                            {user.firstName || user.username}
                          </p>
                        </div>
                      </div>
                    </Dropdown>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button
                        type="default"
                        onClick={() => navigate('/login')}
                        className="font-medium rounded-full border-gray-300 hover:border-teal-500 hover:text-teal-600 hover:scale-105 transition-all"
                      >
                        Login
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => navigate('/signup')}
                        className="font-medium rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 border-0 hover:from-teal-700 hover:to-emerald-700 shadow-md hover:shadow-lg hover:scale-105 transition-all"
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>

                <div className="md:hidden flex items-center">
                  <button
                    aria-label="Toggle menu"
                    className="p-2 text-gray-600 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-all duration-300"
                    onClick={toggleMenu}
                  >
                    {isMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-16">
          <div
            className="absolute inset-0 bg-gray-900/40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="relative h-full">
            <div className="bg-white shadow-2xl h-full overflow-y-auto">
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <Link
                    to="/blog"
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive('/blog')
                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    to="/quizzes"
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive('/quizzes')
                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Quizzes
                  </Link>
                  <Link
                    to="/categories"
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive('/categories')
                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Categories
                  </Link>
                </div>

                {/* Mobile Search Section */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="relative">
                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200 transition-all">
                      <div className="pl-4 pr-2 py-3 flex items-center">
                        <Search className="text-teal-600 h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search blogs, quizzes..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="flex-1 py-3 bg-transparent focus:outline-none text-base text-gray-700"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="pr-4 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Mobile Search Results */}
                    {searchQuery && (
                      <div className="mt-3 max-h-80 overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-lg">
                        {filteredBlogs.length === 0 &&
                        filteredQuizzes.length === 0 ? (
                          <div className="p-6 text-center text-gray-500">
                            No results found for "{searchQuery}"
                          </div>
                        ) : (
                          <div className="p-2">
                            {filteredBlogs.length > 0 && (
                              <div className="mb-3">
                                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                  Blogs ({filteredBlogs.length})
                                </p>
                                {filteredBlogs.slice(0, 3).map(blog => (
                                  <button
                                    key={blog.id}
                                    onClick={() => {
                                      handleSearchResultClick(
                                        `/blog/${blog.slug}`
                                      )
                                      setIsMenuOpen(false)
                                    }}
                                    className="w-full text-left px-3 py-3 hover:bg-teal-50 rounded-lg transition-all"
                                  >
                                    <p className="font-medium text-gray-900 text-sm line-clamp-1">
                                      {blog.title}
                                    </p>
                                    {blog.excerpt && (
                                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                        {blog.excerpt}
                                      </p>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                            {filteredQuizzes.length > 0 && (
                              <div>
                                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                  Quizzes ({filteredQuizzes.length})
                                </p>
                                {filteredQuizzes.slice(0, 3).map(quiz => (
                                  <button
                                    key={quiz.id}
                                    onClick={() => {
                                      handleSearchResultClick(
                                        `/quiz/${quiz.slug}`
                                      )
                                      setIsMenuOpen(false)
                                    }}
                                    className="w-full text-left px-3 py-3 hover:bg-teal-50 rounded-lg transition-all"
                                  >
                                    <p className="font-medium text-gray-900 text-sm line-clamp-1">
                                      {quiz.title}
                                    </p>
                                    {quiz.description && (
                                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                        {quiz.description}
                                      </p>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div>
                    {isAuthenticated && user ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100">
                          <Avatar className="bg-gradient-to-r from-teal-500 to-emerald-600">
                            {user.firstName ? (
                              user.firstName.charAt(0).toUpperCase()
                            ) : (
                              <UserOutlined />
                            )}
                          </Avatar>
                          <div>
                            <p className="text-base font-semibold text-gray-900">
                              {user.firstName || user.username}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {user?.role === UserRole.Admin && (
                            <Link
                              to="/admin"
                              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-all"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <Link
                            to="/profile"
                            className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-all"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Your Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-all"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Settings
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout()
                              setIsMenuOpen(false)
                            }}
                            className="w-full text-left block px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-all"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button
                          type="default"
                          onClick={() => {
                            navigate('/login')
                            setIsMenuOpen(false)
                          }}
                          className="w-full font-medium rounded-xl border-gray-300 hover:border-teal-500 hover:text-teal-600 h-11"
                        >
                          Login
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            navigate('/signup')
                            setIsMenuOpen(false)
                          }}
                          className="w-full font-medium rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 border-0 shadow-md h-11"
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Search Modal */}
      <Modal
        open={isSearchOpen}
        onCancel={handleCloseSearch}
        footer={null}
        width={700}
        centered
        className="search-modal"
        destroyOnClose
      >
        <div className="py-4">
          <div className="relative mb-6">
            <div className="flex items-center bg-gray-50 rounded-xl border-2 border-gray-200 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-100 transition-all">
              <div className="pl-5 pr-3 py-4 flex items-center">
                <Search className="text-teal-600 h-6 w-6" />
              </div>
              <input
                type="text"
                placeholder="Search for blogs, quizzes, or topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 py-4 text-gray-700 bg-transparent focus:outline-none text-base"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="pr-5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Popular Tags */}
          {!searchQuery && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                Popular Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {['Technology', 'Science', 'Business', 'Arts', 'Health'].map(
                  tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gradient-to-r hover:from-teal-600 hover:to-emerald-600 hover:text-white transition-all duration-300"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div className="max-h-96 overflow-y-auto">
              {filteredBlogs.length === 0 && filteredQuizzes.length === 0 ? (
                <div className="py-12 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">
                    No results found for "{searchQuery}"
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try different keywords
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredBlogs.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                          Blogs
                        </p>
                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-semibold">
                          {filteredBlogs.length} result
                          {filteredBlogs.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {filteredBlogs.slice(0, 5).map(blog => (
                          <button
                            key={blog.id}
                            onClick={() =>
                              handleSearchResultClick(`/blog/${blog.slug}`)
                            }
                            className="w-full text-left px-4 py-3 hover:bg-teal-50 rounded-xl transition-all group border border-transparent hover:border-teal-200"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-1">
                                  {blog.title}
                                </p>
                                {blog.excerpt && (
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {blog.excerpt}
                                  </p>
                                )}
                                {blog.tags && blog.tags.length > 0 && (
                                  <div className="flex gap-2 mt-2">
                                    {blog.tags.slice(0, 3).map((tag, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-teal-600 ml-3 flex-shrink-0 transition-colors" />
                            </div>
                          </button>
                        ))}
                        {filteredBlogs.length > 5 && (
                          <button
                            onClick={() => {
                              handleSearchResultClick('/blog')
                            }}
                            className="w-full text-center py-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                          >
                            View all {filteredBlogs.length} blogs →
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {filteredQuizzes.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                          Quizzes
                        </p>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                          {filteredQuizzes.length} result
                          {filteredQuizzes.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {filteredQuizzes.slice(0, 5).map(quiz => (
                          <button
                            key={quiz.id}
                            onClick={() =>
                              handleSearchResultClick(`/quiz/${quiz.slug}`)
                            }
                            className="w-full text-left px-4 py-3 hover:bg-emerald-50 rounded-xl transition-all group border border-transparent hover:border-emerald-200"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                  {quiz.title}
                                </p>
                                {quiz.description && (
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {quiz.description}
                                  </p>
                                )}
                              </div>
                              <span className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 ml-3 flex-shrink-0 transition-colors">
                                🎯
                              </span>
                            </div>
                          </button>
                        ))}
                        {filteredQuizzes.length > 5 && (
                          <button
                            onClick={() => {
                              handleSearchResultClick('/quizzes')
                            }}
                            className="w-full text-center py-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            View all {filteredQuizzes.length} quizzes →
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default Header
