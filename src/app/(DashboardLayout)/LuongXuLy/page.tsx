'use client'
import Flex from '@/components/shared-components/Flex'
import {
  searchLuongXuLyData,
  tableLuongXuLyDataType,
} from '@/interface/LuongXuLy/LuongXuLy'
import { ResponsePageInfo } from '@/interface/general'
import withAuthorization from '@/libs/authentication'
import { luongXuLyService } from '@/services/LuongXuLy/LuongXuLy.service'
import { setIsLoading } from '@/store/general/GeneralSlice'
import { useDispatch, useSelector } from '@/store/hooks'
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  VerticalAlignTopOutlined,
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
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import Search from './search'
import CreateOrUpdate from './createOrUpdate'
import { toast } from 'react-toastify'
import LuongXuLyDetail from './detail'
import classes from './page.module.css'
import { useRouter } from 'next/navigation'
import AutoBreadcrumb from '@/components/util-compenents/Breadcrumb'

const LuongXuLy: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [listLuongXuLy, setListLuongXuLy] = useState<tableLuongXuLyDataType[]>(
    []
  )
  const [dataPage, setDataPage] = useState<ResponsePageInfo>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)
  const [searchValues, setSearchValues] = useState<searchLuongXuLyData | null>(
    null
  )
  const loading = useSelector((state) => state.general.isLoading)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentLuongXuLy, setCurrentLuongXuLy] =
    useState<tableLuongXuLyDataType>()
  const [currentDetailLuongXuLy, setCurrentDetailLuongXuLy] =
    useState<tableLuongXuLyDataType>()
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)

  const tableColumns: TableProps<tableLuongXuLyDataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên luồng xử lý',
      dataIndex: 'TenLuongXuLy',
      render: (_: any, record: tableLuongXuLyDataType) => (
        <span>{record.tenLuongXuLy}</span>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
      fixed: 'right',
      align: 'center',
      render: (_: any, record: tableLuongXuLyDataType) => {
        const items: MenuProps['items'] = [
          {
            label: 'Chi tiết',
            key: '1',
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailLuongXuLy(record)
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
            label: 'Danh sách trạng thái xử lý',
            key: '3',
            icon: <MenuUnfoldOutlined />,
            onClick: () => {
              handleRedirectToTrangThaiLuongXuLy(record)
            },
          },
          {
            label: 'Danh sách bước xử lý',
            key: '4',
            icon: <MenuUnfoldOutlined />,
            onClick: () => {
              handleRedirectToBuocXuLy(record)
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
                  handleDeleteLuongXuLy(record.id || '')
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

  const handleRedirectToTrangThaiLuongXuLy = (
    record: tableLuongXuLyDataType
  ) => {
    router.push(`/TrangThaiLuongXuLy/${record.id}`)
  }

  const handleRedirectToBuocXuLy = (record: tableLuongXuLyDataType) => {
    router.push(`/BuocXuLy/${record.id}`)
  }

  const hanleCreateEditSuccess = () => {
    handleGetList()
  }

  const handleDeleteLuongXuLy = async (id: string) => {
    try {
      const response = await luongXuLyService.Delete(id)
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

  const onFinishSearch: FormProps<searchLuongXuLyData>['onFinish'] = async (
    values
  ) => {
    try {
      setSearchValues(values)
      await handleGetList(values)
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error)
    }
  }

  const handleGetList = useCallback(
    async (searchDataOverride?: searchLuongXuLyData) => {
      dispatch(setIsLoading(true))
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        }
        const response = await luongXuLyService.getDataByPage(searchData)
        if (response != null && response.data != null) {
          const data = response.data
          const items = data.items
          setListLuongXuLy(items)
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
    LuongXuLy?: tableLuongXuLyDataType
  ) => {
    setIsOpenModal(true)
    if (isEdit) {
      setCurrentLuongXuLy(LuongXuLy)
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
          <Link href="/QLNguoiDung/Import">
            <Button
              color="pink"
              variant="solid"
              icon={<VerticalAlignTopOutlined />}
              size="small"
              className={classes.mgright5}
            >
              Import
            </Button>
          </Link>
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
            LuongXuLy={currentLuongXuLy}
          />
        </div>
      </Flex>
      {isPanelVisible && <Search onFinish={onFinishSearch} />}
      <LuongXuLyDetail
        luongXuLy={currentDetailLuongXuLy}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <Card style={{ padding: '0px' }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listLuongXuLy}
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

export default withAuthorization(LuongXuLy, 'LuongXuLy_index')
