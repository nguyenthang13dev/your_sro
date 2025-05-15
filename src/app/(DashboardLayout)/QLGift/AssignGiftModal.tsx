import { Button, Form, Input, Modal } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
  onAssign: (userList: string[]) => void;
  giftCodeName: string;
}

const AssignGiftModal: React.FC<Props> = ({ open, onClose, onAssign, giftCodeName }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const names = values.users
        .split(/\r?\n/)
        .map((name: string) => name.trim())
        .filter((name: string) => name.length > 0);

      onAssign(names);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title={`Gán giftcode: ${giftCodeName}`}
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="users"
          label="Danh sách tên nhân vật (mỗi dòng 1 tên)"
          rules={[{ required: true, message: "Vui lòng nhập danh sách user" }]}
        >
          <Input.TextArea rows={8} placeholder="VD: user1&#10;user2&#10;user3" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignGiftModal;
