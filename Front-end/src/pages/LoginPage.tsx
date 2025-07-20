import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LoginInput, useLoginMutation } from '../generated/graphql'
import { useAuthStore } from '../store/authStore'
import { User } from '../types'

const { Title } = Typography

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
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card>
          <Title
            level={2}
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            Login
          </Title>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input a valid email!'
                }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            {error && (
              <Form.Item>
                <Alert message={error.message} type="error" showIcon />
              </Form.Item>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: '100%' }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
