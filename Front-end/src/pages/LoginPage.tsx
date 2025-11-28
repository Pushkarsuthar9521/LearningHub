import { LockOutlined, LoginOutlined, MailOutlined } from '@ant-design/icons'
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
import { Link, useNavigate } from 'react-router-dom'
import { LoginInput, useLoginMutation } from '../generated/graphql'
import { useAuthStore } from '../store/authStore'
import { User } from '../types'

const { Title, Text } = Typography

export function LoginPage() {
  const navigate = useNavigate()
  const loginAction = useAuthStore(state => state.login)

  const [login, { loading, error }] = useLoginMutation({
    onCompleted: data => {
      if (data.login?.token && data.login.user) {
        // Manually construct the User object to ensure it matches our core type
        const user: User = {
          id: data.login.user.id,
          email: data.login.user.email,
          username: data.login.user.username
        }
        loginAction(data.login.token, user)
        navigate('/')
      }
    },
    onError: err => {
      console.error('Login failed:', err)
    }
  })

  const onFinish = (values: LoginInput) => {
    login({ variables: { input: values } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Spin spinning={loading} size="large" tip="Logging you in...">
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
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                </div>
                <Title
                  level={2}
                  className="mb-2"
                  style={{ marginBottom: '8px' }}
                >
                  Welcome Back!
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  Login to continue your learning journey
                </Text>
              </div>

              <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                requiredMark="optional"
                size="large"
              >
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
                    placeholder="Enter your email"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="Enter your password"
                    className="rounded-lg"
                  />
                </Form.Item>

                <div className="flex justify-between items-center mb-6">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    {/* <Checkbox>Remember me</Checkbox> */}
                  </Form.Item>
                  <Link
                    to="/forgot-password"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <Form.Item>
                    <Alert
                      message="Login Failed"
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
                    icon={<LoginOutlined />}
                    size="large"
                    className="w-full h-12 text-lg font-semibold rounded-lg shadow-lg"
                    style={{
                      background: 'linear-gradient(to right, #2563eb, #9333ea)',
                      border: 'none'
                    }}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Form.Item>
              </Form>

              <Divider plain>Or</Divider>

              <div className="text-center">
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: '100%' }}
                >
                  <Text type="secondary">
                    Don't have an account?{' '}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Sign up for free
                    </Link>
                  </Text>
                </Space>
              </div>
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  )
}
