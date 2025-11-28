import {
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography
} from 'antd'
import { BookOpen } from 'lucide-react'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterInput, useRegisterMutation } from '../generated/graphql'
import { useAuthStore } from '../store/authStore'

const { Title, Text } = Typography

export const SignUpPage: FC = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const [signup, { loading, error }] = useRegisterMutation({
    onCompleted: data => {
      login(data.register.token, data.register.user)
      navigate('/')
    }
  })

  const onFinish = (values: RegisterInput) => {
    signup({ variables: { input: values } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col xs={24} sm={20} md={18} lg={14} xl={12}>
          <Spin spinning={loading} size="large" tip="Creating your account...">
            <Card
              className="shadow-2xl rounded-2xl border-0"
              style={{
                background: 'linear-gradient(to bottom, white, #f8fafc)',
                overflow: 'hidden'
              }}
            >
              {/* Header with Logo */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl shadow-lg">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                </div>
                <Title
                  level={2}
                  className="mb-2"
                  style={{ marginBottom: '8px' }}
                >
                  Join LearnHub Today
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  Create your account and start your learning journey
                </Text>
              </div>

              <Form
                name="signup"
                onFinish={onFinish}
                layout="vertical"
                requiredMark="optional"
                size="large"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your first name!'
                        },
                        {
                          min: 2,
                          message: 'First name must be at least 2 characters'
                        }
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="John"
                        className="rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your last name!'
                        },
                        {
                          min: 2,
                          message: 'Last name must be at least 2 characters'
                        }
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Doe"
                        className="rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                    {
                      min: 3,
                      message: 'Username must be at least 3 characters'
                    },
                    {
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message:
                        'Username can only contain letters, numbers, and underscores'
                    }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="johndoe123"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please input a valid email!'
                    }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="john@example.com"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  ]}
                  extra={
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Password must be at least 6 characters long
                    </Text>
                  }
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Create a strong password"
                    className="rounded-lg"
                  />
                </Form.Item>

                {error && (
                  <Form.Item>
                    <Alert
                      message="Sign Up Failed"
                      description={error.message}
                      type="error"
                      showIcon
                      closable
                    />
                  </Form.Item>
                )}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<UserAddOutlined />}
                    size="large"
                    className="w-full h-12 text-lg font-semibold rounded-lg shadow-lg"
                    style={{
                      background: 'linear-gradient(to right, #9333ea, #2563eb)',
                      border: 'none'
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Form.Item>

                <div className="text-center text-sm text-gray-500 mb-4">
                  By signing up, you agree to our{' '}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </Form>

              <Divider plain>Already have an account?</Divider>

              <div className="text-center">
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: '100%' }}
                >
                  <Link to="/login">
                    <Button
                      size="large"
                      className="w-full rounded-lg font-semibold"
                      style={{ height: '48px' }}
                    >
                      Login to Your Account
                    </Button>
                  </Link>
                </Space>
              </div>
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  )
}
