"use client"
import type { createEditType, tableQLNewsData } from "@/interface/QLNews/QLNews"
import { qlnewsservice } from "@/services/QLNews/QLNews.service"
import { DatePicker, Form, type FormProps, Input, Modal, Select, Switch } from "antd"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import type React from "react"
import { useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css"
import { toast } from "react-toastify"

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) // import ReactQuill

dayjs.locale("vi")

interface Props {
  isOpen: boolean
  news?: tableQLNewsData | null
  onClose: () => void //function callback
  onSuccess: () => void
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen)

  const newsTypes = [
    { value: "news", label: "Tin tức" },
    { value: "events", label: "Sự kiện" },
    { value: "notification", label: "Thông báo mới" },
    { value: "serverinfor", label: "Thônng tin máy chủ" },
    { value: "lawplay", label: "Luật chơi" },
    { value: "updateroad", label: "Lịch trình update" },
    { value: "jobselect", label: "Lựa job" },
  ]

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (formData: createEditType) => {
    try {
        let response;
      if (props.news) {
        response = await qlnewsservice.Update(formData)
      } else {
        response = await qlnewsservice.Create(formData)
      }

      if (response.status) {
        toast.success(props.news ? "Chỉnh sửa bài viết thành công" : "Tạo bài viết thành công")
        form.resetFields()
        props.onSuccess()
        props.onClose()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error)
    }
  }

  const handleMapEdit = () => {
    form.setFieldsValue(props.news)
  }

  const handleCancel = () => {
    setIsOpen(false)
    form.resetFields()
    props.onClose()
  }

  useEffect(() => {
    setIsOpen(props.isOpen)
    if (props.news) {
      handleMapEdit()
    }
  }, [props.isOpen])

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  }

  return (
    <Modal
      title={props.news != null ? "Chỉnh sửa bài viết" : "Thêm mới bài viết"}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={800}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ maxWidth: 1000 }}
        onFinish={handleOnFinish}
        autoComplete="off"
        initialValues={{
          published: true,
          type: "news",
        }}
      >
        {props.news && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item<createEditType>
          label="Tiêu đề bài viết"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài viết!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<createEditType>
          label="Loại bài viết"
          name="type"
          rules={[{ required: true, message: "Vui lòng chọn loại bài viết!" }]}
        >
          <Select options={newsTypes} placeholder="Chọn loại bài viết" />
        </Form.Item>

        <Form.Item<createEditType>
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung bài viết!" }]}
        >
          <ReactQuill theme="snow" modules={quillModules} style={{ height: "200px", marginBottom: "40px" }} />
        </Form.Item>

        <Form.Item<createEditType> label="Ngày đăng" name="publishDate">
          <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày đăng" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<createEditType> label="Trạng thái xuất bản" name="published" valuePropName="checked">
          <Switch checkedChildren="Đã xuất bản" unCheckedChildren="Chưa xuất bản" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateOrUpdate
