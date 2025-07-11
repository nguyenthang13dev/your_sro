import { ConfigGiftSilkType, createEditConfigGiftSilkType } from "@/interface/ConfigGiftSilk/ConfigGiftSilk";
import { DropdownOptionAntd } from "@/interface/general";
import { configGiftSilkService } from "@/services/ConfigGiftSilk/ConfigGiftSilk.service";
import { giftCodeItemService } from "@/services/GiftCodeItem/giftCodeItem.service";
import { fetchDropdown } from "@/utils/fetchDropdown";
import { Form, FormProps, Input, Modal, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const { Option } = Select;

interface Props {
  isOpen: boolean;
  ConfigService?: ConfigGiftSilkType | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [loading, setLoading] = useState<boolean>(false);
  const [lstGiftCodeItem, setLstGiftCodeItem] = useState<DropdownOptionAntd[]>([]);
  const [dropdownLoading, setDropdownLoading] = useState<boolean>(false);

  // Hàm định dạng giá tiền sang định dạng Việt Nam (1.234.567)
  const formatVND = (value: string | number): string => {
    if (!value) return "";
    const num = value.toString().replace(/[^\d]/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Hàm parse giá tiền từ định dạng Việt Nam về số
  const parseVND = (value: string): number => {
    return parseFloat(value.replace(/\./g, "")) || 0;
  };

  const handleOnFinish: FormProps<createEditConfigGiftSilkType>["onFinish"] = async (
    formData: createEditConfigGiftSilkType
  ) => {
    try {
      setLoading(true);
      const formattedData = {
        ...formData,
        amount: parseVND(formData.amount.toString()),
      };

      if (props.ConfigService) {
        // Edit mode
        const response = await configGiftSilkService.Update(formattedData);
        console.log("Sửa: ", formattedData);
        if (response.status) {
          toast.success("Chỉnh sửa cấu hình quà tặng thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        // Create mode
        const response = await configGiftSilkService.Create(formattedData);
        if (response.status) {
          toast.success("Thêm mới cấu hình quà tặng thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error: any) {
      toast.error(`Có lỗi xảy ra: ${error.message || "Không xác định"}`);
    } finally {
      setLoading(false);
    }
  };

    const handleMapEdit = () =>
    {
    if (props.ConfigService) {
      const giftIdsArray = props.ConfigService.giftIds
        ? props.ConfigService.giftIds.split(",").map(id => id.trim()).filter(id => id)
            : [];
      form.setFieldsValue({
        id: props.ConfigService.id,
        amount: formatVND(props.ConfigService.amount),
        giftIds: giftIdsArray, // Set as array for Select
        nameSet: props.ConfigService.nameSet,
      });
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  const handleSetDropdown = async () => {
    try {
      setDropdownLoading(true);
      await Promise.all([
        fetchDropdown(
          lstGiftCodeItem,
          () => giftCodeItemService.getDropDown(props.ConfigService?.giftIds ?? ""),
          setLstGiftCodeItem
        ),
      ]);
    } catch (error: any) {
      console.error("Error fetching dropdown data:", error);
      toast.error(`Lỗi khi lấy danh sách gift: ${error.message || "Không xác định"}`);
      setLstGiftCodeItem([]);
    } finally {
      setDropdownLoading(false);
    }
  };

useEffect(() => {
  setIsOpen(props.isOpen);
  if (props.isOpen) {
    handleSetDropdown();
    if (props.ConfigService) {
      handleMapEdit();
    } else {
      form.resetFields(); // Reset form khi tạo mớis
    }
  }
}, [props.isOpen, props.ConfigService]); // Thêm props.ConfigService vào dependency array

  return (
    <Modal
      title={props.ConfigService ? "Chỉnh sửa cấu hình quà tặng" : "Thêm mới cấu hình quà tặng"}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={600}
      confirmLoading={loading}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ maxWidth: 1000 }}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        {props.ConfigService && (
          <Form.Item<createEditConfigGiftSilkType> name="id" hidden>
            <Input />
          </Form.Item>
        )}

        <Form.Item<createEditConfigGiftSilkType>
          label="Giá tiền (VNĐ)"
          name="amount"
          rules={[
            { required: true, message: "Vui lòng nhập giá tiền!" },
            {
              pattern: /^[\d.]+$/,
              message: "Giá tiền chỉ được chứa số và dấu chấm!",
            },
          ]}
        >
          <Input
            placeholder="Nhập giá tiền (VD: 1.234.567)"
            onChange={(e) => {
              const formattedValue = formatVND(e.target.value);
              form.setFieldsValue({ amount: formattedValue });
            }}
          />
        </Form.Item>

       <Form.Item<createEditConfigGiftSilkType>
  label="Danh sách gifts"
  name="giftIds"
  rules={[{ required: true, message: "Vui lòng chọn ít nhất một gift!" }]}
>
  <Select
    mode="multiple"
    placeholder="Chọn danh sách gifts"
    allowClear
    style={{ width: "100%" }}
    loading={dropdownLoading}
    notFoundContent={lstGiftCodeItem.length === 0 && !dropdownLoading ? "Không có dữ liệu" : null}
    tagRender={(props) => (
      <Tag
        closable={props.closable}
        onClose={props.onClose}
        style={{ marginRight: 3 }}
        color="orange"
      >
        {props.label}
      </Tag>
    )}
    optionFilterProp="label"
    filterOption={(input, option) =>
      (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
    }
  >
    {lstGiftCodeItem.map((option) => (
      <Option key={option.value} value={option.value}>
        {option.label}
      </Option>
    ))}
  </Select>
</Form.Item>

        <Form.Item<createEditConfigGiftSilkType>
          label="Tên bộ"
          name="nameSet"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input placeholder="Nhập tên bộ" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateOrUpdate;