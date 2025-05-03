// "use client";
// import Flex from "@/components/shared-components/Flex";
// import { DropdownOption, ResponsePageInfo } from "@/interface/general";
// import { tableOrderCreateVMDataType, tableOrderSearchVMDataType } from "@/interface/Order/Order";
// import { orderService } from "@/services/order/order.service";
// import { setIsLoading } from "@/store/general/GeneralSlice";
// import { useSelector } from "@/store/hooks";
// import { AppDispatch } from "@/store/store";
// import
//     {
//         CloseOutlined,
//         DeleteOutlined,
//         DownOutlined,
//         EditOutlined,
//         EyeOutlined,
//         SearchOutlined
//     } from "@ant-design/icons";
// import
//     {
//         Button,
//         Card,
//         Dropdown,
//         MenuProps,
//         Pagination,
//         Popconfirm,
//         Space,
//         Table,
//         TableColumnsType
//     } from "antd";
// import { useCallback, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import classes from "./page.module.css";
// // import Search from "./search";
// // import Detail from "./detail";

// const OrderPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [groupRoleList, setGroupRoleList] = useState<tableOrderCreateVMDataType[]>(
//     []
//   );

//   const [dropVaiTros, setDropVaiTros] = useState<DropdownOption[]>([]);
//   const [pageSizeInfo, setPageSizeInfo] = useState("loading...");
//   const [dataPage, setDataPage] = useState<ResponsePageInfo>();
//   const [pageSize, setPageSize] = useState<number>(20);
//   const [pageIndex, setPageIndex] = useState<number>(1);
//   const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
//   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
//   const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
//   const [searchValues, setSearchValues] = useState< | null>(
//     null
//   );
//   const loading = useSelector((state) => state.general.isLoading);
//   const [currentGroupRole, setCurrentGroupRole] = useState<
//     tableOrderCreateVMDataType | undefined
//   >();

//   const tableColumns: TableColumnsType<tableOrderCreateVMDataType> = [
//     {
//       title: "STT",
//       dataIndex: "index",
//       key: "index",
//       align: "center",
//       width: "1%",
//       render: (_: any, __: tableOrderCreateVMDataType, index: number) =>
//         pageSize * (pageIndex - 1) + index + 1,
//     },
//     {
//       title: "Mã nhóm vai trò",
//       dataIndex: "code",
//       align: "center",
//       render: (_: any, record: tableOrderCreateVMDataType) => (
//         <span>{""}</span>
//       ),
//     },
   
//     {
//       title: "Thao tác",
//       dataIndex: "actions",
//       align: "center",
//       width: "5%",
//       fixed: "right",
//       render: (_: any, record: tableOrderCreateVMDataType) => {
//         const items: MenuProps["items"] = [
//           {
//             label: "Chi tiết",
//             key: "1",
//             icon: <EyeOutlined />,
//             onClick: () => {
//               setCurrentGroupRole(record);
//               setIsOpenDetail(true);
//             },
//           },
//           {
//             label: "Chỉnh sửa",
//             key: "2",
//             icon: <EditOutlined />,
//             onClick: () => {
//               handleShowModal(record);
//             },
//           },
//           {
//             label: (
//               <Popconfirm
//                 key={`Delete${record.id}`}
//                 title="Xác nhận xóa"
//                 description={
//                   <span>Bạn có muốn xóa nhóm vai trò này không?</span>
//                 }
//                 okText="Xóa"
//                 cancelText="Hủy"
//                 onConfirm={() => {
//                   handleDelete(record?.id);
//                 }}
//                 trigger="click"
//                 forceRender
//               >
//                 <span>Xóa</span>
//               </Popconfirm>
//             ),
//             key: "3",
//             icon: <DeleteOutlined />,
//             danger: true,
//           },
//         ];
//         return (
//           <>
//             <Dropdown menu={{ items }} trigger={["click"]}>
//               <Button
//                 onClick={(e) => e.preventDefault()}
//                 color="primary"
//                 size="small"
//               >
//                 <Space>
//                   Thao tác
//                   <DownOutlined />
//                 </Space>
//               </Button>
//             </Dropdown>
//           </>
//         );
//       },
//     },
//   ];

