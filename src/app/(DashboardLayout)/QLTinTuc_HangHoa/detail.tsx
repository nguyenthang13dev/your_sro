'use client'
import React from 'react'
import { Drawer, Divider, Dropdown, Row, Col, Image, Tag } from 'antd'
import { tableQLTinTucDataType } from '@/interface/qlTinTuc/qlTinTuc'
import { FireOutlined, LockOutlined } from '@ant-design/icons'
import LoaiTinTucConstant from '@/constants/LoaiTinTucConstant'
import { DropdownOptionAntd } from '@/interface/general'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) // import ReactQuill
import formatDate from '@/utils/formatDate'

const StaticFileUrl = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL

interface QLTInTucViewProps {
  qltintuc?: tableQLTinTucDataType | null
  isOpen: boolean
  onClose: () => void
  dropdown: DropdownOptionAntd[]
}

const QLTinTucDetail: React.FC<QLTInTucViewProps> = ({
  qltintuc,
  isOpen,
  onClose,
  dropdown,
}) => {
  if (!qltintuc) return <></>
  return (
    <Drawer
      title={`Thông tin ${
        LoaiTinTucConstant.getDisplayName(qltintuc?.loaiTin ?? '') || ''
      }`}
      width="60%"
      placement="right"
      onClose={onClose}
      closable={true}
      open={isOpen}
    >
      <Row gutter={12}>
        <Col span={24} style={{ textAlign: 'center' }}>
          {
            <Image
              style={{ maxWidth: '150px', borderRadius: '10px' }}
              className="img-fluid"
              src={`${StaticFileUrl}${qltintuc.thumbnail}`}
              fallback="/img/others/notfoundimage.png"
              preview={true}
            />
          }
        </Col>
      </Row>
      {qltintuc.isHot ? (
        <Row>
          <Tag color="volcano">
            <FireOutlined /> Tin nổi bật
          </Tag>
        </Row>
      ) : (
        <></>
      )}

      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Tiêu đề: </strong>
        </Col>
        <Col span={20}>{qltintuc.title}</Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Slug: </strong>
        </Col>
        <Col span={20}>{qltintuc.slugTitle}</Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Chuyên mục tin: </strong>
        </Col>
        <Col span={20}>
          {qltintuc.chuyenMucNames && qltintuc.chuyenMucNames.length > 0 ? (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {qltintuc.chuyenMucNames.map((cm) => (
                <Tag key={cm} color="geekblue">{cm}</Tag>
              ))}
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Tag tin bài: </strong>
        </Col>
        <Col span={20}>
          {qltintuc.tagNames && qltintuc.tagNames.length > 0 ? (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {qltintuc.tagNames.map((tag) => (
                <Tag key={tag} color="geekblue">{tag}</Tag>
              ))}
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Ngày đăng tin: </strong>
        </Col>
        <Col span={20}>
          {qltintuc.publicDate ? formatDate(new Date(qltintuc.publicDate)) : ''}
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Ngày hiển thị: </strong>
        </Col>
        <Col span={20}>
          {qltintuc.dateShow ? formatDate(new Date(qltintuc.dateShow)) : ''}
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Ngày hết hiệu lực: </strong>
        </Col>
        <Col span={20}>
          {qltintuc.dateEnd ? formatDate(new Date(qltintuc.dateEnd)) : ''}
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Mô tả: </strong>
        </Col>
        <Col span={20}>{qltintuc.description}</Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={4}>
          <strong>Nội dung: </strong>
        </Col>
      </Row>
      <Row gutter={12} style={{ marginTop: '2em' }}>
        <Col span={24}>
          <ReactQuill readOnly value={qltintuc.content} theme="snow" />
        </Col>
      </Row>
    </Drawer>
  )
}

export default QLTinTucDetail
