'use client'

import { DropdownOption, ResponsePageInfo } from '@/interface/general'
import { AppDispatch } from '@/store/store'
import {
  CheckCircleFilled,
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
  searchQLTinTuc_Widget,
  tableQLTinTuc_Widget,
} from '@/interface/QLTinTuc_Widget/QLTinTuc_Widget'
import { qLTinTuc_Widget } from '@/services/QLTinTuc_Widget/QLTinTuc_Widget.service'
import DrawerCreateUpdate from './CreateUpdateWidget'
import { chuyenMucService } from '@/services/ChuyenMuc/ChuyenMuc.service'
import DrawerDetail from './DrawerChiTiet'
import { qLPage_ComponentService } from '@/services/QLPage_Component/QLPage_Component.service'
import { TINTUC } from '@/constants/TypeCompoentConstant'

const PageWidget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [dsChuyenMuc, setDsChuyenMuc] = useState<tableQLTinTuc_Widget[]>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [dataPageResponse, setDataPageResponse] = useState<ResponsePageInfo>()
  const [pageSizeInfo, setPageSizeInfo] = useState('loading...')
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)
  const [dropdownChuyenMuc, setDropDownChuyenMuc] = useState<DropdownOption[]>(
    []
  )
  const [dropdownCodeCompoents, setDropDownCodeCompoents] = useState<
    DropdownOption[]
  >([])

  const loading = useSelector((state) => state.general.isLoading)
  //chuyên mục current
  const [widetsCurrent, setWidgetCurent] = useState<tableQLTinTuc_Widget>()
  const [searchValue, setSearchValues] = useState<searchQLTinTuc_Widget | null>(
    null
  )

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  const handleShowModal = (record?: tableQLTinTuc_Widget) => {
    setWidgetCurent(record)
    setIsOpenModal(true)
  }

  const handleDelete = async (id: string) => {
    try {
      if (id == null) {
        toast.error('Yêu cầu chọn đối tượng để xóa')
        return
      }
      const res = await qLTinTuc_Widget.Delete(id)
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

  const handleSearch = async (values: searchQLTinTuc_Widget) => {
    try {
      setSearchValues(values)
      await handleGetData(values)
    } catch (err) {
      toast.error('Có lỗi xảy ra trong quá trình xử lý')
    }
  }

  const tableColumns: TableColumnsType<tableQLTinTuc_Widget> = [
    {
      key: 'index',
      title: 'STT',
      dataIndex: 'index',
      align: 'center',
      width: '1%',
      render: (_: any, __: tableQLTinTuc_Widget, index: number) =>
        pageSize * (pageIndex - 1) + index + 1,
    },
    {
      key: 'soLuongTinBai',
      title: 'Số lượng tin bài',
      dataIndex: 'soLuongTinBai',
      align: 'center',
    },
    {
      key: 'typePreviewCode',
      title: 'Loại hiển thị',
      dataIndex: 'typePreviewCode',
      align: 'center',
      render: (_, record) => {
        return (
          <Tag color={record.typePreviewCode != '' ? 'blue' : 'red'}>
            {record.typePreviewCode != ''
              ? record.typePreviewCode
              : 'Chưa cập nhật'}
          </Tag>
        )
      },
    },
    {
      key: 'codeCompoent',
      title: 'Code compoent',
      dataIndex: 'codeCompoent',
      align: 'center',
    },
    {
      key: 'isPublish',
      title: 'Trạng thái hiển thị',
      dataIndex: 'isPublish',
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
      key: 'isNews',
      title: 'Bài viết mới nhất',
      dataIndex: 'isNews',
      align: 'center',
      render: (value, record, index) => {
        return (
          <Tag color={value ? 'green' : 'red'}>
            {value ? <CheckCircleFilled /> : 'Chưa cập nhật'}
          </Tag>
        )
      },
    },
    {
      key: 'dsChuyenMuctxt',
      title: 'Danh sách chuyên mục',
      dataIndex: 'dsChuyenMuctxt',
      align: 'center',
      render: (value, record) => {
        const list = record?.dsChuyenMuctxt
        if (!Array.isArray(list) || list.length === 0) {
          return <Tag color="red">Không có chuyên mục</Tag>
        }

        return <Tag color={'green'}>{list.join(',')}</Tag>
      },
    },
    {
      key: 'actions',
      title: 'Thao tác',
      dataIndex: 'actions',
      align: 'center',
      width: '5%',
      fixed: 'right',
      render: (_: any, record: tableQLTinTuc_Widget) => {
        const items: MenuProps['items'] = [
          {
            label: 'Chi tiết',
            key: '1',
            icon: <EyeOutlined />,
            onClick: () => {
              setWidgetCurent(record)
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
                    Bạn có muốn xóa không? <br /> Sau khi xóa sẽ không thể khôi
                    phục.
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

  const handleCreateEditSuccess = () => {
    handleGetData()
  }

  const handleGetData = useCallback(
    async (searchData?: searchQLTinTuc_Widget) => {
      dispatch(setIsLoading(true))
      try {
        const params = searchData || {
          pageSize: Number(pageSize) || 1,
          pageIndex: Number(pageIndex) || 1,
          name: searchValue?.name || '',
          typeWidgets: searchValue?.typeWidgets || '',
          isPublish: searchValue?.isPublish || false,
        }
        const response = await qLTinTuc_Widget.GetData(params)
        if (response != null && response.data != null) {
          const data = response.data
          setDsChuyenMuc(data.items)
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

  const handleGetDropDown = useCallback(async () => {
    try {
      const res = await chuyenMucService.GetDropDown()
      setDropDownChuyenMuc(res.data)
    } catch (err) {
      toast.error('Có lỗi xảy ra')
    }
  }, [])

  const handleGetDropDownCode = useCallback(async () => {
    try {
      const res = await qLPage_ComponentService.GetDropdownCode(TINTUC)
      setDropDownCodeCompoents(res.data)
    } catch (err) {
      toast.error('Có lỗi xảy ra')
    }
  }, [])

  useEffect(() => {
    handleGetData()
    handleGetDropDown()
    handleGetDropDownCode()
  }, [])

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="end"
        className={classes.mgButton10}
      >
        {/* <Button
                    onClick={() => toggleSearch()}
                    type="primary"
                    size="small"
                    icon={
                        isPanelVisible ? <CloseOutlined /> : <SearchOutlined />
                    }
                    className={classes.mgright5}
                >
                    {isPanelVisible ? "Ẩn tìm kiếm" : "Tìm kiếm"}
                </Button> */}

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
          dataSource={dsChuyenMuc}
          loading={loading}
          tableLayout="fixed"
        />
        <Pagination
          className="mt-2"
          total={dataPageResponse?.totalCount}
          showTotal={(total, range) => {
            const pageSizeInfo = `${range[0]}-${range[1]} trong ${total} chuyên mục`
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

      <DrawerCreateUpdate
        isOpen={isOpenModal}
        onSuccess={() => {
          handleCreateEditSuccess()
        }}
        onClose={handleClose}
        data={widetsCurrent}
        dropdownChuyenMuc={dropdownChuyenMuc}
        dropDownCode={dropdownCodeCompoents}
      />

      <DrawerDetail
        isOpen={openDrawer}
        onClose={() => {
          handleCloseDrawer()
        }}
        onSuccess={() => {
          handleCloseDrawer()
        }}
        data={widetsCurrent}
      />
    </>
  )
}

export default withAuthorization(PageWidget, '')
