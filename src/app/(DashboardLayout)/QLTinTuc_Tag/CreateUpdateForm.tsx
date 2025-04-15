"use client";

import { Checkbox, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import classes from "./page.module.css";
import {
    createEditType,
    QLTinTuc_TagType,
} from "@/interface/QLTinTuc_Tag/QLTinTuc_Tag";
import { qLTinTuc_TagService } from "@/services/QLTinTuc_Tag/QLTinTuc_Tag.service";

interface CreateProps {
    isOpen: boolean;
    data?: QLTinTuc_TagType;
    onClose: () => void;
    onSuccess: () => void;
}

const convertChuyenMucToCreateEdit = (
    chuyenMuc: QLTinTuc_TagType,
): createEditType => {
    return {
        Id: chuyenMuc.id,
        Name: chuyenMuc.name ?? "",
        IsShow: chuyenMuc.isShow ?? false,
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
                const response = await qLTinTuc_TagService.Update({
                    ...param,
                    id: data.id,
                });
                if (response.status) {
                    toast.success("Cập nhật tag thành công");
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await qLTinTuc_TagService.Create(param);
                if (response.status) {
                    toast.success("Thêm mới tag thành công");
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
                    {data ? "Chỉnh sửa tag" : "Thêm mới tag"}
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
                <Form.Item
                    label={<strong>Tên tags</strong>}
                    name="Name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên chuyên mục" />
                </Form.Item>

                <Form.Item
                    label={<strong>Hiển thị</strong>}
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
            </Form>
        </Modal>
    );
};
export default CreateUpdateForm;
