import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { tableQLTinTucDataType } from '@/interface/qlTinTuc/qlTinTuc'
import { qlTinTucService } from '@/services/qlTinTuc/qlTinTuc.service'

interface Props {
  isOpen: boolean
  data: tableQLTinTucDataType
  onClose: () => void
  onSucces: () => void
}

const ConfigReaction: React.FC<Props> = ({
  isOpen,
  data,
  onClose,
  onSucces,
}: Props) => {
  const [form] = Form.useForm()
  const validatePositiveInteger = (_: any, value: string) => {
    if (!value || /^\d+$/.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('Vui lòng nhập số nguyên dương!'))
  }
  const handleFinish = async () => {
    let fieldValues = await form.validateFields()
    fieldValues = {
      ...fieldValues,
      tinTucId: data.id,
    }
    try {
      const response = await qlTinTucService.configReaction(fieldValues)
      if (response.status) {
        toast.success('Chỉnh sửa thành công')
      } else {
        toast.error(response.message)
      }
      form.resetFields()
      onSucces()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  useEffect(() => {
    if (data && data.reactions) {
      form.setFieldsValue(data.reactions)
    }
  }, [data])
  if (!data) return <></>
  return (
    <Modal
      title={<div style={{ textAlign: 'center' }}>Cấu hình reaction</div>}
      open={isOpen}
      onOk={() => handleFinish()}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Đóng"
      width={'30%'}
    >
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: 1000 }}
        autoComplete="off"
      >
        <Form.Item
          label={<strong>Lượt like</strong>}
          name="like"
          rules={[{ validator: validatePositiveInteger }]}
        >
          <Input
            type="number"
           
          />
        </Form.Item>

        <Form.Item
          label={<strong>Lượt bình luận</strong>}
          name="comment"
          rules={[{ validator: validatePositiveInteger }]}
        >
          <Input
            type="number"
            
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ConfigReaction
