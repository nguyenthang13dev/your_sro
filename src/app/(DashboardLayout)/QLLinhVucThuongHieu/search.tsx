import { Button, Card, Col, Form, Input, Row, Select, } from "antd";
import classes from "./page.module.css";
import { SearchOutlined } from "@ant-design/icons";
import Flex from "@/components/shared-components/Flex";
import { searchLinhVucThuongHieuData } from "@/interface/linhVucThuongHieu/linhVucThuongHieu";
import { useForm } from "antd/es/form/Form";

interface SearchProps {
    onFinish: ((values: searchLinhVucThuongHieuData) => void) | undefined;
    pageIndex: number;
    pageSize: number;
}
const Search: React.FC<SearchProps> = ({ onFinish }) => {
    const [form] = useForm();

    return <>
        <Card className={`${classes.customCardShadow} ${classes.mgButton10}`} >
            <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item<searchLinhVucThuongHieuData> label="Mã lĩnh vực" name="maLinhVuc">
                            <Input placeholder="Mã lĩnh vực" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<searchLinhVucThuongHieuData> label="Tên lĩnh vực" name="tenLinhVuc">
                            <Input placeholder="Tên lĩnh vực" />
                        </Form.Item>
                    </Col>
                </Row>

                <Flex alignItems="center" justifyContent="center">
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />} className={classes.mgright5} size="small">
                        Tìm kiếm
                    </Button>
                </Flex>
            </Form>
        </Card >
    </>
}


export default Search