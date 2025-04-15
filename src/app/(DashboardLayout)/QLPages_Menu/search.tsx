import { Button, Card, Col, Form, FormProps, Input, Row, Select } from 'antd'
import classes from './page.module.css'
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import Flex from '@/components/shared-components/Flex'
import { downloadFileFromBase64 } from '@/utils/fileDownload'
import { QLPageMenuService } from '@/services/QLPages_Menu/QLPages_Menu.service'
import { searchQLPages_MenuDataType } from '@/interface/QLPages_Menu/QLPages_Menu'
import { DropdownOptionAntd, DropdownTreeOptionAntd } from '@/interface/general'
import { useEffect, useState } from 'react'
import { qLPage_ComponentService } from '@/services/QLPage_Component/QLPage_Component.service'
import { MENU } from '@/constants/TypeCompoentConstant'

interface SearchProps {
  pageDropdown: DropdownTreeOptionAntd[]
  onFinish: ((values: searchQLPages_MenuDataType) => void) | undefined
}
const Search: React.FC<SearchProps> = ({ pageDropdown, onFinish }) => {
  const [codeDropdown, setCodeDropdown] = useState<DropdownOptionAntd[]>([])
  const handleExport = async () => {
    const excelBase64 = await QLPageMenuService.exportExcel('QLPages_Menu')
    downloadFileFromBase64(excelBase64.data, 'Danh sách QLPages_Menu.xlsx')
  }
  useEffect(() => {
    qLPage_ComponentService
      .GetDropdownCode(MENU)
      .then((res) => {
        if (res.data) {
          setCodeDropdown(res.data)
        } else {
          console.error(res.message)
        }
      })
      .catch((err) => console.error(err))
  }, [])
  return (
    <>
      <Card className={classes.customCardShadow + classes.mgButton10}>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col md={12}>
              <Form.Item<searchQLPages_MenuDataType> label="Title" name="title">
                <Input />
              </Form.Item>
            </Col>

            <Col md={12}>
              <Form.Item<searchQLPages_MenuDataType> label="Api" name="api">
                <Input />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item<searchQLPages_MenuDataType> label="Page" name="page">
                <Select showSearch optionFilterProp="children" allowClear>
                  {pageDropdown &&
                    pageDropdown.map((item, index) => (
                      <Select.Option key={`tinh${index}`} value={item.value}>
                        {item.title}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item<searchQLPages_MenuDataType> label="Code" name="code">
                <Select showSearch optionFilterProp="children" allowClear>
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
          <Flex alignItems="center" justifyContent="center">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              className={classes.mgright5}
              size="small"
            >
              Tìm kiếm
            </Button>
            {/* <Button
                            onClick={handleExport}
                            type="primary"
                            icon={<DownloadOutlined />}
                            className={classes.mgright5 + classes.colorKetXuat}
                            size="small"
                        >
                            Kết xuất
                        </Button> */}
          </Flex>
        </Form>
      </Card>
    </>
  )
}

export default Search
