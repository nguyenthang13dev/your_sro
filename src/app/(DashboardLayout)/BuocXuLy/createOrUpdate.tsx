import {
    createEditType,
    tableBuocXuLyDataType,
} from "@/interface/BuocXuLy/BuocXuLy";
import { Checkbox, Form, FormProps, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { buocXuLyService } from "@/services/BuocXuLy/BuocXuLy.service";
import { toast } from "react-toastify";
import { DropdownOptionAntd } from "@/interface/general";
import { fetchDropdownFaceLift } from "@/utils/fetchDropdownFaceLift";
import { trangThaiLuongXuLyService } from "@/services/TrangThaiLuongXuLy/TrangThaiLuongXuLy.service";
import { roleService } from "@/services/role/role.service";
import { removeAccents } from "@/libs/CommonFunction";
import { fetchDropdown } from "@/utils/fetchDropdown";

interface Props {
    isOpen: boolean;
    BuocXuLy?: tableBuocXuLyDataType | null;
    onClose: () => void; //function callback
    onSuccess: () => void;
    dropTrangThaiLuongs: DropdownOptionAntd[];
    setDropTrangThaiLuongs: React.Dispatch<
        React.SetStateAction<DropdownOptionAntd[]>
    >;
    idLuongXuLy: string;
    dropVaiTros: DropdownOptionAntd[];
    setDropVaiTros: React.Dispatch<React.SetStateAction<DropdownOptionAntd[]>>;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
        formData: createEditType
    ) => {
        try {
            formData.idLuongXuLy = props.idLuongXuLy;

            if (props.BuocXuLy) {
                const response = await buocXuLyService.Update(formData);
                if (response.status) {
                    toast.success("Chỉnh sửa thành công");
                    form.resetFields();
                    props.onSuccess();
                    props.onClose();
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await buocXuLyService.Create(formData);
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
        form.setFieldsValue(props.BuocXuLy);
        form.setFieldsValue({
            idsVaiTroTiepNhan: props.BuocXuLy?.vaiTroTiepNhan_respone
        });
        form.setFieldsValue({
            idsVaiTroCC: Array.isArray(props.BuocXuLy?.vaiTroCC_respone)
                ? props.BuocXuLy?.vaiTroCC_respone
                : [],
        });
    };

    const handleSetDropdownTrangThaiLuong = async () => {
        await Promise.all([
            fetchDropdownFaceLift(
                props.dropTrangThaiLuongs,
                () => trangThaiLuongXuLyService.getDropdownByIdLuong(props.idLuongXuLy),
                props.setDropTrangThaiLuongs
            ),
        ]);
    };

    const handleSetDropdownVaiTro = async () => {
        await Promise.all([
            fetchDropdown(
                props.dropVaiTros,
                () => roleService.getDropDownVaiTroIds(""),
                props.setDropVaiTros
            ),
        ]);
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        props.onClose();
    };

    useEffect(() => {
        handleSetDropdownTrangThaiLuong();
        handleSetDropdownVaiTro();
        setIsOpen(props.isOpen);

        if (props.BuocXuLy) {
            handleMapEdit();
        }
    }, [props.isOpen]);

    return (
        <Modal
            title={
                props.BuocXuLy != null ? "Chỉnh sửa bước xử lý" : "Thêm mới bước xử lý"
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
                onFinish={handleOnFinish}
                autoComplete="off"
            >
                {props.BuocXuLy && (
                    <Form.Item<createEditType> name="id" hidden>
                        <Input />
                    </Form.Item>
                )}

                <Form.Item<createEditType>
                    label="Tên bước xử lý"
                    name="tenBuocXuLy"
                    rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<createEditType>
                    label="Mã bước xử lý"
                    name="maBuocXuLy"
                    rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<createEditType>
                    label="Trạng thái bắt đầu"
                    name="idTrangThaiBatDau"
                    rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                >
                    <Select
                        placeholder="Chọn trạng thái bắt đầu"
                        options={props.dropTrangThaiLuongs.map((item) => ({
                            ...item,
                            value: item.value.toLowerCase(),
                        }))}
                        fieldNames={{ label: "label", value: "value" }}
                        allowClear
                        showSearch
                        filterOption={(input, option) => {
                            return removeAccents(option?.label ?? "")
                                .toLowerCase()
                                .includes(removeAccents(input).toLowerCase());
                        }}
                    />
                </Form.Item>
                <Form.Item<createEditType>
                    label="Trạng thái kết thúc"
                    name="idTrangThaiKetThuc"
                    rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                >
                    <Select
                        placeholder="Chọn trạng thái kết thúc"
                        options={props.dropTrangThaiLuongs.map((item) => ({
                            ...item,
                            value: item.value.toLowerCase(),
                        }))}
                        fieldNames={{ label: "label", value: "value" }}
                        allowClear
                        showSearch
                        filterOption={(input, option) => {
                            return removeAccents(option?.label ?? "")
                                .toLowerCase()
                                .includes(removeAccents(input).toLowerCase());
                        }}
                    />
                </Form.Item>
                <Form.Item<createEditType>
                    label="Vai trò tiếp nhận"
                    name="idsVaiTroTiepNhan"
                >
                    <Select
                        placeholder="Chọn nhiều vai trò"
                        options={props.dropVaiTros.map((item) => ({
                            ...item,
                            value: item.value.toLowerCase(),
                        }))}
                        fieldNames={{ label: "label", value: "value" }}
                        allowClear
                        showSearch
                        filterOption={(input, option) => {
                            return removeAccents(option?.label ?? "")
                                .toLowerCase()
                                .includes(removeAccents(input).toLowerCase());
                        }}
                        value={props.BuocXuLy?.vaiTroTiepNhan_respone}
                    />
                </Form.Item>
                <Form.Item<createEditType> label="Vai trò CC" name="idsVaiTroCC">
                    <Select
                        mode="multiple"
                        placeholder="Chọn nhiều vai trò"
                        options={props.dropVaiTros.map((item) => ({
                            ...item,
                            value: item.value.toLowerCase(),
                        }))}
                        fieldNames={{ label: "label", value: "value" }}
                        allowClear
                        showSearch
                        filterOption={(input, option) => {
                            return removeAccents(option?.label ?? "")
                                .toLowerCase()
                                .includes(removeAccents(input).toLowerCase());
                        }}
                    />
                </Form.Item>
                <Form.Item<createEditType>
                    label="Là bước trả về"
                    name="isBuocTraVe"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrUpdate;
