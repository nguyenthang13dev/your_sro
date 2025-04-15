"use client";
import { DropdownOption, DropdownOptionAntd } from "@/interface/general";
import { searchTinTucFWidDataType } from "@/interface/qlTinTuc/qlTinTuc";
import {
  createEditType,
  QLTinTucWidgetDto,
  searchQLTinTuc_WidgetTB,
  tableQLTinTuc_Widget,
  tableQLTInTuc_WidgetPreVMDataType,
} from "@/interface/QLTinTuc_Widget/QLTinTuc_Widget";
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import classes from "./page.module.css";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface QLTinTucDto {
  title: string;
  keyWord: string;
  description: string;
  image: string;
  status: string;
  isHot: string;
  date: string;
  content: string;
  taiLieuDinhKiem: string;
  slugTitle: string;
  loaiTin: string;
  email: string;
  id: string;
}

// Import react-grid-layout với SSR tắt
const GridLayout = dynamic(() => import("react-grid-layout"), { ssr: false });

import { Responsive, WidthProvider } from "react-grid-layout";
import { qLTinTuc_Widget } from "@/services/QLTinTuc_Widget/QLTinTuc_Widget.service";
import { FilterOutlined, SettingOutlined } from "@ant-design/icons";
import { qLTinTuc_CauHinhService } from "@/services/QLTinTuc_CauHinh/QLTinTuc_CauHinh.service";
import { removeAccents } from "@/libs/CommonFunction";
import { tableQLTinTuc_CauHinhDataType } from "@/interface/QLTinTuc_CauHinh/QLTinTuc_CauHinh";
import ViewCauHinh from "../QLTinTuc_CauHinh/ViewCauHinh";
import { replaceCssToPreview, replaceHtmlToPreview } from "@/utils/string";
const ResponsiveGridLayout = WidthProvider(Responsive);

interface CreateUpdateDrawers {
  onClose: () => void;
  isOpen: boolean;
  dropdownChuyenMuc: DropdownOption[];
  onSuccess: () => void;
  data?: tableQLTinTuc_Widget;
  dropDownCode: DropdownOption[];
}

