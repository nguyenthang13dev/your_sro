"use client";;
import {
    createEditType,
    tableQLTinTucDataType,
} from "@/interface/qlTinTuc/qlTinTuc";
import {
    Checkbox,
    DatePicker,
    Form,
    FormProps,
    Input,
    Select,
    UploadFile,
    Row,
    Col,
    Button,
    Card,
    Drawer,
} from "antd";
import React, { useEffect, useState } from "react";
import { qlTinTucService } from "@/services/qlTinTuc/qlTinTuc.service";
import { DropdownOption } from "@/interface/general";
import { toast } from "react-toastify";
import UploadFiler from "@/libs/UploadFilter";
import dayjs from "dayjs";
import LoaiTinTucConstant from "@/constants/LoaiTinTucConstant";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // import ReactQuill
import "react-quill/dist/quill.snow.css";
import UploadImageCrop from "./UploadImageCrop";
import { PlusOutlined } from "@ant-design/icons";
import CustomEditor from "./CustomEditor";
import CKFinderComponent from "@/components/shared-components/CkFinder";

const StaticFileUrl = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL;

interface Props {
    isOpen: boolean;
    qlTinTuc?: tableQLTinTucDataType | null;
    istintuc?: string | null;
    dropdownChuyenMuc?: DropdownOption[];
    dropdownTag?: DropdownOption[];
    onClose: () => void;
    onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [fileListImport, setFileListImport] = useState<UploadFile[]>([]);
    const [uploadedData, setUploadedData] = useState<string[]>([]);
    const [uploadedDataImage, setUploadedDataImage] = useState<string[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const loaiTinTucOptions = LoaiTinTucConstant.getDropdownList();
    const [editorValue, setEditorValue] = useState<string>("");

    const [data, setData] = useState<string>("");

    const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
        formData: createEditType,
    ) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("loaiTin", formData.loaiTin ?? "");
            formDataToSend.append("title", formData.title ?? "");
            formDataToSend.append("keyWord", formData.keyWord ?? "");
            formDataToSend.append(
                "description",
                formData.description?.toString() ?? "",
            );
            formDataToSend.append("isHot", formData.isHot?.toString() ?? "");
            formDataToSend.append("image", formData.image ?? "");
            formDataToSend.append("status", formData.status ?? "");
            formDataToSend.append(
                "publicDate",
                formData.publicDate
                    ? new Date(formData.publicDate).toISOString()
                    : "",
            );
            formDataToSend.append("content", formData.content ?? "");
            if (uploadedData.length > 0) {
                formData.fileDinhKemId = uploadedData[0];
            }
            if (uploadedDataImage.length > 0) {
                formData.ImageId = uploadedDataImage[0];
            }
            formDataToSend.append(
                "taiLieuDinhKiem",
                formData.taiLieuDinhKiem ?? "",
            );
            formDataToSend.append("slugTitle", formData.slugTitle ?? "");
            formDataToSend.append(
                "fileDinhKemId",
                formData.fileDinhKemId ?? "",
            );
            formDataToSend.append("ImageId", formData.ImageId ?? "");

            let response;
            if (props.qlTinTuc) {
                formDataToSend.append("id", formData.id ?? "");

                response = await qlTinTucService.Update(formDataToSend);
            } else {
                response = await qlTinTucService.Create(formDataToSend);
            }

            const titlemes = LoaiTinTucConstant.getDropdownList().find(
                (item) => item.value === formData.loaiTin,
            )?.label;

