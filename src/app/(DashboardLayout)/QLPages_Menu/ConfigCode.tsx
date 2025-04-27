import
  {
    createEditType,
    tableQLPages_MenuDataType,
  } from '@/interface/QLPages_Menu/QLPages_Menu'
import { QLPageMenuService } from '@/services/QLPages_Menu/QLPages_Menu.service'
import { StringBuilder } from '@/utils/string'
import { css } from '@codemirror/lang-css'
import CodeMirror from '@uiw/react-codemirror'
import
  {
    Button,
    Col,
    Flex,
    Form,
    FormProps,
    Modal,
    Row,
    Typography,
  } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
interface Props {
  isOpen: boolean
  data: tableQLPages_MenuDataType
  onClose: () => void //function callback
  onSuccess: () => void
}

const defaultCssCode = ` 
    body {
        font-family: Quick Sans, sans-serif;
        margin: 0;
        padding: 0;
      }
      .navbar {
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        padding: 10px 20px;
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1000;
      }
      .nav-container {
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 0 20px;
      }
      .nav-item {
        position: relative;
        padding: 10px 15px;
        cursor: pointer;
        font-weight: bold;
      }

      .nav-item > a {
         text-decoration: none;
         color: inherit;
      }
      
      .nav-item:hover,
      .nav-item > a:hover {
        color: red;
      }

      .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        min-width: 150px;
        z-index: 1;
      }
      .dropdown a {
        display: block;
        padding: 10px;
        text-decoration: none;
        color: black;
        white-space: nowrap;
      }
      .dropdown a:hover {
        background: #f1f1f1;
      }
      .nav-item:hover .dropdown {
        display: block;
      }
      /* Responsive */
      .menu-toggle {
        display: none;
        font-size: 24px;
        cursor: pointer;
      }
      @media (max-width: 768px) {
        .navbar {
          box-shadow: none;
        }
        .nav-container {
          flex-direction: column;
          align-items: center;
          display: none;
        }
        .nav-container.active {
          display: flex;
        }
        .menu-toggle {
          display: block;
          position: absolute;
          top: 10px;
          left: 20px;
        }
      }
`

const defaultJsCode = `
    <script>
      function toggleMenu() {
        document.querySelector('.nav-container').classList.toggle('active')
      }
    </script>`

const ConfigCode: React.FC<Props> = ({
  isOpen,
  data,
  onClose,
  onSuccess,
}: Props) => {
  const [form] = Form.useForm()
  const [codePreview, setCodePreview] = useState('')

  const buildDefaultHtmlCode = () => {
    if (data) {
      const openingTag = `
       <nav class="navbar">
      <div class="menu-toggle" onclick="toggleMenu()">☰</div>
      <div class="nav-container">
        `
      const endingTag = `
         </div>
    </nav>`
      const result = new StringBuilder()
      result.append(openingTag)

      if (data.children.length > 0) {
        data.children.forEach((menuItem) => {
          result.append(
            `
             <div class="nav-item">
                <a href="${menuItem.slug}">${menuItem.title}</a>
                ${
                  menuItem.children.length > 0
                    ? `
                    <div class="dropdown">
                       ${menuItem.children
                         .map(
                           (child) =>
                             `<a href="${child.slug}">${child.title}</a>\n`
                         )
                         .join('')}
                    </div>`
                    : ''
                }
             </div>
            `
          )
        })
      }
      result.append(endingTag)
      result.append(defaultJsCode)
      return result.toString()
    }
    return ''
  }
  
  const handleGenerateCode = () => {
    const htmlCode = buildDefaultHtmlCode()
    const cssCode = defaultCssCode
    form.setFieldsValue({
      htmlCode: htmlCode,
      cssCode: cssCode,
    })
    const previewContent = `<style>${cssCode}</style>${htmlCode}`
    setCodePreview(previewContent)
    toast.success('Tạo code thành công')
  }

  const handleOnFinish: FormProps<createEditType>['onFinish'] = async (
    formData: any
  ) => {
    try {
      const response = await QLPageMenuService.configCode({
        ...formData,
        id: data.id,
      })
      if (response.status) {
        toast.success('Cấu hình thành công')
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
    if (data) {
      const htmlCode = data.htmlCode || ''
      const cssCode = data.cssCode || ''
      form.setFieldsValue({
        htmlCode: htmlCode,
        cssCode: cssCode,
      })
      const previewContent = `<style>${cssCode}</style>${htmlCode}`
      setCodePreview(previewContent)
    }
  }, [isOpen])

  if (!data) return <></>
  return (
    <Modal
      title={'Cấu hình code'}
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
              label="HTML"
              name="htmlCode"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thông tin này!',
                },
              ]}
            >
              <CodeMirror
                extensions={[css()]}
                maxHeight="500px"
                onChange={(value) => {
                  form.setFieldValue('htmlCode', value)
                  setCodePreview(`
                    <style>${form.getFieldValue('cssCode') ?? ''}</style>
                    ${value ?? ''}`)
                }}
              />
            </Form.Item>
            <Form.Item
              label="CSS"
              name="cssCode"
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
                maxHeight="500px"
                onChange={(value) => {
                  form.setFieldValue('cssCode', value)
                  setCodePreview(`
                    <style>${value ?? ''}</style>
                    ${form.getFieldValue('htmlCode') ?? ''}`)
                }}
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Flex justify="space-between" style={{ marginBottom: '4px' }}>
              <Typography.Text>Preview</Typography.Text>
              <Button
                color="cyan"
                variant="outlined"
                size="small"
                onClick={handleGenerateCode}
              >
                Tạo code tự động
              </Button>
            </Flex>
            <iframe
              sandbox="allow-scripts allow-same-origin"
              srcDoc={codePreview || '<p>Không có nội dung</p>'}
              style={{
                width: '100%',
                height: '100%',
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
export default ConfigCode
