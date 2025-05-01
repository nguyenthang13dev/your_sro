import Flex from "@/components/shared-components/Flex";
import { searchConfigSilkDataType } from "@/interface/ConfigSilk/ConfigSilk";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, InputNumber, Row } from "antd";
import classes from "./page.module.css";

interface SearchProps {
  onFinish: ((values: searchConfigSilkDataType) => void) | undefined;
}
const Search: React.FC<SearchProps> = ({ onFinish }) => {
 

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
              <Form.Item<searchConfigSilkDataType> label="Mệnh giá" name="totalMount">
                <InputNumber placeholder="Mệnh giá" />
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
           
          </Flex>
        </Form>
      </Card>
    </>
  );
};

export default Search;
