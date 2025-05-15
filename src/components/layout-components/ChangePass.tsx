import { createEditType } from "@/interface/auth/User";
import { Button, Form, Input, Alert, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";

import { setShowMessage, setIsLoading } from "@/store/general/GeneralSlice";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { authService } from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";

interface ChangePassForm extends createEditType {
  UserName: string;
  NewPass1: string;
  ReNewPass1: string;
  NewPass2: string;
  ReNewPass2: string;
}

interface ChangePassProps {
  visible: boolean;
  onClose: () => void;
}

const ChangePass: React.FC<ChangePassProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [form] = Form.useForm();
  const loading = useSelector((state: any) => state.general.isLoading);
  const showMessage = useSelector((state: any) => state.general.showMessage);
  const [message, setMessage] = useState<string>("");

  const hideAuthMessage = () => {
    dispatch(setShowMessage(false));
  };

  const onChangePass = async (changePassForm: ChangePassForm) => {
    dispatch(setIsLoading(true));
    try {
      const data = await authService.changePass({
        userName: changePassForm.UserName,
        newPass1: changePassForm.NewPass1,
        reNewPass1: changePassForm.ReNewPass1,
        newPass2: changePassForm.NewPass2,
        reNewPass2: changePassForm.ReNewPass2,
      });
      if (data != null && data.status) {
        setMessage("Đổi mật khẩu thành công!");
        dispatch(setShowMessage(true));
        setTimeout(() => {
          onClose(); // Đóng modal
          router.push("/auth/login"); // Chuyển hướng về trang đăng nhập
        }, 2000);
      } else {
        setMessage(data.message || "Đổi mật khẩu thất bại, vui lòng thử lại");
        dispatch(setShowMessage(true));
      }
    } catch (err) {
      setMessage("Có lỗi xảy ra, vui lòng thử lại");
      dispatch(setShowMessage(true));
    }
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => hideAuthMessage(), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showMessage]);

  return (
    <Modal
      title="Đổi mật khẩu"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert
          type={message.includes("thành công") ? "success" : "error"}
          showIcon
          message={message}
        />
      </motion.div>

      <Form<ChangePassForm>
        layout="vertical"
        name="change-pass-form"
        form={form}
        onFinish={onChangePass}
      >
        <Form.Item
          name="UserName"
          label="Tài khoản"
          rules={[
            { required: true, message: "Vui lòng nhập tài khoản" },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "Tài khoản chỉ được sử dụng a-z, A-Z, số và dấu _",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="NewPass1"
          label="Mật khẩu số 1 mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "Mật khẩu chỉ được sử dụng a-z, A-Z, số và dấu _",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="ReNewPass1"
          label="Xác nhận mật khẩu số 1 mới"
          dependencies={["NewPass1"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu số 1 mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("NewPass1") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="NewPass2"
          label="Mật khẩu số 2 mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu số 2 mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "Mật khẩu chỉ được sử dụng a-z, A-Z, số và dấu _",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="ReNewPass2"
          label="Xác nhận mật khẩu số 2 mới"
          dependencies={["NewPass2"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu số 2 mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("NewPass2") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đổi mật khẩu
          </Button>
        </Form.Item>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          Quay lại? <Link href="/auth/login">Đăng nhập</Link>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePass;
