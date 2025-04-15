import { Button, Card, Col, Form, Input, Row, Select, } from "antd";
import classes from "./page.module.css";
import { SearchOutlined } from "@ant-design/icons";
import Flex from "@/components/shared-components/Flex";
import { searchTuKhoaData } from "@/interface/tuKhoa/tuKhoa";
import { useForm } from "antd/es/form/Form";
import { DropdownOptionAntd } from "@/interface/general";

interface SearchProps {
    onFinish: ((values: searchTuKhoaData) => void) | undefined;
    pageIndex: number;
    pageSize: number;
    dropdown: DropdownOptionAntd[];
}
const Search: React.FC<SearchProps> = ({ onFinish, dropdown }) => {
    const [form] = useForm();
    const newDropdown = [
        { label: 'Tất cả', value: '' },
        ...dropdown
    ];

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
                        <Form.Item<searchTuKhoaData> label="Tên từ khóa" name="tenTuKhoa">
                            <Input placeholder="Tên từ khóa" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<searchTuKhoaData> label="Loại từ khóa" name="loaiTuKhoa">
                            <Select placeholder="Chọn loại từ khóa" options={newDropdown} />
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