"use client";
import { createEditType } from "@/interface/qlTinTuc/qlTinTuc";
import {
  Checkbox,
  DatePicker,
  Form,
  FormProps,
  Input,
  Select,
  UploadFile,
  Row,
  Col,
  Button,
  Card,
  Collapse,
  Slider,
  Image,
  TreeSelect,
} from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ForwardedRef,
} from "react";
import { DropdownOption, DropdownTreeOptionAntd } from "@/interface/general";
import { toast } from "react-toastify";
import UploadFiler from "@/libs/UploadFilter";
import dynamic from "next/dynamic";

import { CaretRightOutlined } from "@ant-design/icons";
import { qLTinTuc_TagService } from "@/services/QLTinTuc_Tag/QLTinTuc_Tag.service";
import { chuyenMucService } from "@/services/ChuyenMuc/ChuyenMuc.service";
import { getCroppedImage } from "@/utils/ImageCrop";
import Cropper from "react-easy-crop";
import classes from "../page.module.css";
import "cropperjs/dist/cropper.css";
import { blobToRcFile } from "@/utils/blobToRcFile";

import {} from "react";
import type { ReactQuillProps } from "react-quill";
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const QuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    const QuillComponent = ({
      forwardedRef,
      ...props
    }: ReactQuillProps & { forwardedRef?: ForwardedRef<any> }) => (
      <RQ ref={forwardedRef} {...props} />
    );

    QuillComponent.displayName = "QuillComponent"; // Đặt displayName để tránh lỗi

    return QuillComponent;
  },
  {
    ssr: false,
  }
);
// import ReactQuill
import "react-quill/dist/quill.snow.css";
import { createSlug } from "@/utils/string";
import convertDayjsToISOString from "@/utils/convertDayjsToISOString";
import LoaiTaiLieuConstant from "@/constants/LoaiTaiLieuConstant";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import "dayjs/locale/vi";
import dayjs from "dayjs";
dayjs.locale("vi");
import { qlTinTucService } from "@/services/qlTinTuc/qlTinTuc.service";
import { uploadFileService } from "@/services/File/uploadFile.service";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckboxChangeEvent } from "antd/lib";
const currentDayjs = dayjs(new Date());

const StaticFileUrl = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL;