            if (response.status) {
                toast.success(
                    props.qlTinTuc
                        ? `Chỉnh sửa ${titlemes} thành công`
                        : `Thêm mới ${titlemes} thành công`,
                );
                form.resetFields();
                setUploadedData([]);
                setUploadedDataImage([]);
                setFileListImport([]);
                setFileList([]);
                setImagePreview(null);
                props.onSuccess();
                props.onClose();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra: " + error);
        }
    };

    const handleMapEdit = () => {
        form.setFieldsValue({
            id: props.qlTinTuc?.id,
            title: props.qlTinTuc?.title,
            keyWord: props.qlTinTuc?.keywords,
            description: props.qlTinTuc?.description,
            image: props.qlTinTuc?.image,
            status: props.qlTinTuc?.status,
            isHot: props.qlTinTuc?.isHot,
            publicDate: props.qlTinTuc?.publicDate
                ? dayjs(props.qlTinTuc?.publicDate)
                : null,
            content: props.qlTinTuc?.content,
            taiLieuDinhKiem: props.qlTinTuc?.taiLieuDinhKiem,
            slugTitle: props.qlTinTuc?.slugTitle,
            loaiTin: props.qlTinTuc?.loaiTin,
        });
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        setFileListImport([]);
        setFileList([]);
        setImagePreview(null);
        props.onClose();
    };

    const handleChangeEditor = (value: string) => {
        setEditorValue(value); // Update editor value on change
    };
    // const toolbarOptions = [
    //     ["bold", "italic", "underline", "strike"], // toggled buttons
    //     ["blockquote", "code-block"],
    //     ["link", "image", "video", "formula"],

    //     [{ header: 1 }, { header: 2 }], // custom button values
    //     [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    //     [{ script: "sub" }, { script: "super" }], // superscript/subscript
    //     [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    //     [{ direction: "rtl" }], // text direction

    //     [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    //     [{ header: [1, 2, 3, 4, 5, 6, false] }],

    //     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    //     [{ font: [] }],
    //     [{ align: [] }],

    //     ["clean"], // remove formatting button
    // ];
    // const module1: QuillOptionsStatic = {
    //     toolbar: toolbarOptions,
    // };

    useEffect(() => {
        setIsOpen(props.isOpen);
        if (props.qlTinTuc) {
            handleMapEdit();
            if (props.qlTinTuc.taiLieuDinhKiem) {
                setFileListImport([
                    {
                        uid: "-1",
                        name: `tài liệu đính kèm`,
                        url: `${StaticFileUrl}/${props.qlTinTuc.taiLieuDinhKiem}`,
                    },
                ]);
            }
            if (props.qlTinTuc.image) {
                const imageUrl = `${StaticFileUrl}/${props.qlTinTuc.image}`;
                setImagePreview(imageUrl); // Gán ảnh để hiển thị
                // setFileList([
                //   {
                //     uid: "-1",
                //     name: "Hình ảnh tin tức",
                //     url: imageUrl,
                //     status: "done",
                //   },
                // ]);
            }
        } else {
            setFileList([]);
            setFileListImport([]);
        }
    }, [props.isOpen]);

    // useEffect(() => {
    //   setImagePreview(null);
    // }, [fileList]);

    return (
        <Drawer
            title={
                props.qlTinTuc != null
                    ? "Chỉnh sửa tin tức"
                    : "Thêm mới tin tức"
            }
            open={isOpen}
            onClose={handleCancel}
            width={"90%"}
            footer={
                <div style={{ textAlign: "right" }}>
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                        Hủy
                    </Button>
                    <Button type="primary">Lưu</Button>
                </div>
            }
        >
            <Form
                layout="vertical"
                form={form}
                name="formCreateUpdate"
                onFinish={handleOnFinish}
                autoComplete="off"
            >
                {props.qlTinTuc && (
                    <>
                        <Form.Item<createEditType> name="id" hidden>
                            <Input />
                        </Form.Item>
                        {/* <Form.Item<createEditType> name="image" hidden>
              <Input />
            </Form.Item> */}
                    </>
                )}
                <Row gutter={16}>
                    {/* Phân chia khu vực */}
                    <Col span={18}>
                        <Col span={24}>
                            <Form.Item<createEditType>
                                label="Tiêu đề"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập thông tin này!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tiêu đề" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item<createEditType>
                                label="Slug"
                                name="slugTitle"
                                rules={[
                                    {
                                        required: true,
                                        message: "Yêu cầu nhập slug",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập Slug" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item<createEditType>
                                label="Mô tả"
                                name="description"
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Nội dung"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập thông tin này!",
                                    },
                                ]}
                            >
                                <CustomEditor data={data} onChange={setData} />
                                {/* <ReactQuill
                                    modules={module1}
                                    value={editorValue}
                                    onChange={handleChangeEditor}
                                    theme="snow"
                                    placeholder="Nhập nội dung..."
                                /> */}
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item<createEditType>
                                label="Ghi chú"
                                name="ghichu"
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Col>

                    <Col span={6}>
                        <Row>
                            <Col span={24}>
                                <Card title="Chuyên mục tin tức">
                                    <Form.Item<createEditType> name="dsChuyenMuc">
                                        <Select
                                            mode="multiple"
                                            showSearch
                                            allowClear
                                            options={props.dropdownChuyenMuc}
                                        />
                                    </Form.Item>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Card title="Ảnh tin tức">
                                    <Form.Item<createEditType>>
                                        <UploadImageCrop
                                            maxFiles={1}
                                            fileList={fileList}
                                            setFileList={setFileList}
                                            type="ImageTinTuc"
                                            setUploadedData={
                                                setUploadedDataImage
                                            }
                                            existingImageUrl={
                                                props?.qlTinTuc?.image
                                                    ? `${StaticFileUrl}/${props.qlTinTuc.image}`
                                                    : null
                                            }
                                        />
                                    </Form.Item>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Card
                                    title="Tag tin bài"
                                    extra={
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            shape="circle"
                                        />
                                    }
                                >
                                    <Form.Item<createEditType> name="dsTag">
                                        <Select
                                            mode="multiple"
                                            showSearch
                                            allowClear
                                            options={props.dropdownTag}
                                        />
                                    </Form.Item>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Card title="Thời gian tin bài">
                                    <Col span={24}>
                                        <Form.Item label="Ngày đăng tin ">
                                            <DatePicker
                                                showTime
                                                format="DD/MM/YYYY HH:mm:ss"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Ngày hiển thị">
                                            <DatePicker
                                                showTime
                                                format="DD/MM/YYYY HH:mm:ss"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Ngày hết hiệu lực">
                                            <DatePicker
                                                showTime
                                                format="DD/MM/YYYY HH:mm:ss"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Card title="Tùy chọn tin bài">
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item<createEditType>
                                                label="Loại tin tức"
                                                name="loaiTin"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "Vui lòng nhập thông tin này!",
                                                    },
                                                ]}
                                                hidden={
                                                    props.istintuc
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <Select
                                                    options={loaiTinTucOptions}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Col span={24}>
                                        <Form.Item<createEditType>
                                            label="Tin nổi bật?"
                                            valuePropName="checked"
                                            name="isHost"
                                        >
                                            <Checkbox />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item<createEditType>
                                            valuePropName="checked"
                                            label="Cho phép bình luận?"
                                            name="isComment"
                                        >
                                            <Checkbox />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item<createEditType>
                                            valuePropName="checked"
                                            label="Phê duyệt?"
                                            name="isPheDuyet"
                                        >
                                            <Checkbox />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item<createEditType>
                                            label="Xuất bản?"
                                            valuePropName="checked"
                                            name="isXuatBan"
                                        >
                                            <Checkbox />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item<createEditType>
                                            label="Trang chủ?"
                                            valuePropName="checked"
                                            name="IsTrangChu"
                                        >
                                            <Checkbox />
                                        </Form.Item>
                                    </Col>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Card title="Tệp đính kèm">
                                    <Form.Item>
                                        <UploadFiler
                                            maxFiles={1}
                                            fileList={fileListImport}
                                            setFileList={setFileListImport}
                                            type="QLTinTuc"
                                            setUploadedData={setUploadedData}
                                        />
                                    </Form.Item>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {
                    <>
                        {/* {props.istintuc && (
              <Form.Item<createEditType> name="loaiTin" initialValue={props.istintuc} hidden>
                <Input />
              </Form.Item>
            )} */}
                    </>
                }
            </Form>

            <CKFinderComponent />
        </Drawer>
    );
};
export default CreateOrUpdate;
