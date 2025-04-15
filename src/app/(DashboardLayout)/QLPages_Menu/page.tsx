'use client'

import Flex from '@/components/shared-components/Flex'
import { DropdownTreeOptionAntd, ResponsePageInfo } from '@/interface/general'
import withAuthorization from '@/libs/authentication'
import { setIsLoading } from '@/store/general/GeneralSlice'
import { useDispatch, useSelector } from '@/store/hooks'
import {
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Dropdown,
  FormProps,
  MenuProps,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
  TableProps,
  Tag,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import Search from './search'
import CreateOrUpdate from './createOrUpdate'
import { toast } from 'react-toastify'
import classes from './page.module.css'
import {
  searchQLPages_MenuDataType,
  tableQLPages_MenuDataType,
} from '@/interface/QLPages_Menu/QLPages_Menu'
import { QLPageMenuService } from '@/services/QLPages_Menu/QLPages_Menu.service'
import QLPageMenuDetail from './detail'
import ViewOnlyTree from './Tree'
import { TreeItem } from '@nosferatu500/react-sortable-tree'
import { qlPagesService } from '@/services/QLPages/QLPages.service'
import ConfigCode from './ConfigCode'

const QLPages_Menu: React.FC = () => {
  const dispatch = useDispatch()

  const [listQLPage_Menu, setLstPages_Menu] = useState<
    tableQLPages_MenuDataType[]
  >([])

  const [dataPage, setDataPage] = useState<ResponsePageInfo>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)
  const [searchValues, setSearchValues] =
    useState<searchQLPages_MenuDataType | null>(null)
  const loading = useSelector((state) => state.general.isLoading)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentQLPageMenu, setCurrentQLPageMenu] =
    useState<tableQLPages_MenuDataType>()
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false)
  //ẩn hiện config
  const [isOpenConfig, setIsOpenConfig] = useState<boolean>(false)

  const [dropdownTree, setDropdownTree] = useState<DropdownTreeOptionAntd[]>([])
  const [pageDropdown, setPageDropdown] = useState<DropdownTreeOptionAntd[]>([])

  const [deleteId, setDeleteId] = useState<string>()

  const tableColumns: TableProps<tableQLPages_MenuDataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'center',
      width: '10%',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: '30%',
      render: (_: any, record: tableQLPages_MenuDataType) => (
        <span>{record.title}</span>
      ),
    },
    {
      title: 'Slug',
      key: 'slug',
      align: 'center',
      width: '25%',
      dataIndex: 'slug',
      render: (_: any, record: tableQLPages_MenuDataType) => (
        <span>{record.slug}</span>
      ),
    },
    // {
    //   title: 'Key slug',
    //   key: 'keySlug',
    //   dataIndex: 'keySlug',
    //   align: 'center',
    //   render: (_: any, record: tableQLPages_MenuDataType) => (
    //     <span>{record.keySlug}</span>
    //   ),
    // },
    {
      title: 'Api',
      dataIndex: 'api',
      key: 'api',
      width: '25%',
      align: 'center',
      render: (_: any, record: tableQLPages_MenuDataType) => (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {record.api}
        </Tag>
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      fixed: 'right',
      render: (_: any, record: tableQLPages_MenuDataType) => {
        let items: MenuProps['items'] = [
          {
            label: 'Chi tiết',
            key: '1',
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentQLPageMenu(record)
              setIsOpenDetail(true)
            },
          },
          {
            label: 'Chỉnh sửa',
            key: '2',
            icon: <EditOutlined />,
            onClick: () => {
              setCurrentQLPageMenu(record)
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
        if (!record.parentId) {
          const editedItems = [
            ...items.slice(0, 2),
            {
              label: 'Cấu hình HTML/CSS',
              key: '2',
              icon: <SettingOutlined />,
              onClick: () => {
                setCurrentQLPageMenu(record)
                setIsOpenConfig(true)
              },
            },
            ...items.slice(2),
          ]
          items = editedItems
        }
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
              open={deleteId === record.id}
              onConfirm={() => {
                handleDeleteQLTinTuc_Comment(record.id!)
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
    handleGetList()
  }

  const handleDeleteQLTinTuc_Comment = async (id: string) => {
    try {
      const response = await QLPageMenuService.Delete(id)
      if (response.status) {
        toast.success('Xóa bình luận thành công')
        handleGetList()
      } else {
        toast.error('Xóa bình luận thất bại')
      }
    } catch (error) {
      toast.error('Xóa bình luận thất bại')
    }
  }

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  const onFinishSearch: FormProps<searchQLPages_MenuDataType>['onFinish'] =
    async (values) => {
      try {
        setSearchValues(values)
        await handleGetList(values)
      } catch (error) {
        console.error('Lỗi khi lưu dữ liệu:', error)
      }
    }

  const handleGetList = useCallback(
    async (searchDataOverride?: searchQLPages_MenuDataType) => {
      dispatch(setIsLoading(true))
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        }
        const response = await QLPageMenuService.getDataByPage(searchData)
        if (response != null && response.data != null) {
          const data = response.data
          const items = data.items
          setLstPages_Menu(items)
          setDataPage({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          })
        }
        QLPageMenuService.getdropdownTree().then((res) => {
          if (res.status) {
            setDropdownTree(res.data)
          } else {
            console.error(res.message)
          }
        })
        dispatch(setIsLoading(false))
      } catch (error) {
        dispatch(setIsLoading(false))
      }
    },
    [pageIndex, pageSize]
  )

  const handleShowModal = (
    isEdit?: boolean,
    QLPageMenu?: tableQLPages_MenuDataType
  ) => {
    setIsOpenModal(true)
    if (isEdit) {
      setCurrentQLPageMenu(QLPageMenu)
    }
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  const handleCloseDetail = () => {
    setIsOpenDetail(false)
  }

  useEffect(() => {
    qlPagesService.getPageDropdown().then((res) => {
      if (res.status) {
        setPageDropdown(res.data)
      } else {
        console.log(res.errors)
      }
    })
    handleGetList()
  }, [handleGetList])

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
          icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
          className={classes.mgright5}
        >
          {isPanelVisible ? 'Ẩn tìm kiếm' : 'Tìm kiếm'}
        </Button> */}

        <Button
          onClick={() => {
            setCurrentQLPageMenu(undefined)
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
          QLPage_Menu={currentQLPageMenu}
          menuTree={listQLPage_Menu}
          dropdownList={dropdownTree}
          pageDropdown={pageDropdown}
        />
      </Flex>
      {/* {isPanelVisible && (
        <Search onFinish={onFinishSearch} pageDropdown={pageDropdown} />
      )} */}
      <QLPageMenuDetail
        qlPageMenu={currentQLPageMenu!}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <Card style={{ padding: '0px' }} className={classes.customCard}>
        <Row>
          <Col span={16}>
            <div className="table-responsive">
              <Table
                columns={tableColumns}
                bordered
                dataSource={listQLPage_Menu}
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
          </Col>
          <Col span={8} className={classes.customCardTree}>
            <ViewOnlyTree data={listQLPage_Menu as TreeItem[]} />
          </Col>
        </Row>
      </Card>
      <ConfigCode
        isOpen={isOpenConfig}
        onClose={() => {
          setIsOpenConfig(false)
        }}
        data={currentQLPageMenu!}
        onSuccess={hanleCreateEditSuccess}
      />
    </>
  )
}

export default withAuthorization(QLPages_Menu, '')
