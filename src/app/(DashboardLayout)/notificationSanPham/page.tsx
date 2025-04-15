'use client'
import Flex from '@/components/shared-components/Flex'
import { DropdownOptionAntd, ResponsePageInfo } from '@/interface/general'
import withAuthorization from '@/libs/authentication'
import { setIsLoading } from '@/store/general/GeneralSlice'
import { useSelector } from '@/store/hooks'
import { AppDispatch } from '@/store/store'
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  InsertRowRightOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  ArrowRightOutlined,
  PrinterOutlined,
  CheckOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  Image,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  Typography,
  Tag,
  Switch
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './page.module.css'
import { toast } from 'react-toastify'
import CreateUpdateForm from './CreateUpdateForm'
import Search from './Search'
import { notificationService } from '@/services/notification/notification.service'
import Notification, { NotificationSearch } from '@/interface/notification/notification'
import { duLieuDanhMucService } from "@/services/duLieuDanhMuc/duLieuDanhMuc.service";
import { userService } from '@/services/user/user.service'
import Detail from './detail'
import SendEmail from './SendEmail'
import DanhSachGui from './DanhSachGui'
import AutoBreadcrumb from '@/components/util-compenents/Breadcrumb'

const StaticFileUrl = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL

const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [notificationList, setNotificationList] = useState<Notification[]>([])
  const [pageSizeInfo, setPageSizeInfo] = useState('loading...')
  //xử lý chuyển trang
  const [dataPage, setDataPage] = useState<ResponsePageInfo>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [userList, setUserList] = useState<DropdownOptionAntd[]>([])
  //xử lý hiện modal
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)
  const [isOpenSendEmail, setIsOpenSendEmail] = useState<boolean>(false)
  const [isOpenDanhSachGui, setIsOpenDanhSachGui] = useState<boolean>(false)
  const [deleteProductId, setDeleteProductId] = useState<string>()
  //xử lý search
  const [searchValues, setSearchValues] = useState<NotificationSearch | null>(
    null
  )
  const loading = useSelector((state) => state.general.isLoading)
  const [currentNotification, setCurrentNotification] = useState<
    Notification | undefined
  >()

  const tableColumns: TableColumnsType<Notification> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      width: '1%',
      render: (_: any, __: Notification, index: number) =>
        pageSize * (pageIndex - 1) + index + 1,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'tieuDe',
      width: '5%',
      align: 'center',
      render: (_: any, record: Notification) => {

        return <span>{record.tieuDe}</span>;
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdBy',
      width: '5%',
      align: 'center',
      render: (_: any, record: Notification) => {
        return <span>{record.createdBy}</span>;
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      width: '5%',
      align: 'center',
      render: (_: any, record: Notification) => (
        <span>
          {record.createdDate
            ? new Date(record.createdDate).toLocaleDateString(
              "vi-VN",
            )
            : ""}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isXuatBan',
      width: '5%',
      align: 'center',
      render: (_: any, record: Notification) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Popconfirm
            key={`Lock${record.id}`}
            title="Xác nhận"
            description={
              <span>
                Bạn có chắc chắn muốn {record.isXuatBan ? 'Khóa' : 'Mở khóa'}?
              </span>
            }
            okText="Đồng ý"
            cancelText="Hủy"
            onConfirm={() => {
              handleToggleLock(record.id || '')
            }}
            trigger="click"
            forceRender
          >
            <Switch
              checkedChildren="Mở"
              unCheckedChildren="Khóa"
              checked={record.isXuatBan}
            />
          </Popconfirm>
        </div>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
      align: 'center',
      width: '5%',
      fixed: 'right',
      render: (_: any, record: Notification) => {
        const items: MenuProps['items'] = [
          {
            label: "Chi tiết",
            key: "4",
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentNotification(record);
              setIsOpenDetail(true);
            },
          },
          {
            label: 'Chỉnh sửa',
            key: '1',
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(record)
            },
          },
          {
            label: "Gửi email thông báo",
            key: "3",
            icon: <PrinterOutlined />,
            onClick: () => {
              setCurrentNotification(record);
              setIsOpenSendEmail(true);
            },
          },
          {
            label: "Thống kê tin đã gửi",
            key: "5",
            icon: <InsertRowRightOutlined />,
            onClick: () => {
              setCurrentNotification(record);
              setIsOpenDanhSachGui(true);
            },
          },
          {
            label: 'Xóa',
            key: '4',
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => setDeleteProductId(record.id),
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
              description="Bạn có muốn xóa chức năng này?"
              okText="Xóa"
              cancelText="Hủy"
              open={deleteProductId === record.id}
              onConfirm={() => {
                handleDelete(record.id)
                setDeleteProductId(undefined)
              }}
              onCancel={() => setDeleteProductId(undefined)}
            />
          </>
        )
      },
    },
  ]

  const handleCreateEditSuccess = () => {
    handleFetch()
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await notificationService.Delete(id)
      if (response.status) {
        toast.success('Xóa thành công')
        handleFetch()
      } else {
        toast.error('Xóa thất bại')
      }
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error)
      toast.error('Có lỗi xảy ra')
    }
  }

  const handleToggleLock = async (id: string) => {
    try {
      const response = await notificationService.ToggleLock(id)
      if (response.status) {
        toast.success(response.message)
        handleFetch()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('Thao tác thất bại')
    }
  }

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  const handleSearch = async (values: NotificationSearch) => {
    try {
      setSearchValues(values)
      await handleFetch(values)
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error)
    }
  }

  const handleFetch = useCallback(
    async (searchData?: NotificationSearch) => {
      dispatch(setIsLoading(true))
      try {
        const param = searchData || {
          pageIndex,
          pageSize,
          ...searchValues,
        }
        console.log(param)
        const response = await notificationService.getDataSanPham(param)
        if (response != null && response.data != null) {
          const data = response.data
          setNotificationList(data.items)
          setDataPage({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          })
        }
        dispatch(setIsLoading(false))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
        dispatch(setIsLoading(false))
      }
    },
    [pageIndex, pageSize]
  )

  const handleShowModal = (notification: Notification | undefined = undefined) => {
    setCurrentNotification(notification)
    setIsOpenModal(true)
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  const handleCloseDetail = () => {
    setIsOpenDetail(false)
  }

  const handleCloseSendEmail = () => {
    setIsOpenSendEmail(false)
  }

  const handleSendEmail = async (record: Notification) => {
    try {
      if (!record.email) {
        toast.error("Không thể gửi email vì không có địa chỉ email.");
        return;
      }
      const content = `
            <div>
                <h2>Thông báo sản phẩm</h2>
                <p><strong>Người gửi:</strong> ${record.fromUserName}</p>
                <p><strong>Nội dung:</strong> ${record.message}</p>
            </div>
        `;
      const subject = "Thông báo sản phẩm";
      const toAddress = record.email;
      const response = await notificationService.SendEmail(subject, content, toAddress, record.id);
      if (response.status) {
        toast.success("Gửi email thành công");
        handleFetch();
      } else {
        toast.error("Gửi email thất bại");
      }
    } catch (error) {
      toast.error("Gửi email thất bại");
    }
  };

  useEffect(() => {
    handleFetch()
    userService
      .getDropdown()
      .then((res) => {
        setUserList(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
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
      {isPanelVisible && (
        <Search
          handleSearch={handleSearch} dropdownUser={userList}
        />
      )}

      <Card style={{ padding: '0px' }} className={classes.customCardShadow}>
        <Flex alignItems="center" justifyContent="end" margin="10px">
          <Typography.Text strong>{pageSizeInfo}</Typography.Text>
        </Flex>
        <div className="table-responsive">
          <Table<Notification>
            columns={tableColumns}
            bordered
            dataSource={notificationList}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            pagination={false}
            loading={loading}
            tableLayout="fixed"
          />
        </div>
        <Pagination
          className="mt-2"
          total={dataPage?.totalCount}
          showTotal={(total, range) => {
            const pageSizeInfo = `${range[0]}-${range[1]} trong ${total} thông báo`
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
        dropdownUser={userList}
        data={currentNotification}
      />
      <Detail
        isOpen={isOpenDetail}
        data={currentNotification!}
        dropdownUser={userList}
        onClose={handleCloseDetail}
      />
      <SendEmail
        isOpen={isOpenSendEmail}
        data={currentNotification!}
        onClose={handleCloseSendEmail}
      />
      <DanhSachGui
        isOpen={isOpenDanhSachGui}
        data={currentNotification!}
        onClose={() => {
          setIsOpenDanhSachGui(false)
        }}
      />
    </>
  )
}

export default withAuthorization(Page, '')
