import { createEditType, tableConfigSilk } from "@/interface/ConfigSilk/ConfigSilk";
import { configSilkService } from "@/services/ConfigSilk/ConfigSilk.service";
import { Form, FormProps, Input, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  configSilk?: tableConfigSilk | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try
    {
      if ( formData )
      {
         formData.SilkTotal = Number(formData.SilkTotal );
        formData.TotalMount = Number(formData.TotalMount );
        formData.SilkKM = Number( formData.SilkKM );
                formData.isActive = true;

      }

      if ( props.configSilk )
      {
        //Eps kieu theo formdata
        formData.id = props.configSilk.id;
        const response = await configSilkService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa vai trò thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else
      {
        const response = await configSilkService.Create(formData);
        if (response.status) {
          toast.success("Tạo vai trò thành công");
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

  const handleMapEdit = (propdt: tableConfigSilk) =>
  {
    form.setFieldsValue({
      SilkTotal: Number(propdt.silkTotal),
      TotalMount: propdt.totalMount,
      SilkKM: propdt.silkKM,
      id: propdt.id,
      isActive: propdt.isActive,
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if ( props.configSilk )
    {
      handleMapEdit(props.configSilk);
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={props.configSilk != null ? "Chỉnh sửa cấu hình silk" : "Thêm mới cấu hình silk"}
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
        {props.configSilk && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item<createEditType>
          label="Số lượng silk tối đa"
          name="SilkTotal"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          label="Mệnh giá"
          name="TotalMount"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          label="Khuyến mại"
          name="SilkKM"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
