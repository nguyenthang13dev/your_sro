import { Button, Card, Col, Form, Input, Row, DatePicker, Select } from 'antd';
import classes from './page.module.css'
import { SearchOutlined } from '@ant-design/icons';
import Flex from '@/components/shared-components/Flex'
import { downloadFileFromBase64 } from '@/utils/fileDownload'
import { NotificationSearch } from '@/interface/notification/notification'
import { notificationService } from '@/services/notification/notification.service'
import { DropdownOptionAntd } from '@/interface/general'

interface SearchProps {
  handleSearch: (values: NotificationSearch) => void
  dropdownUser?: DropdownOptionAntd[]
}
const Search: React.FC<SearchProps> = ({ handleSearch, dropdownUser }) => {
  const [form] = Form.useForm()
  const handleExport = async () => {
    const excelBase64 = await notificationService.exportExcel()
    downloadFileFromBase64(excelBase64.data, 'Danh sách thông báo.xlsx')
  }
  const onSearch = () => {
    form.validateFields().then((values) => {
      handleSearch(values)
    })
  }
  return (
    <>
      <Card className={`${classes.customCardShadow} ${classes.mgButton10}`}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          //onFinish={onSearch}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                key={1}
                label={<strong>Người gửi</strong>}
                name="fromUser"
              >
                <Select
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Chọn người gửi"
                >
                  {dropdownUser &&
                    dropdownUser.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key={1}
                label={<strong>Người nhận</strong>}
                name="toUser"
              >
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  placeholder="Chọn người nhận"
                >
                  {dropdownUser &&
                    dropdownUser.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key={1}
                label={<strong>Từ ngày</strong>}
                name="fromDate"
              >
                <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                key={1}
                label={<strong>Đến ngày</strong>}
                name="toDate"
              >
                <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Flex alignItems="center" justifyContent="center">
            <Button
              type="primary"
              htmlType="button"
              icon={<SearchOutlined />}
              className={classes.mgright5}
              size="small"
              onClick={onSearch}
            >
              Tìm kiếm
            </Button>
            {/* <Button
              onClick={handleExport}
              type="primary"
              icon={<DownloadOutlined />}
              className={`${classes.mgright5} ${classes.colorKetXuat}`}
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
