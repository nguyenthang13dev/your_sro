import {
  createEditType,
  tableQLPage_ComponentDataType,
} from "@/interface/QLPage_Component/QLPage_Component";
import { Form, FormProps, Image, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { qLPage_ComponentService } from "@/services/QLPage_Component/QLPage_Component.service";
import { toast } from "react-toastify";
import { DropdownOption } from "@/interface/general";
import { removeAccents } from "@/libs/CommonFunction";
import UploadFiler from "@/libs/UploadFilter";
import { UploadFile } from "antd/lib";
import { UploadedItem } from "@/interface/QLPages_Banner/QLPages_Banner";
import { TaiLieuDinhKem } from "@/interface/taiLieuDinhKem/taiLieuDinhKem";
import LoaiTaiLieuConstant from "@/constants/LoaiTaiLieuConstant";

interface Props {
  isOpen: boolean;
  QLPage_Component?: tableQLPage_ComponentDataType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
  dropdownType: DropdownOption[];
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedData, setUploadedData] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedItem[]>([]);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.QLPage_Component) {
        const senData = {
          ...formData,
          imageId:
            uploadedData[0] != uploadedFiles[0].id
              ? uploadedData[0]
              : uploadedFiles[0].id,
        };
        const response = await qLPage_ComponentService.Update(senData);
        if (response.status) {
          toast.success("Chỉnh sửa thành công");
          form.resetFields();
          setUploadedFiles([]);
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const senData = {
          ...formData,
          imageId: uploadedData[0] ?? null,
        };
        const response = await qLPage_ComponentService.Create(senData);
        if (response.status) {
          toast.success("Thêm mới thành công");
          form.resetFields();
          setUploadedFiles([]);
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

  const handleChangeElemnet = (value: string) => {
    const valueEle = `[${value}]`;
    form.setFieldValue("elements", valueEle);
  };

  const handleMapEdit = () => {
    form.setFieldsValue(props.QLPage_Component);

    if (props.QLPage_Component && props.QLPage_Component.dataImage) {
      const newFile: UploadedItem = {
        id: props.QLPage_Component.dataImage.id,
        link: "",
        duongDanFile: props.QLPage_Component.dataImage.duongDanFile,
      };

      setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
    setUploadedFiles([]);
  };

  const onUploadSuccess = (fileData: TaiLieuDinhKem[]) => {
    if (fileData.length > 0) {
      const newFiles = fileData.map((file) => ({
        id: file.id,
        link: "",
        duongDanFile: file.duongDanFile,
      }));
      setUploadedFiles(newFiles);
    }
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.QLPage_Component && props.isOpen) {
      handleMapEdit();
    }
  }, [props.isOpen]);
  console.log(uploadedFiles);

  return (
    <Modal
      title={
        props.QLPage_Component != null
          ? "Chỉnh sửa compoents"
          : "Thêm mới compoents"
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
        {props.QLPage_Component && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}

        <Form.Item<createEditType>
          label="Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              handleChangeElemnet(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item<createEditType>
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <Select
            options={props.dropdownType}
            showSearch
            allowClear
            filterOption={(input, option) => {
              return removeAccents(option?.label ?? "")
                .toLowerCase()
                .includes(removeAccents(input).toLowerCase());
            }}
          />
        </Form.Item>
        <Form.Item<createEditType> label="Api" name="api">
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          label="Elements"
          name="elements"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType> label="Ảnh" name="imageId" layout="vertical">
          <UploadFiler
            setUploadedData={setUploadedData}
            fileList={fileList}
            setFileList={setFileList}
            type={LoaiTaiLieuConstant.QLPage_Component}
            maxFiles={1}
            handleSuccess={onUploadSuccess}
          />

          {uploadedFiles.length > 0 && uploadedFiles[0].duongDanFile && (
            <div style={{ marginTop: "10px" }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/Uploads/${uploadedFiles[0].duongDanFile}`}
                alt="Image"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
