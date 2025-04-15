'use client'
import { useCallback, useEffect, useState } from 'react'
import { Row, Button, Dropdown, Popconfirm, Flex, Typography, Col } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { toast } from 'react-toastify'
import classes from './page.module.css'
import { useDispatch } from '@/store/hooks'
import { setIsLoading } from '@/store/general/GeneralSlice'
import CreateUploadForm from './CreateUpdateForm'
import { Layout } from '@/interface/QLPage_Layout/Layout'
import { layoutService } from '@/services/QLPage_Layout/layout.service'

const FooterViewer: React.FC = () => {
  const dispatch = useDispatch()
  const [layouts, setLayouts] = useState<Layout[]>([])
  const [currentLayout, setCurrentLayout] = useState<Layout | null>()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  // Danh sách thao tác
  const getEllipsisMenu = (record: Layout): MenuProps => {
    return {
      items: [
        {
          label: 'Chỉnh sửa',
          key: '2',
          icon: <EditOutlined />,
          onClick: () => {
            setCurrentLayout(record)
            setIsOpenModal(true)
          },
        },
        {
          type: 'divider',
        },
        {
          label: (
            <Popconfirm
              key={'Delete' + record.id}
              title="Xác nhận xóa"
              description={<span>Bạn có muốn xóa dữ liệu này không?</span>}
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() => {
                handleRemove(record.id)
              }}
              trigger="click"
              forceRender
            >
              <span>Xóa</span>
            </Popconfirm>
          ),
          key: '4',
          icon: <DeleteOutlined />,
          danger: true,
        },
      ],
    }
  }

  const handleFetchData = useCallback(async () => {
    dispatch(setIsLoading(true))
    try {
      const response = await layoutService.getLayoutList()
      if (response && response.data) {
        setLayouts(response.data)
      }
      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsLoading(false))
    }
  }, [])

  const handleRemove = async (id: string) => {
    try {
      const response = await layoutService.Delete(id)
      if (response.status) {
        toast.success('Xóa thành công')
        handleFetchData()
      } else {
        toast.error('Xóa thất bại')
      }
    } catch (error) {
      toast.error('Xóa thất bại: ' + error)
    }
  }

  const handleSendFormSuccess = () => {
    handleFetchData()
  }
  useEffect(() => {
    handleFetchData()
  }, [])
  return (
    <>
      <Flex justify="end" style={{ marginBottom: '5px' }}>
        <Button
          onClick={() => {
            setCurrentLayout(null)
            setIsOpenModal(true)
          }}
          type="primary"
          icon={<PlusCircleOutlined />}
          size="small"
          className={classes.greenBtn}
        >
          Thêm mới
        </Button>
      </Flex>

      <Row gutter={18}>
        {layouts.map((item, index) => (
          <Col
            span={8}
            key={index}
            style={{ height: '24em', marginBottom: '10px' }}
          >
            <Flex align="center">
              <Typography.Title level={5}>
                {item.name}{' '}
                <Dropdown
                  menu={getEllipsisMenu(item)}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <Button
                    type="text"
                    icon={<MoreOutlined />}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Dropdown>
              </Typography.Title>
            </Flex>
            <iframe
              sandbox="allow-scripts allow-same-origin"
              srcDoc={` <style scoped>
                  ${item.css}
              </style>
              ${item.html}`}
              style={{
                border: '1px solid',
                padding: '2px',
                width: '100%',
                borderRadius: '10px',
                height: '87%',
              }}
            />
          </Col>
        ))}
      </Row>
      <CreateUploadForm
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        data={currentLayout!}
        onSuccess={handleSendFormSuccess}
      />
    </>
  )
}

export default FooterViewer
