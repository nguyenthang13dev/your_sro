import {
  createEditType,
  tableTrangThaiLuongXuLyDataType,
} from "@/interface/TrangThaiLuongXuLy/TrangThaiLuongXuLy";
import { Checkbox, Form, FormProps, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { trangThaiLuongXuLyService } from "@/services/TrangThaiLuongXuLy/TrangThaiLuongXuLy.service";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  TrangThaiLuongXuLy?: tableTrangThaiLuongXuLyDataType | null;
  luongXuLyId: string;
  onClose: () => void; //function callback
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    formData = { ...formData, idLuongXuLy: props.luongXuLyId };

    try {
      if (props.TrangThaiLuongXuLy) {
        const response = await trangThaiLuongXuLyService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await trangThaiLuongXuLyService.Create(formData);
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
    form.setFieldsValue(props.TrangThaiLuongXuLy);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.TrangThaiLuongXuLy) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={
        props.TrangThaiLuongXuLy != null
          ? "Chỉnh sửa trạng thái luồng xử lý"
          : "Thêm mới trạng thái luồng xử lý"
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
        {props.TrangThaiLuongXuLy && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        {/* 
                <Form.Item<createEditType>
                    label="id"
                    name="id"
                    rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                >
                    <Input />
                </Form.Item> */}

        <Form.Item<createEditType>
          label="Tên trạng thái luồng xử lý"
          name="tenTrangThaiXuLy"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          label="Mã trạng thái luồng xử lý"
          name="maTrangThaiXuLy"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          label="Là trạng thái bắt đầu"
          name="isBatDau"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item<createEditType>
          label="Là trạng thái kết thúc"
          name="isKetThuc"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item<createEditType> label="Mô tả ngắn" name="moTa">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
