
import { createEditType, tableLuongXuLyDataType } from "@/interface/LuongXuLy/LuongXuLy";
import { Form, FormProps, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { luongXuLyService } from "@/services/LuongXuLy/LuongXuLy.service";
import { toast } from "react-toastify";

interface Props {
    isOpen: boolean;
    LuongXuLy?: tableLuongXuLyDataType | null;
    onClose: () => void; //function callback
    onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
        formData: createEditType
    ) => {
        try {
            if (props.LuongXuLy) {
                const response = await luongXuLyService.Update(formData);
                if (response.status) {
                    toast.success("Chỉnh sửa thành công");
                    form.resetFields();
                    props.onSuccess();
                    props.onClose();
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await luongXuLyService.Create(formData);
                if (response.status) {
                    toast.success("Thêm mới thành công");
                    form.resetFields();
                    props.onSuccess();
                    props.onClose();
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra: " + error);
        }
    };

    const handleMapEdit = () => {
        form.setFieldsValue(props.LuongXuLy);
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        props.onClose();
    };

    useEffect(() => {
        setIsOpen(props.isOpen);
        if (props.LuongXuLy) {
            handleMapEdit();
        }
    }, [props.isOpen]);

    return (
        <Modal
            title={props.LuongXuLy != null ? "Chỉnh sửa luồng" : "Thêm mới luồng"}
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText="Xác nhận"
            cancelText="Đóng"
            width={600}
        >
            <Form
                layout="vertical"
                form={form}
                name="formCreateUpdate"
                style={{ maxWidth: 1000 }}
                onFinish={handleOnFinish}
                autoComplete="off"
            >
                {props.LuongXuLy && (
                    <Form.Item<createEditType> name="id" hidden>
                        <Input />
                    </Form.Item>
                )}
                {/* <Form.Item<createEditType>
                    label="id"
                    name="id"
                    rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item<createEditType>
                    label="Tên luồng xử lý"
                    name="tenLuongXuLy"
                    rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrUpdate;
