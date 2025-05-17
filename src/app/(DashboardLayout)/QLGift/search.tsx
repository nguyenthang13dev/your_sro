import Flex from "@/components/shared-components/Flex";
import
  {
    searchGiftCode
  } from "@/interface/GiftCode/GiftCode";
import { userService } from "@/services/user/user.service";
import { downloadFileFromBase64 } from "@/utils/fileDownload";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import classes from "./page.module.css";

interface SearchProps {
  onFinish: ((values: searchGiftCode) => void) | undefined;
}
const Search: React.FC<SearchProps> = ({ onFinish }) => {
  const handleExport = async () => {
    const excelBase64 = await userService.exportExcel();
    downloadFileFromBase64(excelBase64.data, "Danh sách người dùng.xlsx");
  };

  return (
    <>
      <Card className={`${classes.customCardShadow} ${classes.mgButton10}`}>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24} justify={"center"}>
            <Col span={8}>
              <Form.Item<searchGiftCode> label="Mã gift" name="code">
                <Input placeholder="Mã gift code" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<searchGiftCode> label="Tên sự kiện" name="name">
                <Input placeholder="Tên sự kiện" />
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
              className={`${classes.mgright5} ${classes.colorKetXuat}`}
              size="small"
            >
              Kết xuất
            </Button> */}
          </Flex>
        </Form>
      </Card>
    </>
  );
};

export default Search;
