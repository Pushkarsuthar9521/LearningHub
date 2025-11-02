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
                <Avatar>
                  {user.firstName ? (
                    user.firstName.charAt(0).toUpperCase()
                  ) : (
                    <UserOutlined />
                  )}
                </Avatar>
              </Dropdown>
            ) : (
              <Button type="primary" onClick={() => navigate('/signup')}>
                Sign In
              </Button>
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
              <div className="flex items-center px-3">
                {isAuthenticated && user ? (
                  <div className="flex items-center">
                    <Avatar>
                      {user.firstName ? (
                        user.firstName.charAt(0).toUpperCase()
                      ) : (
                        <UserOutlined />
                      )}
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-800">
                        {user.username}
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate('/signup')
                      setIsMenuOpen(false)
                    }}
                    style={{ width: '100%' }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
              {isAuthenticated && (
                <div className="mt-3 px-2 space-y-1">
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
                  <a
                    href="#"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Sign out
                  </a>
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
