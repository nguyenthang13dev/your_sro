import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Image,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib";
import {
  tableGiftCodeItem,
  createEditType,
} from "@/interface/GiftCodeItem/GiftCodeItem";
import { giftCodeItemService } from "@/services/GiftCodeItem/giftCodeItem.service";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  tableGiftCode?: tableGiftCodeItem | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.tableGiftCode) {
        const response = await giftCodeItemService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa thao tác thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await giftCodeItemService.Create(formData);
        if (response.status) {
          toast.success("Tạo thao tác thành công");
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
    form.setFieldsValue(props.tableGiftCode);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.tableGiftCode) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={
        props.tableGiftCode != null
          ? "Chỉnh sửa gift code"
          : "Thêm mới gift code"
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
        {props.tableGiftCode && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item<createEditType>
          label="Mã gift code"
          name="codeItem"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<createEditType>
          label="Tên gift code"
          name="nameItem"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          label="Số lượng"
          name="quanlity"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Giá trị phải lớn hơn hoặc bằng 0",
            },
          ]}
        >
          <InputNumber
            name="order"
            style={{ width: "100%" }}
            defaultValue={0}
            min={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
