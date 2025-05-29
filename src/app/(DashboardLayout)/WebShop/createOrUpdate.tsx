import { DropdownOption } from "@/interface/general";
import { tableWebShopDataType, webShopCreateVMDataType } from "@/interface/WebShop/WebShop";
import { giftCodeItemService } from "@/services/GiftCodeItem/giftCodeItem.service";
import { qlWebShopeService } from "@/services/WebShop/WebShop.service";
import { fetchDropdown } from "@/utils/fetchDropdown";
import
  {
    Form,
    FormProps,
    Input,
    InputNumber,
    Modal,
    Select
  } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  tableQLWebShop: tableWebShopDataType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [lstGiftCodeItem, setLstGiftCodeItem] = useState<DropdownOption[]>([]);

  
  const handleOnFinish: FormProps<webShopCreateVMDataType>["onFinish"] = async (
    formData: webShopCreateVMDataType
  ) => {
    try {
      if ( props.tableQLWebShop )
      {
        const response = await qlWebShopeService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa  thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();

        } else {
          toast.error(response.message);
        }
      } else
      {
        const response = await qlWebShopeService.Create(formData);
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
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleMapEdit = () =>
  {
    //log lại
     form.setFieldsValue({
       id: props.tableQLWebShop?.id,
       nameSet: props.tableQLWebShop?.nameSet,
       giaTien: props.tableQLWebShop?.giaTien,
       giftCodeItems: props.tableQLWebShop?.dsItems?.split(",") ?? [],
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
    setIsOpen( props.isOpen );
    if (props.tableQLWebShop) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={
        props.tableQLWebShop != null
          ? "Chỉnh sửa sản phẩm"
          : "Thêm mới sản phẩm"
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
        {props.tableQLWebShop && (
          <Form.Item<webShopCreateVMDataType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item<webShopCreateVMDataType>
          label="Tên set vật phẩm"
          name={"nameSet"}
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>

       <Form.Item<webShopCreateVMDataType>
                 name="giftCodeItems"
                 label="Danh sách vật phẩm đi kèm"
               >
                 <Select
                   placeholder="Chọn vật phẩm"
                   options={lstGiftCodeItem.map((item) => ({
                     ...item,
                     value: item.value.toLowerCase(),
                   }))}
                   fieldNames={{ label: "label", value: "value" }}
                   mode="multiple"
                 />
               </Form.Item>
       
      
        <Form.Item<webShopCreateVMDataType>
          label="Gía tiền"
          name={"giaTien"}                                  
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
