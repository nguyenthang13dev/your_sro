'use client'

import { ResponsePageInfo, SearchBase } from '@/interface/general'
import { AppDispatch } from '@/store/store'
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Dropdown,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import classes from './page.module.css'
import Flex from '@/components/shared-components/Flex'
import { useSelector } from '@/store/hooks'
import { setIsLoading } from '@/store/general/GeneralSlice'
import withAuthorization from '@/libs/authentication'
import {
  QLTinTuc_SEOType,
  searchDataType,
} from '@/interface/QLTinTuc_SEO/QLTinTuc_SEO'
import { qLTinTuc_SEO } from '@/services/QLTinTuc_SEO/QLTinTuc_SEO.service'
import CreateUpdateForm from './CreateUpdateForm'
import AutoBreadcrumb from '@/components/util-compenents/Breadcrumb'

const QLTinTuc_SEO: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [dsTags, setDsTag] = useState<QLTinTuc_SEOType[]>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [dataPageResponse, setDataPageResponse] = useState<ResponsePageInfo>()
  const [pageSizeInfo, setPageSizeInfo] = useState('loading...')

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)

  const loading = useSelector((state) => state.general.isLoading)
  //chuyên mục current
  const [seoCurrent, setSeoCurent] = useState<QLTinTuc_SEOType>()

  const [searchValue, setSearchValues] = useState<searchDataType | null>(null)

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  const handleShowModal = (record?: QLTinTuc_SEOType) => {
    setSeoCurent(record)
    setIsOpenModal(true)
  }

  const handleDelete = async (id: string) => {
    try {
      if (id == null) {
        toast.error('Yêu cầu chọn đối tượng để xóa')
        return
      }
      const res = await qLTinTuc_SEO.Delete(id)
      if (res.status) {
        toast.success('Xóa thành công chuyên mục')
        handleGetData()
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      toast.error('Có lỗi trong quá trình xử lý')
    }
  }

  const handleSearch = async (values: searchDataType) => {
    try {
      setSearchValues(values)
      await handleGetData(values)
    } catch (err) {
      toast.error('Có lỗi xảy ra trong quá trình xử lý')
    }
  }

  const tableColumns: TableColumnsType<QLTinTuc_SEOType> = [
    {
      key: 'index',
      title: 'STT',
      dataIndex: 'index',
      align: 'center',
      width: '1%',
      render: (_: any, __: QLTinTuc_SEOType, index: number) =>
        pageSize * (pageIndex - 1) + index + 1,
    },
    {
      key: 'title',
      title: 'Tên loại thẻ meta',
      dataIndex: 'title',
      align: 'center',
    },
    {
      key: 'description',
      title: 'Giá trị thẻ meta',
      dataIndex: 'description',
      align: 'center',
    },
    {
      key: 'note',
      title: 'Ghi chú',
      dataIndex: 'note',
      align: 'center',
    },
    {
      key: 'type',
      title: 'Kiểu hiển thị',
      dataIndex: 'type',
      align: 'center',
    },
    {
      key: 'isShow',
      title: 'Trạng thái hiển thị',
      dataIndex: 'isShow',
      align: 'center',
      render: (value, record, index) => {
        return (
          <Tag color={value ? 'green' : 'red'}>
            {value ? 'Hiển thị' : 'Không hiển thị'}
          </Tag>
        )
      },
    },
    {
      key: 'actions',
      title: 'Thao tác',
      dataIndex: 'actions',
      align: 'center',
      width: '5%',
      fixed: 'right',
      render: (_: any, record: QLTinTuc_SEOType) => {
        const items: MenuProps['items'] = [
          {
            label: 'Chi tiết',
            key: '1',
            icon: <EyeOutlined />,
            onClick: () => {
              setSeoCurent(record)
              handleOpenDrawer()
            },
          },
          {
            label: 'Chỉnh sửa',
            key: '2',
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(record)
            },
          },
          {
            label: (
              <Popconfirm
                key={`Delete${record.id}`}
                title="Xác nhận xóa"
                description={
                  <span>
                    Bạn có muốn xóa tag này không? <br /> Sau khi xóa sẽ không
                    thể khôi phục.
                  </span>
                }
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => {
                  handleDelete(record.id)
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
        ]
        return (
          <>
            <Dropdown menu={{ items }} trigger={['click', 'hover']}>
              <Button
                onClick={(e) => e.preventDefault()}
                color="primary"
                size="small"
              >
                <Space>
                  Thao tác
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </>
        )
      },
    },
  ]

  const handleCreateEditSuccess = () => {
    handleGetData()
  }

  const handleGetData = useCallback(
    async (searchData?: searchDataType) => {
      dispatch(setIsLoading(true))
      try {
        const params = searchData || {
          pageSize: Number(pageSize) || 1,
          pageIndex: Number(pageIndex) || 1,
          isShow: searchValue?.isShow ?? false,
        }
        const response = await qLTinTuc_SEO.GetData(params)
        if (response != null && response.data != null) {
          const data = response.data
          setDsTag(data.items)
          setDataPageResponse({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          })
          setPageSizeInfo('')
          dispatch(setIsLoading(false))
        }
      } catch (err) {
        toast.error('Không tìm thấy kết quả')
        dispatch(setIsLoading(false))
      } finally {
        dispatch(setIsLoading(false))
      }
    },
    [pageIndex, pageSize]
  )
  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className={classes.mgButton10}
      >
        <AutoBreadcrumb />
        <div>
          <Button
            onClick={() => toggleSearch()}
            type="primary"
            size="small"
            icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
            className={classes.mgright5}
          >
            {isPanelVisible ? 'Ẩn tìm kiếm' : 'Tìm kiếm'}
          </Button>

          <Button
            onClick={() => {
              handleShowModal()
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
            size="small"
          >
            Thêm mới
          </Button>
        </div>
      </Flex>

      {/* {isPanelVisible && <Search handleSearch={handleSearch} />} */}

      <Card style={{ padding: '0px' }} className={classes.customCardShadow}>
        <Flex alignItems="center" justifyContent="end" margin="10px">
          <Typography.Text strong>{pageSizeInfo}</Typography.Text>
        </Flex>

        <Table
          columns={tableColumns}
          pagination={false}
          bordered
          rowKey="id"
          scroll={{
            x: 'max-content',
          }}
          dataSource={dsTags}
          loading={loading}
          tableLayout="fixed"
        />
        <Pagination
          className="mt-2"
          total={dataPageResponse?.totalCount}
          showTotal={(total, range) => {
            const pageSizeInfo = `${range[0]}-${range[1]} trong ${total} tag`
            setPageSizeInfo(pageSizeInfo)
            return pageSizeInfo
          }}
          pageSize={pageSize}
          defaultCurrent={1}
          onChange={(e) => {
            setPageIndex(e)
          }}
          onShowSizeChange={(current, pageSize) => {
            setPageIndex(current)
            setPageSize(pageSize)
          }}
          size="small"
          align="end"
        />
      </Card>

      <CreateUpdateForm
        isOpen={isOpenModal}
        onSuccess={handleCreateEditSuccess}
        onClose={handleClose}
        data={seoCurrent}
      />
    </>
  )
}

export default withAuthorization(QLTinTuc_SEO, '')
