import { UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Button, Card, Form, Input, Select, Tabs, Upload, message } from 'antd'
import React from 'react'
import {
  CreateBlogDocument,
  CreateQuizDocument,
  UserRole
} from '../generated/graphql'
import { useAuthStore } from '../store/authStore'

const { TabPane } = Tabs
const { TextArea } = Input
const { Option } = Select

interface BlogFormValues {
  title: string
  excerpt: string
  content: string
  category: string
  tags?: string[]
  featuredImage?: File[]
  status: 'draft' | 'published' | 'archived'
}

interface QuizFormValues {
  title: string
  description?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit?: number
  tags?: string[]
  featuredImage?: File[]
  status: 'draft' | 'published' | 'archived'
}

const AdminPage: React.FC = () => {
  const { user } = useAuthStore()
  const [blogForm] = Form.useForm()
  const [quizForm] = Form.useForm()

  const [createBlog, { loading: blogLoading }] = useMutation(CreateBlogDocument)
  const [createQuiz, { loading: quizLoading }] = useMutation(CreateQuizDocument)

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

  const handleBlogSubmit = async (values: BlogFormValues) => {
    try {
      await createBlog({
        variables: {
          input: {
            title: values.title,
            content: values.content,
            excerpt: values.excerpt,
            category: values.category,
            tags: values.tags,
            status: values.status
          }
        }
      })
      message.success('Blog created successfully!')
      blogForm.resetFields()
    } catch (error) {
      message.error('Failed to create blog')
      console.error(error)
    }
  }

  const handleQuizSubmit = async (values: QuizFormValues) => {
    try {
      await createQuiz({
        variables: {
          input: {
            title: values.title,
            description: values.description,
            category: values.category,
            difficulty: values.difficulty,
            timeLimit: values.timeLimit,
            tags: values.tags,
            status: values.status
          },
          questions: [] // For now, empty questions - we'll add question creation later
        }
      })
      message.success('Quiz created successfully!')
      quizForm.resetFields()
    } catch (error) {
      message.error('Failed to create quiz')
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage blogs and quizzes</p>
      </div>

      <Tabs defaultActiveKey="blogs" size="large">
        <TabPane tab="Blogs" key="blogs">
          <Card title="Create New Blog" className="max-w-4xl">
            <Form form={blogForm} layout="vertical" onFinish={handleBlogSubmit}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input placeholder="Blog title" />
              </Form.Item>

              <Form.Item
                name="excerpt"
                label="Excerpt"
                rules={[{ required: true, message: 'Please enter an excerpt' }]}
              >
                <TextArea
                  placeholder="Brief description of the blog"
                  rows={3}
                />
              </Form.Item>

              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: 'Please enter content' }]}
              >
                <TextArea
                  placeholder="Blog content (Markdown supported)"
                  rows={10}
                />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: 'Please select a category' }
                ]}
              >
                <Select placeholder="Select category">
                  <Option value="technology">Technology</Option>
                  <Option value="science">Science</Option>
                  <Option value="education">Education</Option>
                  <Option value="lifestyle">Lifestyle</Option>
                </Select>
              </Form.Item>

              <Form.Item name="tags" label="Tags">
                <Select
                  mode="tags"
                  placeholder="Add tags"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item name="featuredImage" label="Featured Image">
                <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>

              <Form.Item name="status" label="Status" initialValue="draft">
                <Select>
                  <Option value="draft">Draft</Option>
                  <Option value="published">Published</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={blogLoading}
                >
                  Create Blog
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="Quizzes" key="quizzes">
          <Card title="Create New Quiz" className="max-w-4xl">
            <Form form={quizForm} layout="vertical" onFinish={handleQuizSubmit}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input placeholder="Quiz title" />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea placeholder="Quiz description" rows={3} />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: 'Please select a category' }
                ]}
              >
                <Select placeholder="Select category">
                  <Option value="technology">Technology</Option>
                  <Option value="science">Science</Option>
                  <Option value="education">Education</Option>
                  <Option value="lifestyle">Lifestyle</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="difficulty"
                label="Difficulty"
                initialValue="easy"
              >
                <Select>
                  <Option value="easy">Easy</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="hard">Hard</Option>
                </Select>
              </Form.Item>

              <Form.Item name="timeLimit" label="Time Limit (minutes)">
                <Input type="number" placeholder="Optional time limit" />
              </Form.Item>

              <Form.Item name="tags" label="Tags">
                <Select
                  mode="tags"
                  placeholder="Add tags"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item name="featuredImage" label="Featured Image">
                <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>

              <Form.Item name="status" label="Status" initialValue="draft">
                <Select>
                  <Option value="draft">Draft</Option>
                  <Option value="published">Published</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={quizLoading}
                >
                  Create Quiz
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AdminPage
