import React from "react";
import { Drawer, Divider, Tag, Modal, Button, Row, Col } from "antd";
import Notification from "@/interface/notification/notification";
import Link from 'next/link'
import { DropdownOptionAntd } from '@/interface/general'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const StaticFileUrl = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL

interface NotificationViewProps {
    isOpen: boolean
    data : Notification
    dropdownUser?: DropdownOptionAntd[]
    onClose: () => void
}

const notificationDetail: React.FC<NotificationViewProps> = ({ isOpen, 
    data,
    dropdownUser,
    onClose }) => {
    return (
        <Modal
            title={`Chi tiết ${data?.tieuDe}`}
            onClose={() => {
            onClose()
            }}
            onCancel={() => onClose()}
            footer={[
            <Button key="cancel" onClick={onClose}>
                Đóng
            </Button>,
            ]}
            open={isOpen}
            width="50%"
        >
            
            <Row gutter={[16, 24]}>
            <Col span={8} style={{ fontWeight: 'bold' }}>
                Tiêu đề
            </Col>
            <Col span={16}>{data?.tieuDe}</Col>
            <Col span={8} style={{ fontWeight: 'bold' }}>
                Loại thông báo
            </Col>
            <Col span={16}>{data?.loaiThongBao}</Col>

            <Col span={8} style={{ fontWeight: 'bold' }}>
                Người tạo
            </Col>
            <Col span={16}>{data?.createdBy}</Col>
    
            <Col span={8} style={{ fontWeight: 'bold' }}>
                Ngày tạo
            </Col>
            <Col span={16}>{data?.createdDate ? new Date(data.createdDate).toLocaleDateString("vi-VN") : ""}</Col>

            <Col span={8} style={{ fontWeight: 'bold' }}>
                Tài liệu đính kèm
            </Col>
            <Col span={16}>
                {data?.fileDinhKem ? (
                    <a href={`${StaticFileUrl}/${data?.fileTaiLieu?.url}`} target="_blank" rel="noopener noreferrer">
                        tài liệu đính kèm
                    </a>
                ): (
                    <span>Không có tài liệu</span>)}
            </Col>

            <Col span={8} style={{ fontWeight: 'bold' }}>
                Nội dung
            </Col>
            <Col span={16}>{<ReactQuill readOnly value={data?.noiDung} theme="snow" />}</Col>
            </Row>
        </Modal>
    );
};

export default notificationDetail;
