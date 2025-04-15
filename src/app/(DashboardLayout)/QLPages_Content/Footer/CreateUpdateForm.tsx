import {
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CodeMirror from '@uiw/react-codemirror'
import { css } from '@codemirror/lang-css'
import { Footer } from '@/interface/footer/footer'
import { footerService } from '@/services/Footer/footer.service'
import { qLPage_ComponentService } from '@/services/QLPage_Component/QLPage_Component.service'
import { DropdownOptionAntd } from '@/interface/general'
import { FOOTER } from '@/constants/TypeCompoentConstant'
interface Props {
  isOpen: boolean
  data: Footer
  onClose: () => void //function callback
  onSuccess: () => void
}

const CreateUploadForm: React.FC<Props> = ({
  isOpen,
  data,
  onClose,
  onSuccess,
}: Props) => {
  const [form] = Form.useForm()
  const [previewCode, setPreviewCode] = useState('')
  const [codeDropdown, setCodeDropdown] = useState<DropdownOptionAntd[]>([])

  const handleOnFinish: FormProps['onFinish'] = async (formData: any) => {
    try {
      let isCreate = true

      if (data && data.id) {
        isCreate = false
        formData = { ...formData, id: data.id }
      }
      const response = isCreate
        ? await footerService.Create(formData)
        : await footerService.Update(formData)
      if (response.status) {
        toast.success('Lưu thành công')
        form.resetFields()
        onSuccess()
        onClose()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra: ' + error)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  useEffect(() => {
    console.log(data)
    if (data) {
      const htmlCode = data.html || ''
      const cssCode = data.css || ''
      form.setFieldsValue(data)
      const previewContent = `<style>${cssCode}</style>${htmlCode}`
      setPreviewCode(previewContent)
    } else {
      form.resetFields()
      setPreviewCode('')
    }
    qLPage_ComponentService
      .GetDropdownCode(FOOTER)
      .then((res) => {
        if (res.data) {
          setCodeDropdown(res.data)
        } else {
          console.error(res.message)
        }
      })
      .catch((err) => console.error(err))
  }, [isOpen, data])

  return (
    <Modal
      title={'Cấu hình footer'}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={1600}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ marginBottom: '18px' }}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Row gutter={18}>
          <Col span={10}>
            <Form.Item
              label="Tên kiểu footer"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thông tin này!',
                },
              ]}
            >
              <Input placeholder={'Nhập tên kiểu footer'} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn thông tin này!',
                },
              ]}
            >
              <Select showSearch optionFilterProp="children">
                {codeDropdown &&
                  codeDropdown.map((item, index) => (
                    <Select.Option key={`tinh${index}`} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={10}>
            <Form.Item
              label="HTML"
              name="html"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thông tin này!',
                },
              ]}
            >
              <CodeMirror
                extensions={[css()]}
                height="270px"
                onChange={(value) => {
                  form.setFieldValue('html', value)
                  setPreviewCode(`
                    <style>${form.getFieldValue('css') ?? ''}</style>
                    ${value ?? ''}`)
                }}
              />
            </Form.Item>
            <Form.Item
              label="CSS"
              name="css"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thông tin này!',
                },
              ]}
            >
              <CodeMirror
                aria-multiline
                extensions={[css()]}
                height="270px"
                onChange={(value) => {
                  form.setFieldValue('css', value)
                  setPreviewCode(`
                    <style>${value ?? ''}</style>
                    ${form.getFieldValue('html') ?? ''}`)
                }}
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Typography.Text>Preview</Typography.Text>
            <iframe
              sandbox="allow-scripts allow-same-origin"
              srcDoc={previewCode || '<p>Không có nội dung</p>'}
              style={{
                width: '100%',
                height: '95%',
                border: '1px solid #ccc',
                borderRadius: '10px',
              }}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
export default CreateUploadForm
