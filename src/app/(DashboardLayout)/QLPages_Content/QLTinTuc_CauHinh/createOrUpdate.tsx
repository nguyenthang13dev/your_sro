import {
  createEditType,
  tableQLTinTuc_CauHinhDataType,
} from "@/interface/QLTinTuc_CauHinh/QLTinTuc_CauHinh";
import { Checkbox, Col, Form, FormProps, Input, Modal, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { qLTinTuc_CauHinhService } from "@/services/QLTinTuc_CauHinh/QLTinTuc_CauHinh.service";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import classes from "./page.module.css";

import Draggable from "react-draggable";
import { replaceCssToPreview, replaceHtmlToPreview } from "@/utils/string";

interface Props {
  isOpen: boolean;
  QLTinTuc_CauHinh?: tableQLTinTuc_CauHinhDataType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
}

// Định nghĩa kiểu dữ liệu cho positions

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const [htmlCode, setHtmlCode] = useState<string>(
    props.QLTinTuc_CauHinh?.html ?? `<div class="box">Hello, World!</div>`
  );
  const [cssCode, setCssCode] = useState<string>(
    props.QLTinTuc_CauHinh?.css ?? `.box { color: red; font-size: 24px; }`
  );

  const [showImage, setShowImage] = useState<boolean>(
    props.QLTinTuc_CauHinh?.isImage || false
  );
  const [showTitle, setShowTitle] = useState<boolean>(
    props.QLTinTuc_CauHinh?.isTitle || false
  );
  const [showDescription, setShowDescription] = useState<boolean>(
    props.QLTinTuc_CauHinh?.isDescription || false
  );
  const [showDate, setShowDate] = useState<boolean>(
    props.QLTinTuc_CauHinh?.isDateTime || false
  );

  const [layout, setLayout] = useState<any>([]);

  const handleResetState = () => {
    setShowImage(false);
    setShowTitle(false);
    setShowDescription(false);
    setShowDate(false);
  };
  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.QLTinTuc_CauHinh) {
        formData.content = layout;
        formData.isDateTime = showDate;
        formData.isDescription = showDescription;
        formData.isImage = showImage;
        formData.isTitle = showTitle;
        formData.html = htmlCode;
        formData.css = cssCode;
        const response = await qLTinTuc_CauHinhService.Update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa thành công");
          form.resetFields();
          handleResetState();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        formData.content = layout;
        formData.isDateTime = showDate;
        formData.isDescription = showDescription;
        formData.isImage = showImage;
        formData.isTitle = showTitle;
        formData.html = htmlCode;
        formData.css = cssCode;
        const response = await qLTinTuc_CauHinhService.Create(formData);
        if (response.status) {
          toast.success("Thêm mới thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
      handleResetState();
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    switch (name) {
      case "isImage":
        setShowImage(checked);
        break;
      case "isTitle":
        setShowTitle(checked);
        break;
      case "isDescription":
        setShowDescription(checked);
        break;
      case "isDateTime":
        setShowDate(checked);
        break;
    }
  };

  const handleMapEdit = () => {
    form.setFieldsValue(props.QLTinTuc_CauHinh);

    setHtmlCode(props.QLTinTuc_CauHinh?.html ?? "");
    setCssCode(props.QLTinTuc_CauHinh?.css ?? "");
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    handleResetState();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.QLTinTuc_CauHinh) {
      console.log(props.QLTinTuc_CauHinh);

      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={
        props.QLTinTuc_CauHinh != null
          ? "Chỉnh sửa quản lý cấu hình"
          : "Thêm mới quản lý cấu hinh"
      }
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={"85%"}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ maxWidth: 1000 }}
        onFinish={handleOnFinish}
        autoComplete="off"
        onValuesChange={(changedValues) => {
          const key = Object.keys(changedValues)[0];
          const value = changedValues[key];
          handleCheckboxChange(key, value);
        }}
      >
        {props.QLTinTuc_CauHinh && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}

        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item<createEditType>
              name="type"
              label={<strong>Kiểm xem trước</strong>}
            >
              <Input placeholder="Nhập type" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<createEditType> name="isImage" valuePropName="checked">
              <Checkbox
                onChange={(e) => {
                  handleCheckboxChange("isImage", e.target.checked);
                }}
              >
                <strong>Có ảnh</strong>
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<createEditType> name="isTitle" valuePropName="checked">
              <Checkbox
                onChange={(e) => {
                  handleCheckboxChange("isTitle", e.target.checked);
                }}
              >
                <strong>Có tiêu đề</strong>
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<createEditType>
              name="isDescription"
              valuePropName="checked"
            >
              <Checkbox
                onChange={(e) => {
                  handleCheckboxChange("isDescription", e.target.checked);
                }}
              >
                <strong>Có mô tả</strong>
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<createEditType>
              name="isDateTime"
              valuePropName="checked"
            >
              <Checkbox
                onChange={(e) => {
                  handleCheckboxChange("isDescription", e.target.checked);
                }}
              >
                <strong>Hiển thị ngày đăng </strong>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[10, 10]}>
          <Col span={12}>
            <h3>HTML Code</h3>
            <CodeMirror
              value={htmlCode}
              maxHeight="500px"
              extensions={[html()]}
              onChange={(value) => setHtmlCode(value)}
            />
          </Col>
          <Col span={12}>
            <h3>CSS Code</h3>
            <CodeMirror
              value={cssCode}
              extensions={[css()]}
              maxHeight="500px"
              onChange={(value) => setCssCode(value)}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {/* Preview */}
            <iframe
              srcDoc={`<style>${replaceCssToPreview(
                props.QLTinTuc_CauHinh!
              )}</style>${replaceHtmlToPreview(props.QLTinTuc_CauHinh!)}`}
              style={{
                width: "100%",
                height: "300px",
                border: "1px solid #ccc",
              }}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
