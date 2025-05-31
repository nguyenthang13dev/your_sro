import { DropdownOption } from "@/interface/general";
import
  {
    createEditType,
    tableGiftCode
  } from "@/interface/GiftCode/GiftCode";
import { giftCodeService } from "@/services/GiftCode/giftCode.service";
import { giftCodeItemService } from "@/services/GiftCodeItem/giftCodeItem.service";
import { fetchDropdown } from "@/utils/fetchDropdown";
import
  {
    DatePicker,
    Form,
    FormProps,
    Input,
    InputNumber,
    Modal,
    Select
  } from "antd";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

dayjs.locale("vi");
dayjs.extend(utc);
dayjs.extend( timezone );


interface Props {
  isOpen: boolean;
  tableGiftCode?: tableGiftCode | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [lstGiftCodeItem, setLstGiftCodeItem] = useState<DropdownOption[]>([]);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.tableGiftCode) {
        const response = await giftCodeService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa thao tác thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await giftCodeService.Create(formData);
        if (response.status) {
          toast.success("Tạo giftcode thành công");
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

    form.setFieldsValue({
      giftCodeItems: Array.isArray(props.tableGiftCode?.giftCodeItems_Data)
        ? props.tableGiftCode?.giftCodeItems_Data
        : [],
    } );
    

    form.setFieldsValue( {
      dueDate: dayjs( props.tableGiftCode?.dueDate ),
      maxCountUsed: props.tableGiftCode?.maxCountUsed,
      description: props.tableGiftCode?.description,
      LevelUsed: props.tableGiftCode?.levelUsed,
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  const handleSetDropdown = async () => {
    await Promise.all([
      fetchDropdown(
        lstGiftCodeItem,
        () => giftCodeItemService.getDropDown(""),
        setLstGiftCodeItem
      ),
    ]);
  };

  useEffect(() => {
    handleSetDropdown();
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
          label="Mã"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<createEditType>
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>

          <Form.Item<createEditType>
          label="Số lượng tối đa sử dụng"
          name="maxCountUsed"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <InputNumber min={0}  />
        </Form.Item>


            <Form.Item<createEditType>
          label="Level (Dưới level này được sử dụng gift) - không nhập mặc định cho tất cả"
          name={"LevelUsed"}
        >
          <InputNumber min={0}  />
        </Form.Item>


          <Form.Item<createEditType>
          label="Thời gian hết hạn"
          name="dueDate"
        >
          <DatePicker  />
        </Form.Item>

      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
