import { Button, Card, Col, Form, Input, Row, Select, } from "antd";
import classes from "./page.module.css";
import { SearchOutlined } from "@ant-design/icons";
import Flex from "@/components/shared-components/Flex";
import { searchQLTinTucData } from "@/interface/qlTinTuc/qlTinTuc";
import { useForm } from "antd/es/form/Form";
import { DropdownOptionAntd } from "@/interface/general";
const { Option } = Select;
interface SearchProps {
    onFinish: ((values: searchQLTinTucData) => void) | undefined;
    pageIndex: number;
    pageSize: number;
    dropdown: DropdownOptionAntd[];
}
const Search: React.FC<SearchProps> = ({ onFinish, dropdown }) => {
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
                        <Form.Item<searchQLTinTucData> label="Tiêu đề" name="title">
                            <Input placeholder="Tiêu đề" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<searchQLTinTucData> label="Từ khóa" name="keyWord">
                            <Input placeholder="Từ khóa" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item<searchQLTinTucData> label="Trạng thái" name="status">
                            <Select placeholder="Chọn trạng thái" options={dropdown} allowClear/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<searchQLTinTucData> label="Nổi bật" name="isHot">
                        <Select placeholder="Chọn trạng thái" allowClear>
                            <Option value={true}>Nổi bật</Option>
                            <Option value={false}>Không nổi bật</Option>
                            </Select>
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