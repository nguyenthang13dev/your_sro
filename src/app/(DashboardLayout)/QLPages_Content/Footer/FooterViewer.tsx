import { useCallback, useEffect, useState } from 'react'
import { Row, Button, Dropdown, Popconfirm, Flex, Typography } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { toast } from 'react-toastify'
import classes from './page.module.css'
import { footerService } from '@/services/Footer/footer.service'
import { Footer } from '@/interface/footer/footer'
import { useDispatch } from '@/store/hooks'
import { setIsLoading } from '@/store/general/GeneralSlice'
import CreateUploadForm from './CreateUpdateForm'

const FooterViewer: React.FC = () => {
  const dispatch = useDispatch()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [footers, setFooters] = useState<Footer[]>([])
  const [currentFooter, setCurrentFooter] = useState<Footer | null>()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  // Danh sách thao tác
  const getEllipsisMenu = (record: Footer): MenuProps => {
    return {
      items: [
        {
          label: 'Chỉnh sửa',
          key: '2',
          icon: <EditOutlined />,
          onClick: () => {
            setCurrentFooter(record)
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
      const searchData = {
        pageIndex,
        pageSize: 20,
      }
      const response = await footerService.getDataByPage(searchData)
      if (response && response.data) {
        setFooters(response.data.items)
        setPageIndex(response.data.pageIndex)
      }
      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsLoading(false))
    }
  }, [pageIndex])

  const handleRemove = async (id: string) => {
    try {
      const response = await footerService.Delete(id)
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
            setCurrentFooter(null)
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

      {footers.map((item, index) => (
        <Row key={index}>
          <Flex align="center">
            <Typography.Title level={5}>
              {item.type}{' '}
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
            }}
          />
        </Row>
      ))}
      <CreateUploadForm
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        data={currentFooter!}
        onSuccess={handleSendFormSuccess}
      />
    </>
  )
}

export default FooterViewer
