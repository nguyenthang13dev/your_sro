"use client";

import BannerConstant from "@/constants/BannerConstant";
import {
  createEditType,
  qlPages_BannerType,
} from "@/interface/QLPages_Banner/QLPages_Banner";
import { qlPages_BannerService } from "@/services/QLPages_Banner/QLPages_Banner.service";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PreviewBanner from "./previewBanner";
import { DropdownOption } from "@/interface/general";

interface CreateProps {
  isOpen: boolean;
  data?: qlPages_BannerType;
  onClose: () => void;
  onSuccess: () => void;
  dropdownCodeWidget: DropdownOption[];
}

const CreateUpdateForm: React.FC<CreateProps> = ({
  isOpen,
  data,
  onClose,
  onSuccess,
  dropdownCodeWidget,
}: CreateProps) => {
  const [form] = Form.useForm();
  const typeOptions = BannerConstant.getDropdownList();
  const [isShowSlide, setIsShowSlide] = useState<boolean>(false);
  const [bannerPreview, setBannerPreview] = useState<qlPages_BannerType>();
  const [isShowPerview, setIsShowPreview] = useState<boolean>(false);

  const handleFinish = async () => {
    const param = await form.validateFields();
    try {
      if (data) {
        const response = await qlPages_BannerService.Update({
          ...param,
          id: data.id,
        });
        if (response.status) {
          toast.success("Cập nhật thành công");
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await qlPages_BannerService.Create(param);
        if (response.status) {
          toast.success("Thêm mới  thành công");
        } else {
          toast.error(response.message);
        }
      }
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
    setIsShowPreview(false);
    setIsShowSlide(false);
  };

  const handleChangeTypeBanner = () => {
    const v = form.getFieldValue("typeBanner");
    setIsShowSlide(v === BannerConstant.Slide);
  };

  const handleGetBannerPrevew = async () => {
    const data = await form.validateFields();
    setBannerPreview(data);
    setIsShowPreview(true);
  };

  const handleMapEdit = () => {
    form.setFieldsValue(data);
    if (data?.typeBanner === BannerConstant.Slide && isOpen) {
      setIsShowSlide(true);
    }
  };

  useEffect(() => {
    if (data) {
      handleMapEdit();
    }
  }, [isOpen]);

  return (
    <Modal
      title={
        <div style={{ textAlign: "center" }}>
          {data ? "Chỉnh sửa banner" : "Thêm mới banner"}
        </div>
      }
      open={isOpen}
      onOk={() => handleFinish()}
      onCancel={handleCancel}
      footer={[
        <Button key="previewBanner" danger onClick={handleGetBannerPrevew}>
          Xem trước
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Đóng
        </Button>,
        <Button key="submit" type="primary" onClick={handleFinish}>
          Lưu
        </Button>,
      ]}
      width={600}
    >
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: 1000 }}
        autoComplete="off"
      >
        <Form.Item<createEditType>
          label={<strong>Loại banner</strong>}
          name="typeBanner"
          rules={[{ required: true }]}
        >
          <Select
            options={typeOptions}
            allowClear
            placeholder="Chọn loại banner"
            onChange={handleChangeTypeBanner}
            value={form.getFieldValue("typeBanner")}
          />
        </Form.Item>

        <Form.Item<createEditType>
          label={<strong>Code component</strong>}
          name="code"
          rules={[{ required: true }]}
        >
          <Select
            options={dropdownCodeWidget}
            allowClear
            placeholder="Chọn"
            value={form.getFieldValue("code")}
          />
        </Form.Item>

        {isShowSlide && (
          <>
            <Form.Item<createEditType>
              label={<strong>Số lượng preview slide trên màn</strong>}
              name="slidesPerView"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin này!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item<createEditType>
              label={<strong>Số lượng slides</strong>}
              name="totalSlides"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin này!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item<createEditType>
              label={<strong>Thời gian delay (s)</strong>}
              name="autoplayDelay"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin này!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item<createEditType>
              label={<strong>Hiệu ứng</strong>}
              name="effect"
            >
              <Select
                options={[
                  {
                    label: "Fade",
                    value: "fade",
                  },
                  {
                    label: "Slide",
                    value: "slide",
                  },
                  {
                    label: "Cube",
                    value: "cube",
                  },
                  {
                    label: "Coverflow",
                    value: "coverflow",
                  },
                  {
                    label: "Flip",
                    value: "flip",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item<createEditType> name="loop" valuePropName="checked">
              <Checkbox>Có lặp</Checkbox>
            </Form.Item>
            <Form.Item<createEditType>
              name="pagination"
              valuePropName="checked"
            >
              <Checkbox>Có phân trang?</Checkbox>
            </Form.Item>
            <Form.Item<createEditType>
              name="navigation"
              valuePropName="checked"
            >
              <Checkbox>Có nút chuyển hướng?</Checkbox>
            </Form.Item>

            {isShowPerview && <PreviewBanner data={bannerPreview!} />}
          </>
        )}
      </Form>
    </Modal>
  );
};

export default CreateUpdateForm;
