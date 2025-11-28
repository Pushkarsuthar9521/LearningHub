import {
  BookOutlined,
  EyeOutlined,
  FileTextOutlined,
  TrophyOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Card, Col, Row, Spin, Statistic } from 'antd'
import React from 'react'
import {
  Blog,
  BlogStatus,
  GetBlogsDocument,
  GetQuizzesDocument,
  Quiz,
  QuizStatus
} from '../../generated/graphql'

const AdminDashboard: React.FC = () => {
  const { data: blogsData, loading: blogsLoading } = useQuery(GetBlogsDocument)
  const { data: quizzesData, loading: quizzesLoading } =
    useQuery(GetQuizzesDocument)

  const loading = blogsLoading || quizzesLoading

  const totalBlogs = blogsData?.getBlogs?.length || 0
  const publishedBlogs =
    blogsData?.getBlogs?.filter((b: Blog) => b.status === BlogStatus.Published)
      .length || 0
  const totalViews =
    blogsData?.getBlogs?.reduce(
      (sum: number, b: Blog) => sum + (b.viewCount || 0),
      0
    ) || 0

  const totalQuizzes = quizzesData?.getQuizzes?.length || 0
  const publishedQuizzes =
    quizzesData?.getQuizzes?.filter(
      (q: Quiz) => q.status === QuizStatus.Published
    ).length || 0
  const totalAttempts =
    quizzesData?.getQuizzes?.reduce(
      (sum: number, q: Quiz) => sum + (q.totalAttempts || 0),
      0
    ) || 0

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your content and statistics</p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Total Blogs"
              value={totalBlogs}
              prefix={<FileTextOutlined className="text-blue-600" />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Published Blogs"
              value={publishedBlogs}
              prefix={<BookOutlined className="text-green-600" />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Total Views"
              value={totalViews}
              prefix={<EyeOutlined className="text-purple-600" />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Total Quizzes"
              value={totalQuizzes}
              prefix={<TrophyOutlined className="text-orange-600" />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Published Quizzes"
              value={publishedQuizzes}
              prefix={<TrophyOutlined className="text-cyan-600" />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Quiz Attempts"
              value={totalAttempts}
              prefix={<UserOutlined className="text-red-600" />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Blogs" className="shadow-sm">
            <div className="space-y-3">
              {blogsData?.getBlogs?.slice(0, 5).map((blog: Blog) => (
                <div
                  key={blog.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">
                      {blog.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    {blog.status === BlogStatus.Published ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                        Draft
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {totalBlogs === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No blogs created yet
                </p>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Recent Quizzes" className="shadow-sm">
            <div className="space-y-3">
              {quizzesData?.getQuizzes?.slice(0, 5).map((quiz: Quiz) => (
                <div
                  key={quiz.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">
                      {quiz.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {quiz.totalQuestions || 0} questions •{' '}
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4">
                    {quiz.status === QuizStatus.Published ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                        Draft
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {totalQuizzes === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No quizzes created yet
                </p>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard
