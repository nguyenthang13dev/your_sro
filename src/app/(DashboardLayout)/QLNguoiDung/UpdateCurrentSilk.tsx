import { tableUpdateCurrentSilkDataType, tableUserDataType } from "@/interface/auth/User";
import { authService } from "@/services/auth/auth.service";
import { Form, Input, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classes from "./page.module.css";

interface Props {
  isOpen: boolean;
  user?: tableUserDataType | null;
  onClose: () => void;
}

const UpdateCurrentSilk: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleOnFinish = async (values: tableUpdateCurrentSilkDataType) => {
      try
      {
        values.userName = form.getFieldValue( "userName" );
        values.silk = form.getFieldValue( "silk" );
        const res = await authService.UpdateCurrentSilk(values);
      if (res.status) {
        toast.success("Cập nhật thành công");
        form.resetFields();
        props.onClose();
      }
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
    props.onClose();
  };

  const handleGetDetailUser = async () => {
    try {
      const dataResponse = await authService.GetSilkCurrent(props.user?.userName ?? "");
      if (dataResponse.status && dataResponse.data) {
        form.setFieldsValue({
          userName: dataResponse.data.userName,
          silk: dataResponse.data.silk,
        });
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra trong quá trình xử lý");
    }
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

    useEffect( () =>
    {
        if ( props.isOpen )
        {
            handleGetDetailUser();
      }
  }, [props.isOpen]);

  return (
    <Modal
      title={"Chỉnh sửa silk"}
      open={isOpen}
      onOk={() => form.submit()}
      okText="Xác nhận"
      cancelText="Đóng"
      onCancel={handleCancel}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Form.Item<tableUpdateCurrentSilkDataType> name="userName" hidden>
          <Input />
        </Form.Item>

        <Form.Item>
          <Typography.Text className={classes.userNameText}>
            Người dùng: <strong>{props.user?.userName}</strong>
          </Typography.Text>
        </Form.Item>

        <Form.Item<tableUpdateCurrentSilkDataType>
          name="silk"
          label="Silk"
          rules={[{ required: true, message: "Vui lòng nhập silk" }]}
        >
          <Input placeholder="Chỉnh sửa silk" type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCurrentSilk;
