import { Checkbox, Form, FormProps, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DropdownOption } from "@/interface/general";
import { removeAccents } from "@/libs/CommonFunction";
import {
    createEditType,
    tableQLPage_KhaiThacDataType,
} from "@/interface/QLPage_KhaiThac/QLPage_KhaiThac";
import { QLPageKhaiThac } from "@/services/QLPage_KhaiThac/QLPage_KhaiThac.service";

interface Props {
    isOpen: boolean;
    QLPage_KhaiThac?: tableQLPage_KhaiThacDataType | null;
    onClose: () => void; //function callback
    onSuccess: () => void;
    dropDownOption: DropdownOption[];
    dropDownOptionApi: DropdownOption[];
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
        formData: createEditType,
    ) => {
        try {
            if (props.QLPage_KhaiThac) {
                const response = await QLPageKhaiThac.Update(formData);
                if (response.status) {
                    toast.success("Chỉnh sửa thành công");
                    form.resetFields();
                    props.onSuccess();
                    props.onClose();
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await QLPageKhaiThac.Create(formData);
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

    const handleChangeElemnet = (value: string) => {
        const valueEle = `[${value}]`;
        form.setFieldValue("elements", valueEle);
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        props.onClose();
    };

    useEffect(() => {
        setIsOpen(props.isOpen);
        if (props.QLPage_KhaiThac) {
            form.setFieldsValue({
                id: props.QLPage_KhaiThac.id,
                name: props.QLPage_KhaiThac.name,
                code: props.QLPage_KhaiThac.code,
                api: props.QLPage_KhaiThac.api,
            });
        } else {
            form.resetFields(); // Nếu không có dữ liệu thì reset form
        }
    }, [props.isOpen, props.QLPage_KhaiThac]);

    return (
        <Modal
            title={
                props.QLPage_KhaiThac != null
                    ? "Chỉnh sửa khai thác"
                    : "Thêm mới khai thác cổng"
            }
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
                initialValues={{
                    id: props.QLPage_KhaiThac?.id,
                    name: props.QLPage_KhaiThac?.name,
                    code: props.QLPage_KhaiThac?.code,
                    api: props.QLPage_KhaiThac?.api,
                }}
                onFinish={handleOnFinish}
                autoComplete="off"
            >
                {props.QLPage_KhaiThac && (
                    <Form.Item<createEditType> name="id" hidden>
                        <Input />
                    </Form.Item>
                )}

                <Form.Item<createEditType>
                    label="Name"
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
                    label="Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập thông tin này!",
                        },
                    ]}
                >
                    <Select options={props.dropDownOption} />
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
                    <Select options={props.dropDownOptionApi} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default CreateOrUpdate;
