import { Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { qlTinTucService } from "@/services/qlTinTuc/qlTinTuc.service";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ThongKeThongTin: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            fetchStatistics();
        }
    }, [isOpen]);

    const fetchStatistics = async () => {
        setLoading(true);
        try {
            const response = await qlTinTucService.getStatistics();

            if (response && response.data) {
                const formattedData = [
                    {
                        Year: response.data.currentYear,
                        Month: response.data.currentMonth,
                        Count: response.data.total,
                    },
                ];
                setData(formattedData);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thống kê:", error);
        }
        setLoading(false);
    };

    return (
        <Modal
            title="Thống kê thông tin"
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={"50%"}
        >
            <Table
                dataSource={data}
                rowKey={(record) => `${record.Year}-${record.Month}`}
                loading={loading}
                pagination={false} // Nếu bạn không muốn phân trang
            >
                <Table.Column
                    title="Tổng số thông báo"
                    render={(text, record) => record.Count}
                    align="center"
                />
                <Table.Column
                    title="Số thông báo đã nhập trong năm"
                    render={(text, record) => record.Year}
                    align="center"
                />
                <Table.Column
                    title="Số thông báo đã nhập trong tháng"
                    render={(text, record) => record.Month}
                    align="center"
                />
            </Table>
        </Modal>
    );
};

export default ThongKeThongTin;
