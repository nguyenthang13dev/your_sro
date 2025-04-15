"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

// Import các plugin mở rộng
import basicBlocks from "grapesjs-blocks-basic";
import forms from "grapesjs-plugin-forms";
import exportPlugin from "grapesjs-plugin-export";
import webpagePreset from "grapesjs-preset-webpage";
import customCode from "grapesjs-custom-code";
import countdown from "grapesjs-component-countdown";
import { toast } from "react-toastify";
import { qLPages_Content } from "@/services/QLPages_Content/QLPages_Content.service";
import {
  createEditType,
  tableQLPages_ContentDataType,
} from "@/interface/QLPages_Content/QLPages_Content";

import { Button, Modal } from "antd";
import { FormOutlined, SaveOutlined } from "@ant-design/icons";
import { searchDataType } from "@/interface/QLPages_Banner/QLPages_Banner";
import { tableQLPage_ComponentDataType } from "@/interface/QLPage_Component/QLPage_Component";
import { qLPage_ComponentService } from "@/services/QLPage_Component/QLPage_Component.service";

import WidgetConfig from "./WidgetConfig";
import ComponentConfig from "./ComponentConfig";
import ViewCauHinh from "./QLTinTuc_CauHinh/ViewCauHinh";
import FooterConfig from "./FooterConfig";
import RenderComponent from "./RenderComponent";
import ReactDOMServer from "react-dom/server";
import PreviewComponent from "./QLPage_Component/PreviewComponent";

interface QLPageWidget {
  idPage: string;
  // title: string;
  // slug: string;
}

