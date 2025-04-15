import React from "react";
import { Drawer, Descriptions } from "antd";
import { QLTinTuc_TagType } from "@/interface/QLTinTuc_Tag/QLTinTuc_Tag";

interface DetailDrawerProps {
    isOpen: boolean;
    data?: QLTinTuc_TagType;
    onClose: () => void;
}

const DrawerChiTiet: React.FC<DetailDrawerProps> = ({
    isOpen,
    data,
    onClose,
}) => {
    return (
        <Drawer
            title="Chi Tiết Chuyên Mục"
            placement="right"
            onClose={onClose}
            open={isOpen}
            width={500}
        >
            <Descriptions column={1} bordered size="middle">
                <Descriptions.Item label="Tên tag">
                    {data?.name || "Chưa có"}
                </Descriptions.Item>
                <Descriptions.Item label="Có publish">
                    {data?.isShow || <p></p>}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
};

export default DrawerChiTiet;
