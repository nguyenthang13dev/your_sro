import { Form, Input, Modal, Row, Col, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Notification from '@/interface/notification/notification'
import { notificationService } from '@/services/notification/notification.service'
import { DropdownOptionAntd } from '@/interface/general'
import { onlCompanyInfoService } from "@/services/onlCompanyInfo/onlCompanyInfo.service";

const defaultData = {
  message: '',
  link: '',
  isRead: '',
  type: '',
  itemName: '',
  itemType: '',
  createdDate: '',
  toUser: '',
}

interface Props {
  isOpen: boolean
  data?: Notification
  onClose: () => void
}

const SendEmailForm: React.FC<Props> = ({ isOpen, data, onClose }) => {
  const [form] = Form.useForm()
  const [companyList, setCompanyList] = useState<DropdownOptionAntd[]>([])

  useEffect(() => {
    onlCompanyInfoService
      .GetDropdownCompany()
      .then((res) => {
        setCompanyList(res.data)
      })
      .catch((err) => {
        console.error('Lỗi khi tải danh sách công ty:', err)
      })
  }, [isOpen])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    } else {
      form.resetFields()
    }
  }, [data])

  const handleFinish = async () => {
    try {
      const values = await form.validateFields()
      if (data) {
        const content = `
            <div>
                <h2>Thông báo doanh nghiệp</h2>
                <p><strong>Tiêu đề:</strong> ${data.tieuDe}</p>
                <p><strong>Nội dung:</strong> ${data.noiDung}</p>
            </div>
        `;
        const subject = "Thông báo doanh nghiệp";
        const toAddress = values.nguoiNhan;
        const response = await notificationService.SendEmail(subject, content, toAddress, data.id)
        if (response.status) {
          toast.success("Gửi email thành công");
        } else {
          toast.error("Gửi email thất bại");
        }
      }
      form.resetFields()
      onClose()
    } catch (error) {
      toast.error('Có lỗi xảy ra: ' + error)
    }
  }

  return (
    <Modal
      title={<div style={{ textAlign: 'center' }}>Gửi email</div>}
      open={isOpen}
      onOk={handleFinish}
      onCancel={onClose}
      okText="Gửi"
      cancelText="Đóng"
      width="60%"
    >
      <Form layout="vertical" form={form} autoComplete="off">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={<strong>Doanh ngiệp, tổ chức, cá nhân nhận</strong>}
              name="nguoiNhan"
              rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
            >
              <Select placeholder="Chọn người muốn gửi đến" allowClear>
                {companyList && companyList.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default SendEmailForm
