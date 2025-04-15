"use client";

import type {
    createEditType,
    tableApi_propertyDataType,
    tableApi_Responsepro,
    tableQLPage_ApiDataType,
} from "@/interface/QLPage_Api/QLPage_Api";
import {
    Checkbox,
    Form,
    type FormProps,
    Input,
    Modal,
    Select,
    Button,
    Space,
    Divider,
    Table,
    Row,
    Col,
} from "antd";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { qLPage_ApiService } from "@/services/QLPage_Api/QLPage_Api.service";
import { toast } from "react-toastify";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { DropdownOptionAntd } from "@/interface/general";
import { ColumnsType } from "antd/es/table";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

interface Props {
    isOpen: boolean;
    QLPage_Api?: tableQLPage_ApiDataType | null;
    onClose: () => void; //function callback
    onSuccess: () => void;
    dropDownDanhMuc: DropdownOptionAntd[];
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [tablePropsData, setTableApiData] = useState<
        tableApi_propertyDataType[]
    >([]);

    const [htmlCode, setHtmlCode] = useState<string>(
        props.QLPage_Api?.html ?? "",
    );
    const [cssCode, setCssCode] = useState<string>(props.QLPage_Api?.css ?? "");

    const [lstProps, setLstProps] = useState<tableApi_Responsepro[]>([]);
    const dataTypeOptions = [
        { label: "String", value: "string" },
        { label: "Number", value: "number" },
        { label: "Boolean", value: "boolean" },
        { label: "Date", value: "date" },
        { label: "Object", value: "object" },
        { label: "Array", value: "array" },
    ];

