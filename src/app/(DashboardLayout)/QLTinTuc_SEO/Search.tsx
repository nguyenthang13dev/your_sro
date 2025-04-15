"use client";
import Flex from "@/components/shared-components/Flex";
import { downloadFileFromBase64 } from "@/utils/fileDownload";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import classes from "./page.module.css";
import { searchQLTinTuc_TagData } from "@/interface/QLTinTuc_Tag/QLTinTuc_Tag";
import { qLTinTuc_TagService } from "@/services/QLTinTuc_Tag/QLTinTuc_Tag.service";
interface SearchProps {
    handleSearch: (values: searchQLTinTuc_TagData) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearch }) => {
    const [form] = Form.useForm();
    const handleExport = async () => {
        const excelBase64 = await qLTinTuc_TagService.exportExcel();
        downloadFileFromBase64(excelBase64.data, "Danh sách tag.xlsx");
    };
    const onSearch = () => {
        form.validateFields().then((values) => {
            handleSearch(values);
        });
    };
    return (
        <>
            <Card
                className={`${classes.customCardShadow} ${classes.mgButton10}`}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    //onFinish={onSearch}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                key={1}
                                label={<strong>Tên tag</strong>}
                                name="name"
                            >
                                <Input placeholder="Nhập tên tag" />
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
                        <Button
                            onClick={handleExport}
                            type="primary"
                            icon={<DownloadOutlined />}
                            className={`${classes.mgright5} ${classes.colorKetXuat}`}
                            size="small"
                        >
                            Kết xuất
                        </Button>
                    </Flex>
                </Form>
            </Card>
        </>
    );
};
export default Search;
