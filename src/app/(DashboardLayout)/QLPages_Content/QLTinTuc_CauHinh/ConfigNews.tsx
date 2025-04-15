'use client'
import Flex from '@/components/shared-components/Flex'
import {
  searchQLTinTuc_CauHinhDataType,
  tableQLTinTuc_CauHinhDataType,
} from '@/interface/QLTinTuc_CauHinh/QLTinTuc_CauHinh'
import { ResponsePageInfo } from '@/interface/general'
import withAuthorization from '@/libs/authentication'
import { qLTinTuc_CauHinhService } from '@/services/QLTinTuc_CauHinh/QLTinTuc_CauHinh.service'
import { setIsLoading } from '@/store/general/GeneralSlice'
import { useDispatch, useSelector } from '@/store/hooks'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
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
  FormProps,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableProps,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import Search from './search'
import CreateOrUpdate from './createOrUpdate'
import { toast } from 'react-toastify'
import QLTinTuc_CauHinhDetail from './detail'
import classes from './page.module.css'

const ConfigNew: React.FC = () => {
  const dispatch = useDispatch()
  const [listQLTinTuc_CauHinh, setListQLTinTuc_CauHinh] = useState<
    tableQLTinTuc_CauHinhDataType[]
  >([])
  const [dataPage, setDataPage] = useState<ResponsePageInfo>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)
  const [searchValues, setSearchValues] =
    useState<searchQLTinTuc_CauHinhDataType | null>(null)
  const loading = useSelector((state) => state.general.isLoading)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentQLTinTuc_CauHinh, setCurrentQLTinTuc_CauHinh] =
    useState<tableQLTinTuc_CauHinhDataType>()
  const [currentDetailQLTinTuc_CauHinh, setCurrentDetailQLTinTuc_CauHinh] =
    useState<tableQLTinTuc_CauHinhDataType>()
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)

  const renderIcon = (value: boolean) => {
    return value ? (
      <CheckCircleOutlined style={{ color: 'green' }} />
    ) : (
      <CloseCircleOutlined style={{ color: 'red' }} />
    )
  }

  const tableColumns: TableProps<tableQLTinTuc_CauHinhDataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Có ảnh',
      dataIndex: 'isImage',
      key: 'isImage',
      render: renderIcon,
    },
    {
      title: 'Có tiêu đề',
      dataIndex: 'isTitle',
      key: 'isTitle',
      render: renderIcon,
    },
    {
      title: 'Có mô tả',
      dataIndex: 'isDescription',
      key: 'isDescription',
      render: renderIcon,
    },
    {
      title: 'Có ngày đăng',
      dataIndex: 'isDateTime',
      key: 'isDateTime',
      render: renderIcon,
    },

    {
      title: 'Thao tác',
      dataIndex: 'actions',
      fixed: 'right',
      render: (_: any, record: tableQLTinTuc_CauHinhDataType) => {
        const items: MenuProps['items'] = [
          {
            label: 'Chi tiết',
            key: '1',
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailQLTinTuc_CauHinh(record)
              setIsOpenDetail(true)
            },
          },
          {
            label: 'Chỉnh sửa',
            key: '2',
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record)
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
                description={
                  <span>
                    Bạn có muốn xóa dữ liệu này không? <br /> Sau khi xóa sẽ
                    không thể khôi phục.
                  </span>
                }
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => {
                  handleDeleteQLTinTuc_CauHinh(record.id || '')
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
            <Dropdown menu={{ items }} trigger={['click']}>
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

  const hanleCreateEditSuccess = () => {
    handleGetList()
  }

  const handleDeleteQLTinTuc_CauHinh = async (id: string) => {
    try {
      const response = await qLTinTuc_CauHinhService.Delete(id)
      if (response.status) {
        toast.success('Xóa tài khoản thành công')
        handleGetList()
      } else {
        toast.error('Xóa tài khoản thất bại')
      }
    } catch (error) {
      toast.error('Xóa tài khoản thất bại')
    }
  }

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  const onFinishSearch: FormProps<searchQLTinTuc_CauHinhDataType>['onFinish'] =
    async (values) => {
      try {
        setSearchValues(values)
        await handleGetList(values)
      } catch (error) {
        console.error('Lỗi khi lưu dữ liệu:', error)
      }
    }

  const handleGetList = useCallback(
    async (searchDataOverride?: searchQLTinTuc_CauHinhDataType) => {
      dispatch(setIsLoading(true))
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        }
        const response = await qLTinTuc_CauHinhService.getDataByPage(searchData)
        if (response != null && response.data != null) {
          const data = response.data
          const items = data.items
          setListQLTinTuc_CauHinh(items)
          setDataPage({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          })
        }
        dispatch(setIsLoading(false))
      } catch (error) {
        dispatch(setIsLoading(false))
      }
    },
    [pageIndex, pageSize]
  )

  const handleShowModal = (
    isEdit?: boolean,
    QLTinTuc_CauHinh?: tableQLTinTuc_CauHinhDataType
  ) => {
    setIsOpenModal(true)
    if (isEdit) {
      setCurrentQLTinTuc_CauHinh(QLTinTuc_CauHinh)
    }
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  const handleCloseDetail = () => {
    setIsOpenDetail(false)
  }

  useEffect(() => {
    handleGetList()
  }, [handleGetList])

  return (
    <>
      <Flex alignItems="center" justifyContent="end" className={classes.mb}>
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
        <CreateOrUpdate
          isOpen={isOpenModal}
          onSuccess={hanleCreateEditSuccess}
          onClose={handleClose}
          QLTinTuc_CauHinh={currentQLTinTuc_CauHinh}
        />
      </Flex>
      {/* {isPanelVisible && <Search onFinish={onFinishSearch} />} */}
      <QLTinTuc_CauHinhDetail
        qLTinTuc_CauHinh={currentDetailQLTinTuc_CauHinh}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <Card style={{ padding: '0px' }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listQLTinTuc_CauHinh}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            pagination={false}
            loading={loading}
          />
        </div>
        <Pagination
          className="mt-2"
          total={dataPage?.totalCount}
          showTotal={(total, range) =>
            range[0] + '-' + range[1] + ' trong ' + total + ' dữ liệu'
          }
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
    </>
  )
}

export default withAuthorization(ConfigNew, '')