    const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
        formData: createEditType,
    ) => {
        try {
            if (props.QLPage_Api) {
                formData.api_Responsepros = lstProps;
                formData.html = htmlCode;
                formData.css = cssCode;
                const response = await qLPage_ApiService.Update(formData);
                if (response.status) {
                    toast.success("Chỉnh sửa thành công");
                    form.resetFields();
                    props.onSuccess();
                    props.onClose();
                } else {
                    toast.error(response.message);
                }
            } else {
                formData.api_Responsepros = lstProps;
                formData.html = htmlCode;
                formData.css = cssCode;
                const response = await qLPage_ApiService.Create(formData);
                if (response.status) {
                    toast.success("Thêm mới thành công");
                    form.resetFields();
                    props.onSuccess();
                    props.onClose();
                    setLstProps([]);
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra: " + error);
        }
    };

    const handleCheckboxChange = (
        key: string,
        field: "isShow" | "isDownload",
        checked: boolean,
    ) => {
        setLstProps((prevData) =>
            prevData.map((item) =>
                item.name === key ? { ...item, [field]: checked } : item,
            ),
        );
    };

    const columns: ColumnsType<tableApi_Responsepro> = [
        {
            title: "Tên thuộc tính",
            key: "label",
            dataIndex: "label",
            render: (_, record: tableApi_Responsepro) => <>{record.label}</>,
        },
        {
            title: "Mã thuộc tính",
            key: "name",
            dataIndex: "name",
            render: (_, record: tableApi_Responsepro) => <>{record.name}</>,
        },
        {
            title: "Kiểu dữ liệu",
            key: "type",
            dataIndex: "type",
            render: (_, record: tableApi_Responsepro) => <>{record.type}</>,
        },
        {
            title: "Hiển thị?",
            key: "isShow",
            dataIndex: "isShow",
            render: (_, record: tableApi_Responsepro) => (
                <Checkbox
                    value={record.isShow}
                    onChange={(e) => {
                        handleCheckboxChange(
                            record.name,
                            "isShow",
                            e.target.checked,
                        );
                    }}
                />
            ),
        },
        {
            title: "Download file?",
            key: "isDownload",
            dataIndex: "isDownload",
            render: (_, record: tableApi_Responsepro) => (
                <Checkbox
                    value={record.isDownload}
                    onChange={(e) => {
                        handleCheckboxChange(
                            record.name,
                            "isDownload",
                            e.target.checked,
                        );
                    }}
                />
            ),
        },
    ];

    const handleMapEdit = () => {
        form.setFieldsValue(props.QLPage_Api);
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        props.onClose();
    };

    const handleGetDropDownDtos = async (dto: string) => {
        try {
            const responsedt = await qLPage_ApiService.GetDsProperty(dto);
            setLstProps(responsedt.data);
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    useEffect(() => {
        setIsOpen(props.isOpen);
        if (props.QLPage_Api) {
            handleMapEdit();
        }
    }, [props.isOpen]);

    return (
        <Modal
            title={
                props.QLPage_Api != null
                    ? "Chỉnh sửa quản lý api"
                    : "Thêm mới quản lý api"
            }
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText="Xác nhận"
            cancelText="Đóng"
            width={800}
        >
            <Form
                layout="vertical"
                form={form}
                name="formCreateUpdate"
                style={{ maxWidth: 1000 }}
                onFinish={handleOnFinish}
                autoComplete="off"
            >
                {props.QLPage_Api && (
                    <Form.Item<createEditType> name="id" hidden>
                        <Input />
                    </Form.Item>
                )}

                <Form.Item<createEditType>
                    label="Tên api"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<createEditType>
                    label="Api"
                    name="api"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<createEditType>
                    label="Method"
                    name="method"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Select
                        options={[
                            { label: "GET", value: "GET" },
                            { label: "POST", value: "POST" },
                            { label: "PUT", value: "PUT" },
                            { label: "DELETE", value: "DELETE" },
                        ]}
                    />
                </Form.Item>

                <Form.Item<createEditType>
                    label="Dữ liệu trả về"
                    name="codeResponse"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Select
                        options={props.dropDownDanhMuc}
                        onChange={(e) => {
                            handleGetDropDownDtos(e);
                        }}
                        placeholder="Nhập danh mục"
                    />
                </Form.Item>
                <Form.Item<createEditType>
                    label="Có khai thác?"
                    name="isKhaiThac"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item<createEditType>
                    label="Có tìm kiếm?"
                    name="isSearch"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item<createEditType>
                    label="Là bảng?"
                    name="isTable"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item<createEditType>
                    label="Là khối nội dung trang chủ?"
                    name="isGrid"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>

                <Row gutter={[10, 10]}>
                    <Col span={12}>
                        <h3>HTML Code</h3>
                        <CodeMirror
                            value={htmlCode}
                            maxHeight="500px"
                            extensions={[html()]}
                            onChange={(value) => setHtmlCode(value)}
                        />
                    </Col>
                    <Col span={12}>
                        <h3>CSS Code</h3>
                        <CodeMirror
                            value={cssCode}
                            extensions={[css()]}
                            maxHeight="500px"
                            onChange={(value) => setCssCode(value)}
                        />
                    </Col>
                    <Row>
                        <Col span={24}>
                            {/* Preview */}
                            <iframe
                                srcDoc={`<style>${cssCode}</style>${htmlCode}`}
                                style={{
                                    width: "100%",
                                    height: "300px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </Col>
                    </Row>
                </Row>

                <Table dataSource={lstProps} columns={columns} />
                <Divider orientation="left">Tham số (Parameters)</Divider>
                <Form.List name="api_params">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{ display: "flex", marginBottom: 8 }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, "name"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập tên tham số",
                                            },
                                        ]}
                                        style={{ width: "200px" }}
                                    >
                                        <Input placeholder="Tham số" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, "label"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập tên tham số",
                                            },
                                        ]}
                                        style={{ width: "200px" }}
                                    >
                                        <Input placeholder="Tên tham số" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, "type"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng chọn kiểu dữ liệu",
                                            },
                                        ]}
                                        style={{ width: "150px" }}
                                    >
                                        <Select
                                            placeholder="Kiểu dữ liệu"
                                            options={dataTypeOptions}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, "isRequired"]}
                                        valuePropName="checked"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Checkbox>Bắt buộc</Checkbox>
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, "isSearch"]}
                                        valuePropName="checked"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Checkbox>Hiển thị tìm kiếm</Checkbox>
                                    </Form.Item>

                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => remove(name)}
                                    />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Thêm tham số
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};
export default CreateOrUpdate;
