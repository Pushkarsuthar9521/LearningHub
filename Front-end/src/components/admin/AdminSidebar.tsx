import {
  BookOutlined,
  DashboardOutlined,
  FileTextOutlined,
  PieChartOutlined,
  SettingOutlined,
  TrophyOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'

interface AdminSidebarProps {
  selectedKey: string
  onSelect: (key: string) => void
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  selectedKey,
  onSelect
}) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard'
    },
    {
      key: 'blogs',
      icon: <FileTextOutlined />,
      label: 'Blogs',
      children: [
        {
          key: 'create-blog',
          label: 'Create Blog'
        },
        {
          key: 'manage-blogs',
          label: 'Manage Blogs'
        }
      ]
    },
    {
      key: 'quizzes',
      icon: <TrophyOutlined />,
      label: 'Quizzes',
      children: [
        {
          key: 'create-quiz',
          label: 'Create Quiz'
        },
        {
          key: 'manage-quizzes',
          label: 'Manage Quizzes'
        }
      ]
    },
    {
      key: 'analytics',
      icon: <PieChartOutlined />,
      label: 'Analytics'
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users'
    },
    {
      key: 'categories',
      icon: <BookOutlined />,
      label: 'Categories'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings'
    }
  ]

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your content</p>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['blogs', 'quizzes']}
        className="border-0"
        items={menuItems}
        onSelect={({ key }) => onSelect(key)}
      />
    </div>
  )
}

export default AdminSidebar
