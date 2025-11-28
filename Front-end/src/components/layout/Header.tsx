import { UserOutlined } from '@ant-design/icons'
import { Menu as AntMenu, Avatar, Button, Dropdown } from 'antd'
import { BookOpen, Menu, Search, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserRole } from '../../generated/graphql'
import { useAuthStore } from '../../store/authStore'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LearnHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/blog"
              className={`text-base font-medium ${
                isActive('/blog')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } transition-colors`}
            >
              Blog
            </Link>
            <Link
              to="/quizzes"
              className={`text-base font-medium ${
                isActive('/quizzes')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } transition-colors`}
            >
              Quizzes
            </Link>
            <Link
              to="/categories"
              className={`text-base font-medium ${
                isActive('/categories')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } transition-colors`}
            >
              Categories
            </Link>
          </nav>

          {/* Right section */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              aria-label="Search"
              className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            {isAuthenticated && user ? (
              <Dropdown overlay={menu} placement="bottomRight">
                <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Avatar className="bg-gradient-to-r from-blue-500 to-purple-600">
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
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </div>
              </Dropdown>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  type="default"
                  onClick={() => navigate('/login')}
                  className="font-medium border-gray-300 hover:border-blue-500 hover:text-blue-600"
                >
                  Login
                </Button>
                <Button
                  type="primary"
                  onClick={() => navigate('/signup')}
                  className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:from-blue-700 hover:to-purple-700 shadow-md"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link
              to="/blog"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/blog')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              } transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/quizzes"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/quizzes')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              } transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Quizzes
            </Link>
            <Link
              to="/categories"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/categories')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              } transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-3">
                {isAuthenticated && user ? (
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="bg-gradient-to-r from-blue-500 to-purple-600">
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
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      type="default"
                      onClick={() => {
                        navigate('/login')
                        setIsMenuOpen(false)
                      }}
                      className="w-full font-medium border-gray-300"
                    >
                      Login
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        navigate('/signup')
                        setIsMenuOpen(false)
                      }}
                      className="w-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 border-0"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
              {isAuthenticated && (
                <div className="mt-3 px-2 space-y-1">
                  {user?.role === UserRole.Admin && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
