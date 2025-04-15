import { createEditType, tableLinhVucThuongHieuDataType } from "@/interface/linhVucThuongHieu/linhVucThuongHieu";
import { Form, FormProps, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { linhVucThuongHieuService } from "@/services/linhVucThuongHieu/linhVucThuongHieu.service";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";

interface Props {
  isOpen: boolean;
  LinhVucThuongHieu?: tableLinhVucThuongHieuDataType | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.LinhVucThuongHieu) {
        const response = await linhVucThuongHieuService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa lĩnh vực thương hiệu thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await linhVucThuongHieuService.Create(formData);
        if (response.status) {
          toast.success("Thêm mới lĩnh vực thương hiệu thành công");
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
    form.setFieldsValue({
      id: props.LinhVucThuongHieu?.id,
      maLinhVuc: props.LinhVucThuongHieu?.maLinhVuc,
      tenLinhVuc: props.LinhVucThuongHieu?.tenLinhVuc,
      moTa: props.LinhVucThuongHieu?.moTa,
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.LinhVucThuongHieu) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={props.LinhVucThuongHieu != null ? "Chỉnh sửa lĩnh vực thương hiệu" : "Thêm mới lĩnh vực thương hiệu"}
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
        {props.LinhVucThuongHieu && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        {(
          <>
            <Form.Item<createEditType>
              label="Mã lĩnh vực thương hiệu"
              name="maLinhVuc"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<createEditType>
              label="Tên lĩnh vực thương hiệu"
              name="tenLinhVuc"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<createEditType>
              label="Mô tả"
              name="moTa"
            >
              <TextArea />
            </Form.Item>

          </>
        )}
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
