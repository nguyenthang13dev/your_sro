
import React from "react";
import { Drawer, Modal } from "antd";
import { tableLuongXuLyDataType } from "@/interface/LuongXuLy/LuongXuLy";

interface LuongXuLyViewProps {
    luongXuLy?: tableLuongXuLyDataType | null;
    isOpen: boolean;
    onClose: () => void;
}

const LuongXuLyDetail: React.FC<LuongXuLyViewProps> = ({ luongXuLy, isOpen, onClose }) => {
    return (
        <Modal
            title="Thông tin chi tiết"
            width="60%"
            visible={isOpen}
            onCancel={onClose}
            footer={null}
        >

            <div>
                <h6 className="text-muted text-uppercase mb-3">Thông tin chung</h6>
                <div style={{ flex: 1, padding: '10px' }}>
                    <p><span className=" text-dark">Tên luồng xử lý: {luongXuLy?.tenLuongXuLy}</span></p>
                </div>
            </div>
        </Modal>
    );
};

export default LuongXuLyDetail;