const DrawerCreateUpdate: React.FC<CreateUpdateDrawers> = ({
  onClose,
  isOpen,
  onSuccess,
  data,
  dropdownChuyenMuc,
  dropDownCode,
}) => {
  const [form] = Form.useForm();
  const [layout, setLayout] = useState<any>();

  const [searchQLTinTucWid, setSearchQLWidgets] =
    useState<searchQLTinTuc_WidgetTB>({
      soLuongTinBai: 1,
      dsChuyenMuc: "",
      Id: "",
    });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dsTintucs, setDsTinTucs] = useState<QLTinTucWidgetDto[]>([]);
  const [checkLstTinTuc, setCheckedLstTinTuc] = useState<[]>();
  const [layoutsChildren, setLayoutChildren] =
    useState<tableQLTinTuc_CauHinhDataType>();

  const [colNumber, setColumNumber] = useState<number>(12);
  const [rowHeight, setRowHeight] = useState<number>();
  const [isOpenPreview, setIsOpenReview] = useState<boolean>(false);
  const [typePreview, setTypePreview] =
    useState<tableQLTinTuc_CauHinhDataType>();

  const handleGetTypePreview = useCallback(async (id: string) => {
    const response = await qLTinTuc_CauHinhService.GetById(id);
    setLayoutChildren(response.data);
  }, []);

  const handleGetDsTin = useCallback(async () => {
    const result = await form.validateFields();
    if (!result) return;
    try {
      const search = {
        soLuongTinBai: form.getFieldValue("soLuongTinBai"),
        skip: form.getFieldValue("skip"),
        isHot: form.getFieldValue("isHot"),
        isNews: form.getFieldValue("isNews"),
        isPublish: form.getFieldValue("isPublish"),
        dsChuyenMuc: form.getFieldValue("dsChuyenMuc")?.join(",") ?? "",
      } as searchQLTinTuc_WidgetTB;
      const respose = await qLTinTuc_Widget.GetPublish(search);
      if (respose.data.status) {
        setDsTinTucs(respose.data.data);
      } else {
        setDsTinTucs([]);
      }
    } catch (err) {
      toast.error("Lấy tin bài không thành công");
      setDsTinTucs([]);
    }
  }, [form]);

  const [selects, setSelects] = useState<DropdownOptionAntd[]>([]);

  const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  const handleGetDropDown = useCallback(async () => {
    try {
      const response = await qLTinTuc_CauHinhService.getDropDown();
      setSelects(response.data);
    } catch (err) {}
  }, []);

  const handleSaveLConfigWidgets = useCallback(async () => {
    try {
      const widget = {
        SoLuongTinBai: form.getFieldValue("soLuongTinBai"),
        skip: form.getFieldValue("skip"),
        IsHot: form.getFieldValue("isHot"),
        IsNews: form.getFieldValue("isNews"),
        IsPublish: form.getFieldValue("isPublish"),
        HasPagination: form.getFieldValue("hasPagination"),
        HasPrint: form.getFieldValue("hasPrint"),
        Content: layout,
        Id: data?.id ?? null,
        Code: form.getFieldValue("Code"),
        ListTinTuc: dsTintucs.map((x) => x.id).join(","),
        typePreview: typePreview?.id ?? "",
        colNumber: colNumber,
        dsChuyenMuc: form.getFieldValue("dsChuyenMuc"),
      } as createEditType;
      const res = await qLTinTuc_Widget.Create(widget);
      if (res.status) {
        toast.success("Thêm mới thành công");
        form.resetFields();
        onClose();
        onSuccess();
      }
    } catch (err) {
      toast.error("Thêm mới thất bại: " + err);
    }
  }, [layout, searchQLTinTucWid, typePreview]);

  const replaceKey = (
    tin: QLTinTucWidgetDto,
    layout: tableQLTinTuc_CauHinhDataType
  ): string => {
    // Lặp qua tất cả các key trong `tin`
    let html = layout.html || ""; // Tạo bản sao của HTML gốc để tránh thay đổi trực tiếp

    Object.keys(tin).forEach((key) => {
      const value =
        key !== "image"
          ? tin[key as keyof QLTinTucWidgetDto] ?? ""
          : `${process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL}${
              tin[key as keyof QLTinTucWidgetDto] ?? ""
            }`;

      html = html.replaceAll(`[${key}]`, String(value));
    });

    return html; // Trả về HTML đã thay thế thay vì thay đổi trực tiếp layout.html
  };

  const handleGetDataCauHinh = async (id: string) => {
    try {
      const response = await qLTinTuc_CauHinhService.getAllCauHinh();
      if (response.status && id != "") {
        setTypePreview(response.data.find((x) => x.id == id));
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra: " + err);
    }
  };

  useEffect(() => {
    handleGetDropDown();
    if (data) {
      form.setFieldsValue({
        Id: data.id ?? null,
        Code: data.code ?? "",
        soLuongTinBai: data.soLuongTinBai ?? 1,
        isPublish: data.isPublish ?? false,
        isNews: data.isNews ?? false,
        isHot: data.isHot ?? false,
        colNumber: data.colNumber ?? 12,
        dsChuyenMuc: data.dsChuyenMuc ?? [],
        typePreview: data.typePreview ?? "",
        hasPagination: data.hasPagination ?? false,
        hasPrint: data.hasPrint ?? false,
        skip: data.skip,
      });
      handleGetDataCauHinh(data.typePreview ?? "");
      setSearchQLWidgets({
        soLuongTinBai: data?.soLuongTinBai ?? 1,
        dsChuyenMuc: data?.dsChuyenMuc?.join(",") ?? "",
        Id: data?.id ?? "",
      });
      setLayout(data.content);
      setColumNumber(data?.colNumber ?? 12);

      const lstTinTuc = data.content?.map((item) => {
        return {
          id: item.i,
        } as QLTinTucWidgetDto;
      });
      setDsTinTucs(lstTinTuc || []);
    }
  }, [data, form]);

  return (
    <Drawer
      title="Cấu hình widgets tin tức"
      width={"90%"}
      open={isOpen}
      onClose={() => {
        onClose();
      }}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleSaveLConfigWidgets();
            }}
          >
            Lưu
          </Button>
        </div>
      }
    >
      <div>
        <Row gutter={24}>
          <Col span={12}>
            {/* Fieldset: Bộ lọc tin tức */}
            <fieldset className={classes.fielsetCustom}>
              <legend className="text-black font-semibold px-2">
                Bộ lọc tin tức
              </legend>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  dsChuyenMuc: data?.dsChuyenMuc ?? [],
                  Code: data?.code ?? "",
                  soLuongTinBai: data?.soLuongTinBai ?? 1,
                  isPublish: data?.isPublish ?? false,
                  isNews: data?.isNews ?? false,
                  colNumber: data?.colNumber ?? 12,
                  typePreview: data?.typePreview ?? "",
                }}
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item<searchTinTucFWidDataType>
                      label="Số lượng bài viết hiển thị"
                      name="soLuongTinBai"
                      rules={[
                        { required: true, message: "Vui lòng nhập trường này" },
                        {
                          type: "number",
                          min: 1,
                          message: "Số lượng phải là số nguyên dương lớn hơn 0",
                        },
                        {
                          validator: (_, value) =>
                            Number.isInteger(value)
                              ? Promise.resolve()
                              : Promise.reject("Số lượng phải là số nguyên"),
                        },
                      ]}
                    >
                      <InputNumber min={1} className={classes.wFull} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item<searchTinTucFWidDataType>
                      label="Số lượng bài viết bỏ qua"
                      name="skip"
                      rules={[
                        {
                          type: "number",
                          min: 0,
                          message: "Số lượng phải là số nguyên dương >= 0",
                        },
                        {
                          validator: (_, value) =>
                            Number.isInteger(value)
                              ? Promise.resolve()
                              : Promise.reject("Số lượng phải là số nguyên"),
                        },
                      ]}
                    >
                      <InputNumber min={0} className={classes.wFull} />
                    </Form.Item>
                  </Col>
                  <Col md={8}>
                    <Form.Item<createEditType>
                      label="Code"
                      name="Code"
                      rules={[
                        { required: true, message: "Vui lòng nhập trường này" },
                      ]}
                    >
                      <Select options={dropDownCode} showSearch allowClear />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col md={8}>
                    <Form.Item<searchTinTucFWidDataType>
                      label="Chọn chuyên mục"
                      name="dsChuyenMuc"
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        placeholder="Chọn chuyên mục"
                        options={dropdownChuyenMuc}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={8}>
                    <Form.Item<createEditType>
                      label="Số lượng column"
                      name="colNumber"
                    >
                      <Input
                        onChange={(e) => {
                          setColumNumber(Number(e.target.value));
                        }}
                        type="number"
                        min={1}
                        defaultValue={data?.colNumber ?? 0}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col md={6}>
                    <Form.Item<searchTinTucFWidDataType>
                      label="Tin nổi bật?"
                      name="isHot"
                      valuePropName="checked"
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item<searchTinTucFWidDataType>
                      label="Tin mới?"
                      name="isNews"
                      valuePropName="checked"
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item<searchTinTucFWidDataType>
                      label="Có phân trang?"
                      name="hasPagination"
                      valuePropName="checked"
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                  <Col md={6}>
                    <Form.Item<searchTinTucFWidDataType>
                      label="In?"
                      name="hasPrint"
                      valuePropName="checked"
                    >
                      <Checkbox />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Các nút chức năng */}
                <Flex justify="right" className="mt-4" gap={10}>
                  <Button
                    type="primary"
                    onClick={handleGetDsTin}
                    className="rounded px-4 py-2 text-sm"
                  >
                    <FilterOutlined />
                    Lọc tin tức
                  </Button>
                  <Button
                    color="cyan"
                    onClick={() => setIsOpenReview(true)}
                    className={`rounded px-4 py-2 text-sm ${classes.greenBtn}`}
                  >
                    Kiểu hiện thị
                  </Button>
                  <ViewCauHinh
                    isOpen={isOpenPreview}
                    onClose={() => {
                      setIsOpenReview(false);
                      form.setFieldValue("typePreview", typePreview?.id ?? "");
                    }}
                    isCauHinh={true}
                    setTypePreview={setTypePreview}
                  />
                </Flex>
              </Form>
            </fieldset>
          </Col>
          <Col span={12}>
            {/* Fieldset: Preview cấu hình*/}
            <fieldset className={classes.fielsetCustom}>
              <legend className="text-black font-semibold px-2">
                Kiểu hiển thị bài viết
              </legend>

              <div
                dangerouslySetInnerHTML={{
                  __html: `
                            <style>
                                ${replaceCssToPreview(typePreview!)}
                            </style>
                            ${replaceHtmlToPreview(typePreview!)}
                        `,
                }}
              />
            </fieldset>
          </Col>
        </Row>

        {/* Fieldset: Khu vực hiển thị tin tức */}
        <fieldset className={classes.fielsetCustom}>
          <legend className="text-black font-semibold px-2">
            Danh sách tin bài
          </legend>
          <ResponsiveGridLayout
            cols={{
              lg: colNumber <= 0 || !colNumber ? 12 : colNumber,
              md: colNumber <= 0 || !colNumber ? 12 : colNumber,
              sm: colNumber <= 0 || !colNumber ? 12 : colNumber,
              xs: colNumber <= 0 || !colNumber ? 12 : colNumber,
              xxs: colNumber <= 0 || !colNumber ? 12 : colNumber,
            }}
            rowHeight={100}
            isDraggable={true}
            isResizable={true}
            onLayoutChange={handleLayoutChange}
            className="p-2"
          >
            {dsTintucs?.map((tin, idx) => (
              <div
                key={idx + 1}
                className="bg-white shadow-md rounded-md border border-gray-300 p-3 text-center"
              >
                <p className="text-center font-semibold">Tin bài {idx + 1}</p>
              </div>
            ))}
          </ResponsiveGridLayout>
        </fieldset>
      </div>

      {/* Modal setup */}

      <Modal
        title="Cấu hình preview tin bài"
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onCancel={() => {
          setOpenModal(false);
        }}
        width={"60%"}
      >
        <ResponsiveGridLayout
          cols={{
            lg: colNumber <= 0 || !colNumber ? 12 : colNumber,
            md: colNumber <= 0 || !colNumber ? 12 : colNumber,
            sm: colNumber <= 0 || !colNumber ? 12 : colNumber,
            xs: colNumber <= 0 || !colNumber ? 12 : colNumber,
            xxs: colNumber <= 0 || !colNumber ? 12 : colNumber,
          }}
          isDraggable={false}
          rowHeight={200}
          layouts={layout}
          isResizable={false}
          className="p-2"
        >
          {layoutsChildren != undefined &&
            dsTintucs?.map((tin, idx) => {
              return (
                <div
                  key={tin?.id}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    maxWidth: "100%",
                  }}
                  className="bg-white shadow-md rounded-md border border-gray-300 p-3 text-center"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `
                                        <style>${layoutsChildren.css}</style>
                                        ${DOMPurify.sanitize(
                                          replaceKey(tin, layoutsChildren)
                                        )}
                                    `,
                    }}
                  />
                </div>
              );
            })}
        </ResponsiveGridLayout>
      </Modal>
    </Drawer>
  );
};
export default DrawerCreateUpdate;