const aspectRatios = [
  { label: "Giữ nguyên kích thước", value: 0 },
  { label: "1:1", value: 1 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:2", value: 3 / 2 },
];

const CreateOrUpdate: React.FC = () => {
  const [form] = Form.useForm();
  const [uploadedData, setUploadedData] = useState<string[]>([]);
  const [uploadedDataImage, setUploadedDataImage] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [editorValue, setEditorValue] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const router = useRouter();
  //chỉnh sửa ảnh
  const [isCropping, setIsCropping] = useState(true); // Toggle chế độ crop
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const uploadRef = useRef<{
    triggerChange: (newFile: File, newFileList: UploadFile[]) => void;
  } | null>(null);

  const [dropDownChuyenMuc, setDropDownChuyenMuc] = useState<
    DropdownTreeOptionAntd[]
  >([]);
  // const [dropDownChuyenMuc, setDropDownChuyenMuc] = useState<DropdownOption[]>(
  //   []
  // );
  const [dropdownTag, setDropDownTag] = useState<DropdownOption[]>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [slugtitle, setSlugTitle] = useState<string>("");
  const searchParams = useSearchParams();
  const chuyenMuc = searchParams.get("chuyenMuc");
  //global state
  const currentTintuc = useSelector(
    (state: RootState) => state.tinTuc.currentTinTuc
  );
  //xử lý react-quill
  const quillRef = useRef<any>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = createSlug(title);
    form.setFieldValue("slugTitle", slug);
    setSlugTitle(slug);
  };

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: any
  ) => {
    try {
      const sendForm = {
        ...formData,
        id: currentTintuc?.id || undefined,
        publicDate: formData.publicDate
          ? (formData.publicDate = convertDayjsToISOString(formData.publicDate))
          : undefined,
        dateEnd: formData.dateEnd
          ? (formData.dateEnd = convertDayjsToISOString(formData.dateEnd))
          : undefined,
        dateShow: formData.dateShow
          ? (formData.dateShow = convertDayjsToISOString(formData.dateShow))
          : undefined,
        fileDinhKemId:
          uploadedData && uploadedData.length > 0 ? uploadedData[0] : undefined,
      };
      console.log(sendForm);

      const response = currentTintuc
        ? await qlTinTucService.Update(sendForm)
        : await qlTinTucService.Create(sendForm);

      if (response.status) {
        form.resetFields();
        setUploadedData([]);
        setUploadedDataImage([]);
        setFileList([]);
        setImageSrc("");
        if (inputRef.current) {
          inputRef.current.value = ""; // Reset file input
        }
        if (currentTintuc) {
          toast.success(`Cập nhật thành công`);
          router.push("/QLTinTuc");
        } else {
          toast.success(`Thêm mới thành công`);
        }
      } else {
        toast.error(`Có lỗi xảy ra, vui  lòng thử lại`);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleGetDropDownChuyenMuc = useCallback(async () => {
    try {
      // const response = await chuyenMucService.GetDropDown();
      const response = await chuyenMucService.GetTreeDropDown();
      if (response.status) {
        setDropDownChuyenMuc(response.data);
      }
    } catch (err) {
      setDropDownChuyenMuc([]);
    }
  }, []);

  const handleGetDropDownTag = useCallback(async () => {
    try {
      const response = await qLTinTuc_TagService.GetDropDown();
      if (response.status) {
        setDropDownTag(response.data);
      }
    } catch (error) {
      setDropDownTag([]);
    }
  }, []);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files) return;
      const file = input.files[0];
      const formData = new FormData();
      formData.append("Files", file);
      formData.append("FileType", "QuillImage");
      try {
        const response = await uploadFileService.upload(formData);
        if (response.status) {
          const imageUrl = `${StaticFileUrl}${response.data[0].duongDanFile}`;
          const editor = quillRef.current.editor;
          const range = quillRef.current.selection;
          if (editor) {
            if (range) {
              editor.insertEmbed(range.index, "image", imageUrl);
            }
          }
        } else {
          toast.error("Lỗi khi upload file");
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };
  };

  const handleClickPublish = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const dateEnd = form.getFieldValue("dateEnd");
      const dateShow = form.getFieldValue("dateShow");
      const publicDate = form.getFieldValue("publicDate");

      form.setFieldsValue({
        dateEnd: dateEnd || currentDayjs,
        dateShow: dateShow || currentDayjs,
        publicDate: publicDate || currentDayjs,
      });
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler, // Gán hàm xử lý ảnh
        },
      },
    }),
    []
  );

  const handleChangeEditor = (value: string) => {
    setEditorValue(value); // Update editor value on change
  };

  // Xử lý khi chọn ảnh
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedImg = await getCroppedImage(
      imageSrc,
      croppedAreaPixels,
      rotation
    );

    if (croppedImg) {
      const croppedFile = blobToRcFile(croppedImg, "image-thumb.jpg");
      const newFile: UploadFile = {
        lastModified: Date.now(),
        lastModifiedDate: new Date(),
        uid: `${Date.now()}`,
        name: croppedFile.name,
        status: "uploading",
        type: croppedFile.type,
        originFileObj: croppedFile,
        size: croppedFile.size,
      };
      const file = new File([croppedImg], "cropped_image.jpg", {
        type: "image/jpeg",
      });
      setFileList([newFile]);
      uploadRef.current?.triggerChange(file, [...fileList, newFile]);
      toast.success("Lưu ảnh thành công");
    }
  };

  useEffect(() => {
    handleGetDropDownChuyenMuc();
    handleGetDropDownTag();
  }, []);

  useEffect(() => {
    if (currentTintuc) {
      if (currentTintuc.thumbnail) {
        setImageSrc(`${StaticFileUrl}${currentTintuc.thumbnail}`);
      } else {
        setImageSrc("");
      }
      form.setFieldsValue({
        ...currentTintuc,
        publicDate: currentTintuc.publicDate
          ? dayjs(currentTintuc.publicDate)
          : currentDayjs,
        dateShow: currentTintuc.dateShow
          ? dayjs(currentTintuc.dateShow)
          : currentDayjs,
        dateEnd: currentTintuc.dateEnd
          ? dayjs(currentTintuc.dateEnd)
          : currentDayjs,
        chuyenMucs: currentTintuc.chuyenMucs
          ? currentTintuc.chuyenMucs.split(",")
          : [],
        tags: currentTintuc.tags ? currentTintuc.tags.split(",") : [],
        keywords: currentTintuc.keywords
          ? currentTintuc.keywords.split(",")
          : [],
      });
    } else {
      setUploadedData([]);
      setFileList([]);
      form.resetFields();

      // if (chuyenMuc) {
      //   form.setFieldValue("chuyenMucs", chuyenMuc);
      // }
    }
  }, [currentTintuc]);

  return (
    <Card>
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Col>

          <Col span={18}>
            <Col span={24}>
              <Form.Item<createEditType>
                label="Tiêu đề"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin này!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập tiêu đề"
                  onChange={(e) => {
                    handleTitleChange(e);
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item<createEditType>
                label="Slug"
                name="slugTitle"
                rules={[
                  {
                    required: true,
                    message: "Yêu cầu nhập slug",
                  },
                ]}
              >
                <Input placeholder="Nhập Slug" value={slugtitle} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item<createEditType> label="Mô tả" name="description">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Nội dung"
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin này!",
                  },
                ]}
              >
                <QuillEditor
                  forwardedRef={quillRef}
                  modules={modules}
                  value={editorValue}
                  onChange={handleChangeEditor}
                  theme="snow"
                  placeholder="Nhập nội dung..."
                />
              </Form.Item>
            </Col>
          </Col>

          <Col span={6}>
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["anhDaiDien"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={[
                    {
                      key: "anhDaiDien",
                      label: "Ảnh đại diện",
                      children: (
                        <div className={classes.cropContainer}>
                          <input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleFileChange}
                            style={{
                              marginBottom: 10,
                            }}
                          />
                          {imageSrc && (
                            <>
                              <div className={classes.cropArea}>
                                <Cropper
                                  image={imageSrc || ""}
                                  crop={crop}
                                  aspect={aspect}
                                  zoom={zoom}
                                  rotation={rotation}
                                  onCropChange={setCrop}
                                  onZoomChange={setZoom}
                                  onRotationChange={setRotation}
                                  onCropComplete={onCropComplete}
                                />
                                {/* {isCropping ? (
                                ) : (
                                  <Image
                                    src={imageSrc}
                                    alt="Original"
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'contain',
                                    }}
                                  />
                                )} */}
                              </div>

                              <div className={classes.controls}>
                                <span>Chọn kích thước cắt:</span>
                                <Select
                                  defaultValue={16 / 9}
                                  options={aspectRatios}
                                  style={{
                                    width: 200,
                                    marginBottom: 10,
                                  }}
                                  onChange={(value) => {
                                    console.log(value);
                                    setAspect(value);
                                    if (value) {
                                      setIsCropping(true);
                                    } else {
                                      setIsCropping(false);
                                    }
                                  }}
                                />
                                <span>Phóng to:</span>
                                <Slider
                                  min={1}
                                  max={3}
                                  step={0.1}
                                  value={zoom}
                                  onChange={setZoom}
                                />

                                <span>Xoay:</span>
                                <Slider
                                  min={-180}
                                  max={180}
                                  step={1}
                                  value={rotation}
                                  onChange={setRotation}
                                />

                                <Button
                                  type="primary"
                                  onClick={handleCropImage}
                                >
                                  Lưu ảnh
                                </Button>

                                <div hidden={true}>
                                  <UploadFiler
                                    maxFiles={1}
                                    fileList={fileList}
                                    setFileList={setFileList}
                                    type={
                                      LoaiTaiLieuConstant.FileThumbnailTinTuc
                                    }
                                    setUploadedData={setUploadedData}
                                    ref={uploadRef}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["dsChuyenMuc"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={[
                    {
                      key: "dsChuyenMuc",
                      label: "Chuyên mục tin",
                      children: (
                        <Form.Item<createEditType> name="chuyenMucs">
                          {/* <Select
                            mode={"multiple"}
                            showSearch
                            allowClear
                            options={
                              chuyenMuc
                                ? dropDownChuyenMuc.filter(
                                    (opt) => opt.value === chuyenMuc
                                  )
                                : dropDownChuyenMuc
                            }
                          /> */}
                          <TreeSelect
                            showSearch
                            allowClear
                            multiple
                            style={{ width: "100%" }}
                            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                            treeDefaultExpandAll
                            treeData={
                              chuyenMuc
                                ? dropDownChuyenMuc.filter(
                                    (opt) => opt.value === chuyenMuc
                                  )
                                : dropDownChuyenMuc
                            }
                          />
                        </Form.Item>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["keys"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={[
                    {
                      key: "keys",
                      label: "Từ khoá",
                      children: (
                        <Form.Item<createEditType> name="keywords">
                          <Select mode="tags" allowClear />
                        </Form.Item>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["dsTag"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={[
                    {
                      key: "dsTag",
                      label: "Tag tin bài",
                      children: (
                        <Form.Item<createEditType> name="tags">
                          <Select
                            mode="multiple"
                            showSearch
                            allowClear
                            options={dropdownTag}
                          />
                        </Form.Item>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["thoiGian"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={[
                    {
                      key: "thoiGian",
                      label: "Thời gian",
                      children: (
                        <>
                          <Col span={24}>
                            <Form.Item label="Ngày đăng tin " name="publicDate">
                              <DatePicker
                                showTime
                                format="DD/MM/YYYY HH:mm:ss"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Ngày hiển thị" name="dateShow">
                              <DatePicker
                                showTime
                                format="DD/MM/YYYY HH:mm:ss"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Ngày hết hiệu lực" name="dateEnd">
                              <DatePicker
                                showTime
                                format="DD/MM/YYYY HH:mm:ss"
                              />
                            </Form.Item>
                          </Col>
                        </>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["tuyChon"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  items={[
                    {
                      key: "tuyChon",
                      label: "Tùy chọn",
                      children: (
                        <>
                          <Form.Item<createEditType>
                            // label="Tin nổi bật?"
                            valuePropName="checked"
                            name="isHot"
                          >
                            <Checkbox>Tin nổi bật?</Checkbox>
                          </Form.Item>

                          <Form.Item<createEditType>
                            valuePropName="checked"
                            // label="Cho phép bình luận?"
                            name="isComment"
                          >
                            <Checkbox>Cho phép bình luận?</Checkbox>
                          </Form.Item>

                          <Form.Item<createEditType>
                            valuePropName="checked"
                            // label="Phê duyệt?"
                            name="isApproved"
                          >
                            <Checkbox>Phê duyệt?</Checkbox>
                          </Form.Item>

                          <Form.Item<createEditType>
                            // label="Xuất bản?"
                            valuePropName="checked"
                            name="isPublish"
                          >
                            <Checkbox onChange={handleClickPublish}>
                              Xuất bản?
                            </Checkbox>
                          </Form.Item>

                          <Form.Item<createEditType>
                            // label="Trang chủ?"
                            valuePropName="checked"
                            name="isHome"
                          >
                            <Checkbox>Trang chủ?</Checkbox>
                          </Form.Item>
                        </>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default CreateOrUpdate;
