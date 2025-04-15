import React from 'react'
import { Card, Col, Drawer, Modal, Row } from 'antd'
import { tableQLPages_MenuDataType } from '@/interface/QLPages_Menu/QLPages_Menu'

interface QLPage_MenutViewProps {
  isOpen: boolean
  qlPageMenu: tableQLPages_MenuDataType
  onClose: () => void
}

const QLPageMenuDetail: React.FC<QLPage_MenutViewProps> = ({
  qlPageMenu,
  isOpen,
  onClose,
}) => {
  if (!qlPageMenu) return <></>
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width={600}
      title="Thông tin chi tiết"
      footer={[]}
    >
      <Row gutter={[16, 16]}>
        {/* Cột bên trái (Nhãn) */}
        <Col span={8}>
          <p>
            <strong>Tiêu đề:</strong>
          </p>
          <p>
            <strong>Trang:</strong>
          </p>
          <p>
            <strong>Slug:</strong>
          </p>

          <p>
            <strong>API:</strong>
          </p>
          <p>
            <strong>Key Slug:</strong>
          </p>
          <p>
            <strong>Param API:</strong>
          </p>
        </Col>

        {/* Cột bên phải (Giá trị từ props) */}
        <Col span={16}>
          <p>{qlPageMenu.title}</p>
          <p>{qlPageMenu.page}</p>
          <p>{qlPageMenu.slug}</p>
          <p>{qlPageMenu.api}</p>
          <p>{qlPageMenu.keySlug}</p>
          <p>{qlPageMenu.paramsApi}</p>
        </Col>
      </Row>
    </Modal>
  )
}

export default QLPageMenuDetail
