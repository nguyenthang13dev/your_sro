import { Button, Card, Col, Form, FormProps, Input, Row } from "antd";
import classes from "./import.module.css";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Flex from "@/components/shared-components/Flex";
import { searchQLPage_ComponentDataType } from "@/interface/QLPage_Component/QLPage_Component";
import { qLPage_ComponentService } from "@/services/QLPage_Component/QLPage_Component.service";
import { downloadFileFromBase64 } from "@/utils/fileDownload";

interface SearchProps {
    onFinish: ((values: searchQLPage_ComponentDataType) => void) | undefined;
}
const Search: React.FC<SearchProps> = ({ onFinish }) => {
    const handleExport = async () => {
        const excelBase64 = await qLPage_ComponentService.exportExcel();
        downloadFileFromBase64(
            excelBase64.data,
            "Danh sách QLPage_Component.xlsx",
        );
    };

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
                    <Row gutter={24}></Row>
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
                        <Button
                            onClick={handleExport}
                            type="primary"
                            icon={<DownloadOutlined />}
                            className={classes.mgright5 + classes.colorKetXuat}
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
