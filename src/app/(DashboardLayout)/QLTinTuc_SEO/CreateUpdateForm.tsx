"use client";
import { Checkbox, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import classes from "./page.module.css";
import {
    QLTinTuc_SEOType,
    createEditType,
} from "@/interface/QLTinTuc_SEO/QLTinTuc_SEO";
import { qLTinTuc_SEO } from "@/services/QLTinTuc_SEO/QLTinTuc_SEO.service";
interface CreateProps {
    isOpen: boolean;
    data?: QLTinTuc_SEOType;
    onClose: () => void;    
    onSuccess: () => void;
}

const convertChuyenMucToCreateEdit = (
    chuyenMuc: QLTinTuc_SEOType,
): createEditType => {
    return {
        Id: chuyenMuc.id,
        Note: chuyenMuc.note ?? "",
        Title: chuyenMuc.title ?? "",
        IsShow: chuyenMuc.isShow ?? false,
        Description: chuyenMuc.description ?? "",
        Type: chuyenMuc.type ?? "",
    };
};

const CreateUpdateForm: React.FC<CreateProps> = ({
    isOpen,
    data,
    onClose,
    onSuccess,
}: CreateProps) => {
    const [form] = Form.useForm();
    const handleFinish = async () => {
        const param = await form.validateFields();
        try {
            if (data) {
                const response = await qLTinTuc_SEO.Update({
                    ...param,
                    id: data.id,
                });
                if (response.status) {
                    toast.success("Cập nhật thành công");
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await qLTinTuc_SEO.Create(param);
                if (response.status) {
                    toast.success("Thêm mới thành công");
                } else {
                    toast.error(response.message);
                }
            }
            form.resetFields();
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Có lỗi xảy ra: " + error);
        }
    };
    const handleCancel = () => {
        onClose();
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue(convertChuyenMucToCreateEdit(data));
        } else {
            form.setFieldsValue({
                Name: "",
                Code: "",
                ThuTuHienThi: 0,
                IsShow: false,
                Slug: "",
                Description: "",
                Parentid: null,
            });
        }
    });
    return (
        <Modal
            title={
                <div style={{ textAlign: "center" }}>
                    {data ? "Chỉnh sửa SEO tin bài" : "Thêm mới SEO bài"}
                </div>
            }
            open={isOpen}
            onOk={() => handleFinish()}
            onCancel={handleCancel}
            okText="Lưu"
            cancelText="Đóng"
            width={600}
        >
            <Form
                layout="vertical"
                form={form}
                style={{ maxWidth: 1000 }}
                autoComplete="off"
            >
                <Form.Item<createEditType>
                    label={<strong>Tên loại thẻ Meta</strong>}
                    name="Title"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Select />
                </Form.Item>

                <Form.Item<createEditType>
                    label={<strong>Giá trị thẻ Meta</strong>}
                    name="Description"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập giá trị thẻ meta" />
                </Form.Item>

                <Form.Item<createEditType>
                    label={<strong>Kiểu hiển thị</strong>}
                    name="IsShow"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Select />
                </Form.Item>

                <Form.Item<createEditType>
                    label={<strong>Hiển thị trường thông tin</strong>}
                    name="IsShow"
                    valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item<createEditType>
                    label={<strong>Ghi chú</strong>}
                    name="Note"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default CreateUpdateForm;
