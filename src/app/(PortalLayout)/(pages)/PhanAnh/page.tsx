"use client";
import FileTypeConstant from "@/constants/FileTypeConstant";
import LoaiPhanAnhChungConstant from "@/constants/LoaiPhanAnhChung";
import LoaiSanPhamConstant from "@/constants/LoaiSanPhamConstant";
import { DropdownOptionAntd } from "@/interface/general";
import UploadFiler from "@/libs/UploadFilter";
import { duLieuDanhMucService } from "@/services/duLieuDanhMuc/duLieuDanhMuc.service";
import { khieuNaiPhanAnhService } from "@/services/khieuNaiPhanAnh/khieuNaiPhanAnh.service";
import { thuongHieuService } from "@/services/thuongHieu/thuongHieu.service";
import { tinhService } from "@/services/tinh/tinh.service";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  UploadFile,
} from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PhanAnh: React.FC = () => {
  const [form] = Form.useForm();
  const [cccdFileList, setCCCDFileList] = useState<UploadFile[]>([]);
  const [cccdUploadedData, setCCCDUploadedData] = useState<string[]>([]);
  const [tinhList, setTinhList] = useState<DropdownOptionAntd[]>([]);
  const [phanAnhWeb, setPhanAnhWeb] = useState<DropdownOptionAntd[]>([]);
  const [phanAnhSanPham, setPhanAnhSanPham] = useState<DropdownOptionAntd[]>(
    []
  );
  const [nhomNganh, setNhomNganh] = useState<DropdownOptionAntd[]>([]);
  const [complaintType, setComplaintType] = useState<"Website" | "Sản phẩm">(
    "Website"
  );
  const [attachmentFileList, setAttachmentFileList] = useState<UploadFile[]>(
    []
  );
  const [attachmentUploadedData, setAttachmentUploadedData] = useState<
    string[]
  >([]);
  const [thuongHieuList, setThuongHieuList] = useState<DropdownOptionAntd[]>(
    []
  );

  const handleFinish = async () => {
    const param = await form.validateFields();
    if (param.ngayCap) {
      const ngayCap = new Date(param.ngayCap);
      ngayCap.setHours(ngayCap.getHours() + 7);
      param.ngayCap = ngayCap.toISOString();
    }
    if (param.ngaySinh) {
      const ngaySinh = new Date(param.ngaySinh);
      ngaySinh.setHours(ngaySinh.getHours() + 7);
      param.ngaySinh = ngaySinh.toISOString();
    }
    //xử lý ảnh
    if (cccdUploadedData.length > 0) {
      param.anhCCCD = cccdUploadedData[0];
    }

    param.fileDinhKem = attachmentUploadedData.join(",");

    try {
      const response = await khieuNaiPhanAnhService.Create(param);
      if (response.status) {
        toast.success("Thêm mới khiếu nại, phản ánh thành công");
      } else {
        toast.error(response.message);
      }
      setCCCDFileList([]);
      setCCCDUploadedData([]);
      setAttachmentFileList([]);
      setAttachmentUploadedData([]);
      form.resetFields();
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  useEffect(() => {
    tinhService
      .GetDropdown()
      .then((res) => {
        setTinhList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    thuongHieuService
      .getDropdownAnt()
      .then((res) => {
        setThuongHieuList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    duLieuDanhMucService
      .GetDropdownCode("PHAN_ANH_WEBSITE")
      .then((res) => {
        setPhanAnhWeb(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    duLieuDanhMucService
      .GetDropdownCode("PHAN_ANH_SANPHAM")
      .then((res) => {
        setPhanAnhSanPham(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    duLieuDanhMucService
      .GetDropdownCode("NHOMNGANH")
      .then((res) => {
        setNhomNganh(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const hasAnhCCCDValue = cccdUploadedData.length > 0;
    form.setFieldValue(
      "anhCCCD",
      hasAnhCCCDValue ? cccdUploadedData[0] : undefined
    );
    if (!hasAnhCCCDValue) {
      form.setFields([
        {
          name: "anhCCCD",
          errors: ["Vui lòng tải lên ảnh căn cước/CCCD/CMND"],
        },
      ]);
    }
  }, [cccdUploadedData.length]);

  return (
    <Form
      layout="vertical"
      form={form}
      style={{ maxWidth: 2000 }}
      autoComplete="off"
    >
      {/* Start thông tin người phản ánh */}
      <div className='fieldsetWrapper'>
          <div className='legend'>Thông tin người phản ánh</div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ tên"
                name="hoTen"
                rules={[
                  {
                    required: true,
                    message: 'Yêu cầu nhập trường này',
                  },
                ]}
              >
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ngaySinh"
                label="Ngày sinh"
                rules={[
                  {
                    required: true,
                    message: 'Yêu cầu nhập trường này',
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày sinh"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập thông tin này!',
                  },
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!',
                  },
                ]}
              >
                <Input type="email" placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sdt"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập thông tin này!',
                  },
                  {
                    pattern: /^\d{10}$/, // Chỉ cho phép 10 chữ số
                    message: 'Giá trị phải có đúng 10 chữ số!',
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="diaChi"
                label="Địa chỉ"
                rules={[
                  {
                    required: true,
                    message: 'Yêu cầu nhập trường này',
                  },
                ]}
              >
                <Input.TextArea rows={2} placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cccd"
                label="Căn cước/CCCD/CMND"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số!',
                  },
                  {
                    pattern: /^(?:\d{9}|\d{12})$/, // Chỉ chấp nhận 9 hoặc 12 ký tự số
                    message: 'Chỉ chấp nhận 9 hoặc 12 ký tự số!',
                  },
                ]}
              >
                <Input placeholder="Nhập số căn cước/CCCD/CMND" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ảnh căn cước/CCCD/CMND"
                name="anhCCCD"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng tải lên ảnh căn cước/CCCD/CMND',
                  },
                ]}
              >
                <UploadFiler
                  listType="picture"
                  maxFiles={1}
                  fileList={cccdFileList}
                  setFileList={setCCCDFileList}
                  type={FileTypeConstant.AnhCCCD}
                  setUploadedData={setCCCDUploadedData}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ngayCap"
                label="Ngày cấp"
                rules={[
                  {
                    required: true,
                    message: 'Yêu cầu nhập trường này',
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày cấp căn cước/CCCD/CMND"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="noiCap"
                label="Nơi cấp căn cước/CCCD/CMND"
                rules={[
                  {
                    required: true,
                    message: 'Yêu cầu nhập trường này',
                  },
                ]}
              >
                <Input placeholder="Nhập nơi cấp căn cước/CCCD/CMND" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tinhCode"
                label="Tỉnh"
                rules={[
                  {
                    required: true,
                    message: 'Yêu cầu nhập trường này',
                  },
                ]}
              >
                <Select
                  placeholder="Chọn tỉnh"
                  showSearch
                  optionFilterProp="children"
                >
                  {tinhList &&
                    tinhList.map((item, index) => (
                      <Select.Option key={`tinh${index}`} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="nhomNganh" label="Nhóm ngành">
                <Select
                  placeholder="Chọn nhóm ngành"
                  showSearch
                  optionFilterProp="children"
                >
                  {nhomNganh &&
                    nhomNganh.map((item, index) => (
                      <Select.Option key={`tinh${index}`} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>
        {/* End thông tin người phản ánh */}

        {/*Start loại phản ánh */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="commonType"
              label="Loại phản ánh"
              rules={[
                {
                  required: true,
                  message: 'Yêu cầu nhập trường này',
                },
              ]}
            >
              <Select
                onChange={(value) => {
                  setComplaintType(value)
                  setAttachmentFileList([])
                  setAttachmentUploadedData([])
                }}
              >
                {LoaiPhanAnhChungConstant.getDropdownList().map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* End loại phản ánh */}

        {/* Start thông tin phản ánh website */}
        {complaintType === 'Website' && (
          <div className='fieldsetWrapper'>
            <div className='legend'>Thông tin phản ánh website</div>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="loai"
                  label="Loại phản ánh website"
                  rules={[{ required: true, message: 'Vui lòng chọn loại phản ánh' }]}
                >
                  <Select placeholder="Chọn loại phản ánh">
                    {phanAnhWeb.map((item, index) => (
                      <Select.Option
                        key={`phan_anh${index}`}
                        value={item.value}
                      >
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tenMien"
                  label="Tên miền"
                  rules={[{ required: true, message: 'Vui lòng nhập tên miền' }]}
                >
                  <Input placeholder="Nhập tên miền" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="File đính kèm">
                  <UploadFiler
                    maxFiles={1}
                    fileList={attachmentFileList}
                    setFileList={setAttachmentFileList}
                    type={FileTypeConstant.FileDinhKemPhanAnh}
                    setUploadedData={setAttachmentUploadedData}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Thương hiệu"
              name="thuongHieuId"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thông tin này!',
                },
              ]}
            >
              <Select placeholder="Chọn thương hiệu">
                {thuongHieuList.map((item, index) => (
                  <Select.Option
                    key={`sp_${index}`}
                    value={item.value.toLocaleLowerCase()}
                  >
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="noiDung"
                  label="Nội dung"
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Nhập nội dung phản ánh"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}
        {/*End  thông tin phản ánh website */}
        {/* Start thông tin phản ánh sản phẩm */}
        {complaintType === 'Sản phẩm' && (
          <div className='fieldsetWrapper'>
            <div className='legend'>Thông tin phản ánh sản phẩm</div>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="loai"
                  label="Loại phản ánh sản phẩm"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn loại phản ánh">
                    {phanAnhSanPham.map((item, index) => (
                      <Select.Option key={`sp_${index}`} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="tenMien"
                  label="Tên miền"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên miền" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tenSanPham"
                  label="Tên sản phẩm"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="loaiSanPham"
                  label="Loại sản phẩm"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn loại phản ánh">
                    {LoaiSanPhamConstant.getDropdownList().map(
                      (item, index) => (
                        <Select.Option key={`sp_${index}`} value={item.value}>
                          {item.label}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* <Form.Item
                  name="thuongHieuId"
                  label="Tên thương hiệu"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên thương hiệu" />
                </Form.Item> */}
                <Form.Item
                  label="Thương hiệu"
                  name="thuongHieuId"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập thông tin này!',
                    },
                  ]}
                >
                  <Select placeholder="Chọn thương hiệu">
                    {thuongHieuList.map((item, index) => (
                      <Select.Option
                        key={`sp_${index}`}
                        value={item.value.toLocaleLowerCase()}
                      >
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Hình ảnh sản phẩm" name="fileDinhKem">
                  <UploadFiler
                    listType="picture-card"
                    maxFiles={5}
                    fileList={attachmentFileList}
                    setFileList={setAttachmentFileList}
                    type={FileTypeConstant.FileDinhKemPhanAnh}
                    setUploadedData={setAttachmentUploadedData}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="noiDung"
                  label="Nội dung"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Nhập nội dung phản ánh"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}
        {/*End  thông tin phản ánh sản phẩm */}
      <Row>
        <Col span={24}>
          <Button type="primary" title="Gửi khiếu nại" onClick={handleFinish}>
            Gửi khiếu nại
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PhanAnh;