const EditorComponent: React.FC<QLPageWidget> = ({ idPage }) => {
  const [editor, setEditor] = useState<Editor | undefined>(); // Set editor initially to null
  const [contentPages, setContentPages] =
    useState<tableQLPages_ContentDataType>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [dsComponent, setDsComponet] = useState<
    tableQLPage_ComponentDataType[]
  >([]);

  const contentRef = useRef<HTMLDivElement>(null);

  const [html, setHtmlCode] = useState<string>("");
  const [css, setCssCode] = useState<string>("");

  //toggle show
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isOpenWidget, setIsOpenWidget] = useState(false);
  const [isOpenComponent, setIsOpenComponent] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [isOpenFooter, setIsOpenFooter] = useState(false);
  const [isOpenPreviewComponent, setIsOpenPreviewComponent] = useState(false);
  const [selectedComponentCode, setSelectedComponentCode] =
    useState<string>("");

  const handleGetDanhSachComponent = useCallback(async () => {
    try {
      const search: searchDataType = {};
      const datas = await qLPage_ComponentService.getListComponent(search);
      if (datas.status) {
        setDsComponet(datas.data);
      }
    } catch (err) {
      toast.error("Có lỗi: " + err);
    }
  }, []);

  const handleGetComponent = useCallback(async () => {
    try {
      if (idPage) {
        if (editor && editorReady) {
          const response = await qLPages_Content.GetByIdPage(idPage);
          try {
            if (response != null && response.data != null) {
              if (editor != undefined && editor != null) {
                editor.setComponents(JSON.parse(response.data.components));
                editor.setStyle(JSON.parse(response.data.style));
                setContentPages(response.data);
              }
            }
          } catch (error) {
            console.error("Lỗi khi parse dữ liệu component/style", error);
          }
        }
      }
    } catch (err) {
      toast.error("Có lỗi khi tìm kiếm");
    }
  }, [editor]);

  // Hàm để lưu dữ liệu
  const handleSaveData = async (editor: Editor | undefined) => {
    try {
      if (!editor) {
        return;
      }
      const components = editor.getComponents();
      const styles = editor.getCss();
      const html = editor.getHtml();
      const model = {
        Components: JSON.stringify(components),
        Style: JSON.stringify(styles),
        IsTrangChu: false,
        IdPage: idPage || "",
        Id: contentPages?.id,
        Html: JSON.stringify(html),
      } as createEditType;

      const response = await qLPages_Content.Create(model);
      if (response.status) {
        toast.success("Tạo mới thành công");
      } else {
        toast.error("Tạo mới thất bại");
      }
    } catch (err) {
      toast.error("Tạo mới page không thành công");
    }
  };

  useEffect(() => {
    handleGetDanhSachComponent();
  }, []);

  useEffect(() => {
    // if (dsWidget.length === 0) return; // Đợi dsWidget có dữ liệu

    const editor = grapesjs.init({
      container: "#editor",
      height: "100vh",
      storageManager: false,
      fromElement: true,
      forceClass: false,
      // assetManager: {
      //     upload: "/api/upload", // API để upload ảnh
      //     uploadName: "files",
      //     headers: { Authorization: "Bearer your_token" }, // Nếu cần auth
      // },
      i18n: {
        locale: "vi", // Đặt tiếng Việt làm mặc định
        messages: {
          vi: {
            styleManager: {
              empty: "Không có thuộc tính nào",
              display: "Hiển thị",
            },
            assetManager: {
              addButton: "Thêm ảnh",
              inputPlh: "URL hình ảnh",
            },
            blockManager: {
              labels: {
                text: "Văn bản",
                image: "Hình ảnh",
                link: "Liên kết",
                column1: "1 Cột",
                column2: "2 Cột",
                column3: "3 Cột",
              },
              categories: {
                basic: "Cơ bản",
              },
            },
          },
        },
      },
      plugins: [
        basicBlocks,
        forms,
        exportPlugin,
        webpagePreset,
        customCode,
        countdown,
      ],
    });

    // Chọn ngôn ngữ mặc định là Tiếng Việt
    editor.I18n.setLocale("vi");
    //container
    editor.BlockManager.add("container", {
      label: "Container",
      category: "Basic",
      attributes: { class: "fa fa-window-maximize" },
      content: {
        type: "container",
      },
    });

    editor.Components.addType("container", {
      model: {
        defaults: {
          tagName: "div",
          attributes: { class: "container-layout" },
          droppable: true,
          draggable: true,
          components: ``,
          styles: `
            .container-layout {
              min-height: 100px;
              padding: 10px;
            }@
          `,
        },
      },
    });

    //header
    editor.BlockManager.add("header", {
      label: "Header",
      category: "Basic",
      attributes: { class: "fa fa-square-o" },
      content: {
        type: "header",
      },
    });

    editor.Components.addType("header", {
      model: {
        defaults: {
          tagName: "header",
          attributes: { class: "header-container" },
          droppable: true,
          draggable: true,
          components: ``, // Nội dung mặc định
          styles: `
            .header-container {
              height: 100px;
            }
          `,
        },
      },
    });

    editor.Components.addType("custom", {
      model: {
        defaults: {
          tagName: "div",
          attributes: { class: "custom-component" },
          droppable: true,
          draggable: true,
          selectable: true,
          components: "",
        },
      },
    });

    //  Thêm widget vào Block Manager để kéo thả
    dsComponent?.forEach((widget) => {
      editor.BlockManager.add(`widget-banner-block${widget.id}`, {
        label: `<div>
                  ${
                    widget.image
                      ? `<img src="${process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL}${widget.image}" alt="img" style="width: 100%; height: auto;" />`
                      : ""
                  }
                   <br /> <br />
                  <span>${widget.code}</span>
                </div>`,
        content: {
          type: "custom",
          components: `<div>${widget.elements}</div>`,
        },
        category: widget.nameType,
        attributes: { "data-code": widget.code },
      });
    });

    editor.StyleManager.addSector("link-options", {
      name: "Link",
      open: false,
      properties: [
        {
          name: "URL",
          property: "href",
          type: "text",
          defaults: "https://example.com",
          onChange(value) {
            const selected = editor.getSelected();
            if (selected && selected.get("tagName") === "a") {
              selected.set("attributes", { href: value });
            }
          },
        },
      ],
    });

    editor.StyleManager.addProperty("typography", {
      name: "Text Transform",
      property: "text-transform",
      type: "select",
      defaults: "none",
      options: [
        { id: "none", label: "None" },
        { id: "uppercase", label: "Uppercase" },
        { id: "lowercase", label: "Lowercase" },
        { id: "capitalize", label: "Capitalize" },
      ],
    });

    editor.StyleManager.addProperty("background", {
      name: "Background Image",
      property: "background-image",
      type: "file", // Cho phép upload hoặc nhập URL
      defaults: "none",
    });

    setEditor(editor);

    editor.on("load", () => {
      setEditorReady(true);

      setTimeout(() => {
        document.querySelectorAll(".gjs-block").forEach((block: any) => {
          const blockCode = block.getAttribute("data-code"); // Lấy từ thuộc tính tùy chỉnh

          const blockData = editor.BlockManager?.getAll().find(
            (b: any) => b.get("attributes")["data-code"] === blockCode
          );

          const content = blockData?.get("content");
          const isCustom =
            typeof content === "object" &&
            "type" in content &&
            content.type === "custom";

          if (isCustom) {
            block.addEventListener("dblclick", () => {
              setIsOpenPreviewComponent(true);
              setSelectedComponentCode(blockCode);
            });
          }
        });
      }, 500);
    });

    return () => {
      editor.destroy();
      setEditor(undefined);
    };
  }, [dsComponent]);

  useEffect(() => {
    if (editor && editorReady) {
      handleGetComponent();
    }
  }, [editor, editorReady]);

  return (
    <>
      <Button
        onClick={() => {
          handleSaveData(editor);
        }}
        type="primary"
        size="small"
        className="mb-2 mx-2"
        icon={<SaveOutlined />}
      >
        Lưu trang
      </Button>

      <Button
        onClick={() => {
          setIsOpenPreview(true);
        }}
        type="primary"
        size="small"
        className="mx-2"
        icon={<FormOutlined />}
      >
        Cấu hình xem trước
      </Button>
      <Button
        onClick={() => {
          setIsOpenComponent(true);
        }}
        type="primary"
        size="small"
        className="mx-2"
        icon={<FormOutlined />}
      >
        Components
      </Button>
      <Button
        onClick={() => {
          setIsOpenWidget(true);
        }}
        type="primary"
        size="small"
        className="mx-2"
        icon={<FormOutlined />}
      >
        Widgets
      </Button>

      <Button
        onClick={() => {
          setIsOpenFooter(true);
        }}
        type="primary"
        size="small"
        className="mx-2"
        icon={<FormOutlined />}
      >
        Footer
      </Button>

      <div id="editor"></div>
      <Modal
        open={isOpen}
        title="Nội dung trang"
        width="90%"
        onCancel={() => {
          setIsOpen(false);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div
          ref={contentRef}
          dangerouslySetInnerHTML={{
            __html: `
                            <style>
                                ${css}
                            </style>
                                ${html}
                        `,
          }}
        ></div>
      </Modal>
      {/*Drawer cấu hình preview*/}
      <FooterConfig
        isOpen={isOpenFooter}
        onClose={() => setIsOpenFooter(false)}
      />
      <ViewCauHinh
        isOpen={isOpenPreview}
        onClose={() => setIsOpenPreview(false)}
        isCauHinh={false}
      />
      <ComponentConfig
        isOpen={isOpenComponent}
        onClose={() => setIsOpenComponent(false)}
      />
      <WidgetConfig
        isOpen={isOpenWidget}
        onClose={() => setIsOpenWidget(false)}
      />
      <PreviewComponent
        codeComponent={selectedComponentCode}
        isOpen={isOpenPreviewComponent}
        onClose={() => setIsOpenPreviewComponent(false)}
      />
    </>
  );
};

export default EditorComponent;
