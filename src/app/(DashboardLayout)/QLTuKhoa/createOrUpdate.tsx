import { createEditType, tableTuKhoaDataType } from "@/interface/tuKhoa/tuKhoa";
import { Form, FormProps, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { tuKhoaService } from "@/services/tuKhoa/tuKhoa.service";
import { toast } from "react-toastify";
import { DropdownOptionAntd } from "@/interface/general";

interface Props {
  isOpen: boolean;
  tuKhoa?: tableTuKhoaDataType | null;
  dropdown?: DropdownOptionAntd[];
  raSoatTieuChiList?: DropdownOptionAntd[];
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
      if (props.tuKhoa) {
        const response = await tuKhoaService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa từ khóa thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await tuKhoaService.Create(formData);
        if (response.status) {
          toast.success("Thêm mới từ khóa thành công");
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
      id: props.tuKhoa?.id,
      tenTuKhoa: props.tuKhoa?.tenTuKhoa,
      loaiTuKhoa: props.tuKhoa?.loaiTuKhoa,
      tanSuat: props.tuKhoa?.tanSuat,
      nhomTieuChiId: props.tuKhoa?.nhomTieuChiId
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.tuKhoa) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={props.tuKhoa != null ? "Chỉnh sửa từ khóa" : "Thêm mới từ khóa"}
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
        {props.tuKhoa && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        {(
          <>
            <Form.Item<createEditType>
              label="Tên từ khóa"
              name="tenTuKhoa"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<createEditType>
              label="Loại từ khóa"
              name="loaiTuKhoa"
            >
              <Select placeholder="Chọn loại từ khóa" options={props.dropdown} allowClear/>
            </Form.Item>

            <Form.Item<createEditType>
              label="Tiêu chí"
              name="nhomTieuChiId"
            >
              <Select placeholder="Chọn tiêu chí" options={props.raSoatTieuChiList} allowClear/>
            </Form.Item>

            <Form.Item<createEditType>
              label="Tần suất"
              name="tanSuat"
            >
              <Input />
            </Form.Item>

          </>
        )}
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
