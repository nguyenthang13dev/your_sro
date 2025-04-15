import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Alert, Row, Col } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '@/store/store'
import { useSelector } from '@/store/hooks'
import { setIsLoading, setShowMessage } from '@/store/general/GeneralSlice'
import { authService } from '@/services/auth/auth.service'
import { LoginType } from '@/interface/auth/User'
import { setLogin } from '@/store/auth/AuthSlice'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const route = useRouter()
  const [form] = Form.useForm()
  const loading = useSelector((state) => state.general.isLoading)
  const showMessage = useSelector((state) => state.general.showMessage)
  const [message, setMessage] = useState<string>('')

  const hideAuthMessage = () => {
    dispatch(setShowMessage(false))
  }
  const onLogin = async (loginForm: LoginType) => {
    dispatch(setIsLoading(true))
    try {
      const data = await authService.login(loginForm);
      if (data != null && data.status) {
        dispatch(setLogin(data))
        route.push('/dashboard')
      } else {
        setMessage(data.message || 'Tài khoản hoặc mật khẩu không đúng')
        dispatch(setShowMessage(true))
      }
      dispatch(setIsLoading(false))
    } catch (err) {
      setMessage('Tài khoản hoặc mật khẩu không đúng')
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => hideAuthMessage(), 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message} />
      </motion.div>
      <Form<LoginType>
        layout="vertical"
        name="login-form"
        form={form}
        onFinish={onLogin}
      >
        <Form.Item
          name="username"
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tài khoản đăng nhập',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item>
              <Button style={{ backgroundColor: "#6c757d", borderColor: "#6c757d", color: "white" }} block onClick={() => route.push("/auth/register")}>
                Đăng ký
              </Button>
            </Form.Item>
          </Col> */}
        </Row>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
            Bạn chưa có tài khoản? <Link href="/auth/register">Đăng ký</Link>
        </div>

      </Form>
    </>
  )
}

export default LoginForm