//   const handleCreateEditSuccess = () => {
//     handleFetch();
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const response = await orderService.Delete(id);
//       if (response.status) {
//         toast.success("Xóa thành công");
//         handleFetch();
//       } else {
//         toast.error("Xóa thất bại");
//       }
//     } catch (error) {
//       console.error("Lỗi khi lưu dữ liệu:", error);
//       toast.error("Có lỗi xảy ra");
//     }
//   };

//   const toggleSearch = () => {
//     setIsPanelVisible(!isPanelVisible);
//   };

//   const handleSearch = async (values: tableOrderCreateVMDataType) => {
//     try {
//       setSearchValues(values);
//       await handleFetch(values);
//     } catch (error) {
//       console.error("Lỗi khi lưu dữ liệu:", error);
//     }
//   };

//   const handleFetch = useCallback(
//     async (searchData?: tableOrderSearchVMDataType) => {
//       dispatch(setIsLoading(true));
//       try {
//         const param = searchData || {
//           pageIndex,
//           pageSize,
//           ...searchValues,
//         };

//         const response = await orderService.GetDate(param);
//         if (response != null && response.data != null) {
//           const data = response.data;
//           setGroupRoleList(data.items);
//           setDataPage({
//             pageIndex: data.pageIndex,
//             pageSize: data.pageSize,
//             totalCount: data.totalCount,
//             totalPage: data.totalPage,
//           });
//         }
//         dispatch(setIsLoading(false));
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu:", error);
//         dispatch(setIsLoading(false));
//       }
//     },
//     [pageIndex, pageSize]
//   );

//   const handleShowModal = (
//     groupRole: tableOrderCreateVMDataType | undefined = undefined
//   ) => {
//     setCurrentGroupRole(groupRole);
//     setIsOpenModal(true);
//   };

//   const handleClose = () => {
//     setIsOpenModal(false);
//   };

//   const handleCloseDetail = () => {
//     setIsOpenDetail(false);
//   };

//   useEffect(() => {
//     handleFetch();
//   }, []);

//   return (
//     <>
//       <Flex
//         alignItems="center"
//         justifyContent="end"
//         className={classes.mgButton10}
//       >
//         <Button
//           onClick={() => toggleSearch()}
//           type="primary"
//           size="small"
//           icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
//           className={classes.mgright5}
//         >
//           {isPanelVisible ? "Ẩn tìm kiếm" : "Tìm kiếm"}
//         </Button>
//       </Flex>
//       {/* {isPanelVisible && (
//         <Search
//           dropdownLoaiHinhDVCC={dropdownLoaiHinhDVCC}
//           dropdownCacTienIch={dropdownCacTienIch}
//           dropdownLoaiHinhGD={dropdownLoaiHinhGD}
//           handleSearch={handleSearch}
//         />
//       )} */}

//       <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
//         <div className="table-responsive">
//           <Table
//             columns={tableColumns}
//             bordered
//             dataSource={groupRoleList}
//             rowKey="id"
//             scroll={{ x: "max-content" }}
//             pagination={false}
//             loading={loading}
//           />
//         </div>
//         <Pagination
//           className="mt-2"
//           total={dataPage?.totalCount}
//           showTotal={(total, range) =>
//             range[0] + "-" + range[1] + " trong " + total + " dữ liệu"
//           }
//           pageSize={pageSize}
//           defaultCurrent={1}
//           onChange={(e) => {
//             setPageIndex(e);
//           }}
//           onShowSizeChange={(current, pageSize) => {
//             setPageIndex(current);
//             setPageSize(pageSize);
//           }}
//           size="small"
//           align="end"
//         />
//       </Card>

    
//       {/* <Detail
//         isOpen={isOpenDetail}
//         data={currentGroupRole!}
//         dropdownLoaiHinhDVCC={dropdownLoaiHinhDVCC}
//         dropdownCacTienIch={dropdownCacTienIch}
//         dropdownLoaiHinhGD={dropdownLoaiHinhGD}
//         onClose={handleCloseDetail}
//       /> */}
//     </>
//   );
// };

// export default GroupRole;
