'use client'
import Flex from '@/components/shared-components/Flex'
import {
  searchTuKhoaData,
  tableTuKhoaDataType,
} from '@/interface/tuKhoa/tuKhoa'
import {
  DropdownOptionAntd,
  Response,
  ResponsePageInfo,
  ResponsePageList,
} from '@/interface/general'
import withAuthorization from '@/libs/authentication'
import { tuKhoaService } from '@/services/tuKhoa/tuKhoa.service'
import { setIsLoading } from '@/store/general/GeneralSlice'
import { useSelector } from '@/store/hooks'
import { AppDispatch } from '@/store/store'
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusCircleOutlined,
  RollbackOutlined,
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
import { useDispatch } from 'react-redux'
import classes from '../page.module.css'
import { toast } from 'react-toastify'
import CreateOrUpdate from '../createOrUpdate'
import Search from '../search'
import { duLieuDanhMucService } from '@/services/duLieuDanhMuc/duLieuDanhMuc.service'
import DanhMucConstant from '@/constants/DanhMucConstant'
import AutoBreadcrumb from '@/components/util-compenents/Breadcrumb'
import { raSoatTieuChiService } from '@/services/raSoatTieuChi/raSoatTieuChi.service'
import { RaSoatTieuChiSearch } from '@/interface/raSoatTieuChi/raSoatTieuChi'
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams();
  const groupId = id?.toString() ?? null;
  const initSearch: searchTuKhoaData = {
    nhomTieuChiId: groupId,
    pageIndex: 1,
    pageSize: 20,
  };

  const [listtuKhoas, setListtuKhoas] = useState<tableTuKhoaDataType[]>([])
  const [dataPage, setDataPage] = useState<ResponsePageInfo>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)
  const [searchValues, setSearchValues] = useState<searchTuKhoaData | null>(
    initSearch
  )
  const loading = useSelector((state) => state.general.isLoading)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentTuKhoa, setCurrentTuKhoa] =
    useState<tableTuKhoaDataType | null>(null)
  const [dropdownLoaiTuKhoa, setDropdownLoaiTuKhoa] = useState<
    DropdownOptionAntd[]
  >([])
  const [raSoatTieuChiList, setRaSoatTieuChiList] = useState<DropdownOptionAntd[]>([])

  const router = useRouter();

  const tableColumns: TableProps<tableTuKhoaDataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên từ khóa',
      dataIndex: 'tenTuKhoa',
      render: (_: any, record: tableTuKhoaDataType) => (
        <span>{record.tenTuKhoa}</span>
      ),
    },
    {
      title: 'Loại từ khóa',
      dataIndex: 'tenLoaiTuKhoa',
      render: (_: any, record: tableTuKhoaDataType) => (
        <span>{record.tenLoaiTuKhoa}</span>
      ),
    },
    {
      title: 'Tiêu chí',
      dataIndex: 'nhomTieuChiId',
      render: (_: any, record: tableTuKhoaDataType) => (
        <span>{raSoatTieuChiList?.find((item) => item.value === record?.nhomTieuChiId)?.label || ''}</span>
      ),
    },
    {
      title: 'Tần suất',
      dataIndex: 'tanSuat',
      render: (_: any, record: tableTuKhoaDataType) => (
        <span>{record.tanSuat}</span>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
      fixed: 'right',
      render: (_: any, record: tableTuKhoaDataType) => {
        const items: MenuProps['items'] = [
          {
            label: 'Chỉnh sửa',
            key: '3',
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record)
            },
          },
          {
            label: (
              <Popconfirm
                key={`Delete${record.id}`}
                title="Xác nhận xóa"
                description={
                  <span>
                    Bạn có muốn xóa từ khóa này không? <br /> Sau khi xóa sẽ
                    không thể khôi phục.
                  </span>
                }
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => {
                  handleDeletetuKhoa(record.id || '')
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
    handleGetListtuKhoa()
    setCurrentTuKhoa(null)
  }

  const handleDeletetuKhoa = async (id: string) => {
    try {
      const response = await tuKhoaService.Delete(id)
      if (response.status) {
        toast.success('Xóa từ khóa thành công')
        handleGetListtuKhoa()
      } else {
        toast.error('Xóa từ khóa thất bại')
      }
    } catch (error) {
      toast.error('Xóa từ khóa thất bại')
    }
  }

  const getDropdown = async () => {
    try {
      const response = await duLieuDanhMucService.GetDropdown(
        DanhMucConstant.LoaiTuKhoa
      )
      const rasoattieuchi = await raSoatTieuChiService.getDropdown()
      setDropdownLoaiTuKhoa(response?.data)
      setRaSoatTieuChiList(rasoattieuchi.data);
    } catch (error) { }
  }

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  const onFinishSearch: FormProps<searchTuKhoaData>['onFinish'] = async (
    values
  ) => {
    try {
      const searchData: searchTuKhoaData = {
        ...values,
        nhomTieuChiId: values.nhomTieuChiId || groupId, // Giữ lại groupId nếu người dùng không nhập giá trị mới
        pageIndex: 1, // Reset trang về 1 khi tìm kiếm
        pageSize: 20,
      };
      setSearchValues(searchData)
      await handleGetListtuKhoa(searchData)
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error)
    }
  }

  const handleGetListtuKhoa = useCallback(
    async (searchDataOverride?: searchTuKhoaData) => {
      dispatch(setIsLoading(true))
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        }
        const response: Response = await tuKhoaService.getDataByPage(searchData)
        if (response != null && response.data != null) {
          const data: ResponsePageList = response.data
          const items: tableTuKhoaDataType[] = data.items
          setListtuKhoas(items)
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

  const handleShowModal = (isEdit?: boolean, tuKhoa?: tableTuKhoaDataType) => {
    setIsOpenModal(true)
    if (isEdit) {
      setCurrentTuKhoa(tuKhoa ?? null)
    }
  }

  const handleClose = () => {
    setIsOpenModal(false)
    setCurrentTuKhoa(null)
  }

  useEffect(() => {
    handleGetListtuKhoa()
  }, [handleGetListtuKhoa])

  useEffect(() => {
    getDropdown()
  }, [])


  const QuayLai = () => {
    router.push(`/raSoatTieuChi`);
  }


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
            className={classes.mgright5}
          >
            Thêm mới
          </Button>
          <Button
            onClick={() => QuayLai()}
            size="small"
            icon={<RollbackOutlined />}
            color="danger"
            variant="solid"
            className={classes.mgright5}
          >
            Quay lại
          </Button>
          <CreateOrUpdate
            isOpen={isOpenModal}
            onSuccess={hanleCreateEditSuccess}
            onClose={handleClose}
            tuKhoa={currentTuKhoa}
            dropdown={dropdownLoaiTuKhoa}
            raSoatTieuChiList={raSoatTieuChiList}
          />
        </div>
      </Flex>
      {isPanelVisible && (
        <Search
          onFinish={onFinishSearch}
          pageIndex={pageIndex}
          pageSize={pageSize}
          dropdown={dropdownLoaiTuKhoa}
        />
      )}

      <Card style={{ padding: '0px' }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listtuKhoas}
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

export default withAuthorization(Page, '')
