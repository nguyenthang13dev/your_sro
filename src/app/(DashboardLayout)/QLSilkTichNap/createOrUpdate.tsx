import { DropdownOption } from "@/interface/general";
import { createEditType, tableSilkTichNapDataType } from "@/interface/QLSilkTichNap/QLSilkTichNap";
import { removeAccents } from "@/libs/CommonFunction";
import { giftCodeItemService } from "@/services/GiftCodeItem/giftCodeItem.service";
import { qlSilkTichNapService } from "@/services/SilkTichNap/SilkTichNap.service";
import { fetchDropdown } from "@/utils/fetchDropdown";
import { Form, FormProps, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  silktichnap?: tableSilkTichNapDataType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

    // 
  const [lstGiftCodeItem, setLstGiftCodeItem] = useState<DropdownOption[]>([]);
  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try
    {
      if ( formData )
      {
        formData.dsItem = formData.dsItem.map((item: string) => item.toLowerCase());
        formData.rank = Number(formData.rank);
        formData.description = formData.description;
      }

      if ( props.silktichnap )
      {
        //Eps kieu theo formdata
        formData.id = props.silktichnap.id;
        const response = await qlSilkTichNapService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else
      {
                  
        const response = await qlSilkTichNapService.Create(formData);
        if (response.status) {
          toast.success("Tạo thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error( "Kiểm tra lại thông tin nhập vào!" );
      
    }
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
    
  const handleMapEdit = (propdt: tableSilkTichNapDataType) =>
  {
    form.setFieldsValue({
        id: propdt.id,
        rank: propdt?.rank,
        description: propdt?.description,
        dsItem: propdt.dsItem?.split(",") ?? [],
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

    useEffect( () =>
    {
    handleSetDropdown();
    setIsOpen(props.isOpen);
    if ( props.silktichnap )
    {
      handleMapEdit(props.silktichnap);
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={props.silktichnap != null ? "Chỉnh sửa cấu hình silk tích nạp" : "Thêm mới cấu hình silk tích nạp"}
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
        {props.silktichnap && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item<createEditType>
                  label="Mốc tích nạp"
                  name="rank"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          label="Mô tả mốc tích nạp"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
        <TextArea />
        </Form.Item>
        <Form.Item<createEditType>
          label="Danh sách vật phẩm tặng kèm"
          name="dsItem"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
              >
                  
                   <Select
            placeholder="Chọn vật phẩm"
            options={lstGiftCodeItem.map((item) => ({
              ...item,
              value: item.value.toLowerCase(),
            }))}
            fieldNames={{ label: "label", value: "value" }}
                      mode="multiple"
                      allowClear
                      showSearch
                      filterOption={(input, option) =>
                        removeAccents(option?.label ?? "").toLowerCase().includes(removeAccents(input).toLowerCase())
                      }
                  />
                  
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
