import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterInput, useRegisterMutation } from '../generated/graphql'
import { useAuthStore } from '../store/authStore'

const { Title } = Typography

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
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card>
          <Title
            level={2}
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            Create an account
          </Title>
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: 'Please input your first name!' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: 'Please input your last name!' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
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
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Link to="/login">Already have an account? Log in</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
