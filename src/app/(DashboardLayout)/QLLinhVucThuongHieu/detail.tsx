import React from 'react'
import { Button, Col, Modal, Row } from 'antd'
import { tableLinhVucThuongHieuDataType } from '@/interface/linhVucThuongHieu/linhVucThuongHieu'

interface LinhVucThuongHieuViewProps {
  LinhVucThuongHieu?: tableLinhVucThuongHieuDataType | null
  isOpen: boolean
  onClose: () => void
}

const LinhVucThuongHieuDetail: React.FC<LinhVucThuongHieuViewProps> = ({
  LinhVucThuongHieu,
  isOpen,
  onClose,
}) => {
  if (!LinhVucThuongHieu) return <></>
  return (
    <Modal
      title={`Chi tiết ${LinhVucThuongHieu?.tenLinhVuc}`}
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
      width={600}
    >
      <Row gutter={[16, 24]}>
        <Col span={8} style={{ fontWeight: 'bold' }}>
          Tên lĩnh vực:
        </Col>
        <Col span={16}>{LinhVucThuongHieu.tenLinhVuc}</Col>
        <Col span={8} style={{ fontWeight: 'bold' }}>
          Mã lĩnh vực:
        </Col>
        <Col span={16}>{LinhVucThuongHieu.maLinhVuc}</Col>

        <Col span={8} style={{ fontWeight: 'bold' }}>
          Mô tả:
        </Col>
        <Col span={16}>{LinhVucThuongHieu.moTa}</Col>
      </Row>
    </Modal>
  )
}

export default LinhVucThuongHieuDetail
