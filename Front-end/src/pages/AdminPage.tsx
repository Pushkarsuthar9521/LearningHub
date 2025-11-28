import React, { useState } from 'react'
import AdminDashboard from '../components/admin/AdminDashboard'
import AdminSidebar from '../components/admin/AdminSidebar'
import CreateBlog from '../components/admin/CreateBlog'
import CreateQuiz from '../components/admin/CreateQuiz'
import ManageBlogs from '../components/admin/ManageBlogs'
import ManageQuizzes from '../components/admin/ManageQuizzes'
import { UserRole } from '../generated/graphql'
import { useAuthStore } from '../store/authStore'

const AdminPage: React.FC = () => {
  const { user } = useAuthStore()
  const [selectedSection, setSelectedSection] = useState('dashboard')

  // Check if user is admin
  if (!user || user.role !== UserRole.Admin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <AdminDashboard />
      case 'create-blog':
        return <CreateBlog />
      case 'manage-blogs':
        return <ManageBlogs />
      case 'create-quiz':
        return <CreateQuiz />
      case 'manage-quizzes':
        return <ManageQuizzes />
      case 'analytics':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Analytics feature coming soon</p>
          </div>
        )
      case 'users':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 mt-2">
              User management feature coming soon
            </p>
          </div>
        )
      case 'categories':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Category Management
            </h1>
            <p className="text-gray-600 mt-2">
              Category management feature coming soon
            </p>
          </div>
        )
      case 'settings':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Settings feature coming soon</p>
          </div>
        )
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <AdminSidebar
          selectedKey={selectedSection}
          onSelect={setSelectedSection}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">{renderContent()}</div>
      </div>
    </div>
  )
}

export default AdminPage
