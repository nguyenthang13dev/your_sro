'use client'
import Flex from '@/components/shared-components/Flex'
import {
  searchLinhVucThuongHieuData,
  tableLinhVucThuongHieuDataType,
} from '@/interface/linhVucThuongHieu/linhVucThuongHieu'
import {
  Response,
  ResponsePageInfo,
  ResponsePageList,
} from '@/interface/general'
import withAuthorization from '@/libs/authentication'
import { linhVucThuongHieuService } from '@/services/linhVucThuongHieu/linhVucThuongHieu.service'
import { setIsLoading } from '@/store/general/GeneralSlice'
import { useSelector } from '@/store/hooks'
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
  FormProps,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableProps,
} from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './page.module.css'
import { toast } from 'react-toastify'
import CreateOrUpdate from './createOrUpdate'
import Search from './search'
import LinhVucThuongHieuDetail from './detail'
import AutoBreadcrumb from '@/components/util-compenents/Breadcrumb'

const LinhVucThuongHieu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [listLinhVucThuongHieus, setListLinhVucThuongHieus] = useState<
    tableLinhVucThuongHieuDataType[]
  >([])
  const [dataPage, setDataPage] = useState<ResponsePageInfo>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [deleteId, setDeleteId] = useState<string>()

  const [pageIndex, setPageIndex] = useState<number>(1)
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)
  const [searchValues, setSearchValues] =
    useState<searchLinhVucThuongHieuData | null>(null)
  const loading = useSelector((state) => state.general.isLoading)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentLinhVucThuongHieu, setCurrentLinhVucThuongHieu] =
    useState<tableLinhVucThuongHieuDataType | null>(null)
  const [currentDetailLinhVucThuongHieu, setCurrentDetailLinhVucThuongHieu] =
    useState<tableLinhVucThuongHieuDataType>()
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)
  const tableColumns: TableProps<tableLinhVucThuongHieuDataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (_: any, __: any, index: number) =>
        pageSize * (pageIndex - 1) + index + 1,
    },
    {
      title: 'Mã lĩnh vực',
      dataIndex: 'maLinhVuc',
      render: (_: any, record: tableLinhVucThuongHieuDataType) => (
        <span>{record.maLinhVuc}</span>
      ),
    },
    {
      title: 'Tên lĩnh vực',
      dataIndex: 'tenLinhVuc',
      render: (_: any, record: tableLinhVucThuongHieuDataType) => (
        <span>{record.tenLinhVuc}</span>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      render: (_: any, record: tableLinhVucThuongHieuDataType) => (
        <span>{record.moTa}</span>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
      fixed: 'right',
      align: 'center',
      render: (_: any, record: tableLinhVucThuongHieuDataType) => {
        const items: MenuProps['items'] = [
          {
            label: 'Chi tiết',
            key: '2',
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailLinhVucThuongHieu(record)
              setIsOpenDetail(true)
            },
          },
          {
            label: 'Chỉnh sửa',
            key: '3',
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record)
            },
          },
          {
            type: 'divider',
          },
          {
            label: 'Xóa',
            key: '4',
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => setDeleteId(record.id),
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
            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn có chắc chắn muốn xóa?"
              okText="Xóa"
              cancelText="Hủy"
              open={deleteId === record.id}
              onConfirm={() => {
                handleDeleteLinhVucThuongHieu(record.id!)
                setDeleteId(undefined)
              }}
              onCancel={() => setDeleteId(undefined)}
            />
          </>
        )
      },
    },
  ]

  const hanleCreateEditSuccess = () => {
    handleGetListLinhVucThuongHieu()
    setCurrentLinhVucThuongHieu(null)
  }

  const handleDeleteLinhVucThuongHieu = async (id: string) => {
    try {
      const response = await linhVucThuongHieuService.Delete(id)
      if (response.status) {
        toast.success('Xóa lĩnh vực thương hiệu thành công')
        handleGetListLinhVucThuongHieu()
      } else {
        toast.error('Xóa lĩnh vực thương hiệu thất bại')
      }
    } catch (error) {
      toast.error('Xóa lĩnh vực thương hiệu thất bại')
    }
  }

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  const onFinishSearch: FormProps<searchLinhVucThuongHieuData>['onFinish'] =
    async (values) => {
      try {
        const searchParam = { ...values, pageIndex: 1, pageSize }
        setPageIndex(1)
        setSearchValues(searchParam)
      } catch (error) {
        console.error('Lỗi khi lưu dữ liệu:', error)
      }
    }

  const handleGetListLinhVucThuongHieu = async () => {
    dispatch(setIsLoading(true))
    try {
      const searchData = {
        ...searchValues,
        pageIndex,
        pageSize,
      }
      const response: Response = await linhVucThuongHieuService.getDataByPage(
        searchData
      )
      if (response != null && response.data != null) {
        const data: ResponsePageList = response.data
        const items: tableLinhVucThuongHieuDataType[] = data.items
        setListLinhVucThuongHieus(items)
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
  }

  const handleShowModal = (
    isEdit?: boolean,
    LinhVucThuongHieu?: tableLinhVucThuongHieuDataType
  ) => {
    setIsOpenModal(true)
    if (isEdit) {
      setCurrentLinhVucThuongHieu(LinhVucThuongHieu ?? null)
    }
  }

  const handleClose = () => {
    setIsOpenModal(false)
    setCurrentLinhVucThuongHieu(null)
  }

  const handleCloseDetail = () => {
    setIsOpenDetail(false)
  }

  useEffect(() => {
    handleGetListLinhVucThuongHieu()
  }, [pageIndex, pageSize, searchValues])

  // useEffect(() => {
  //   handleGetListLinhVucThuongHieu()
  // }, [])

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
          <CreateOrUpdate
            isOpen={isOpenModal}
            onSuccess={hanleCreateEditSuccess}
            onClose={handleClose}
            LinhVucThuongHieu={currentLinhVucThuongHieu}
          />
        </div>
      </Flex>
      {isPanelVisible && (
        <Search onFinish={onFinishSearch} pageIndex={pageIndex} pageSize={20} />
      )}

      <LinhVucThuongHieuDetail
        LinhVucThuongHieu={currentDetailLinhVucThuongHieu}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />

      <Card style={{ padding: '0px' }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listLinhVucThuongHieus}
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
            `${range[0]}-${range[1]} trong ${total} dữ liệu`
          }
          pageSize={pageSize}
          // defaultCurrent={1}
          current={pageIndex}
          onChange={(e) => {
            setPageIndex(e)
          }}
          onShowSizeChange={(current, pageSize) => {
            setPageSize(pageSize)
          }}
          size="small"
          align="end"
        />
      </Card>
    </>
  )
}

export default withAuthorization(LinhVucThuongHieu, '')
