import GioiTinhConstant from '@/constants/GioiTinhConstant'
import { createEditType } from '@/interface/auth/User'
import { authService } from '@/services/auth/auth.service'
import { setIsLoading, setShowMessage } from '@/store/general/GeneralSlice'
import { useSelector } from '@/store/hooks'
import { AppDispatch } from '@/store/store'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input } from 'antd'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const route = useRouter()
  const [form] = Form.useForm()
  const loading = useSelector((state) => state.general.isLoading)
  const showMessage = useSelector((state) => state.general.showMessage)
  const [message, setMessage] = useState<string>('')
  const gioiTinhOptions = GioiTinhConstant.getDropdownList()

  const hideAuthMessage = () => {
    dispatch(setShowMessage(false))
  }

  const onRegister = async (registerForm: createEditType) => {
    dispatch(setIsLoading(true))
    try {
      const data = await authService.register(registerForm)
      if (data != null && data.status) {
        route.push('/auth/login') // Chuyển hướng về trang đăng nhập
      } else {
        setMessage(data.message || 'Đăng ký thất bại, vui lòng thử lại')
        dispatch(setShowMessage(true))
      }
    } catch (err) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại')
      dispatch(setShowMessage(true))
    }
    dispatch(setIsLoading(false))
  }

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => hideAuthMessage(), 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [showMessage])

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
      
      <Form<createEditType>
        layout="vertical"
        name="register-form"
        form={form}
        onFinish={onRegister}
      >

        <Form.Item
          name="UserName"
          label="Tài khoản"
         rules={[
    { required: true, message: 'Vui lòng nhập tài khoản' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: 'Tài khoản chỉ được sử dụng a-z, A-Z, số và dấu _' }
  ]}
        >
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="pass1"
          label="Mật khẩu số 1"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
           { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: 'Mật khẩu chỉ được sử dụng a-z, A-Z, số và dấu _' },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="repass1"
          label="Xác nhận mật khẩu 1"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu 1' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('pass1') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu không khớp'))
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>



         <Form.Item
          name="pass2"
          label="Mật khẩu số 2"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu 2' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="repass2"
          label="Xác nhận mật khẩu 2"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu 2' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('pass2') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Mật khẩu không khớp 2'))
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        
            <Form.Item
          name="PhoneNumber"
          label="Số diện thoại"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
          ]}
        >
          <Input prefix={<PhoneOutlined className="text-primary" />} />
        </Form.Item>


        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng ký
          </Button>
        </Form.Item>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
            Bạn đã có tài khoản? <Link href="/auth/login">Đăng nhập</Link>
        </div>
      </Form>
    </>
  )
}

export default RegisterForm
