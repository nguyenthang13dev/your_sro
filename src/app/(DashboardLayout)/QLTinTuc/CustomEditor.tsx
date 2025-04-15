"use client"; // Đảm bảo chạy trên client

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// CKEditor4 cần import đúng cách, sử dụng { default } để lấy export mặc định
const CKEditor = dynamic<any>(
    () => import("ckeditor4-react").then((mod) => mod.CKEditor),
    {
        ssr: false,
    },
);

const CustomEditor = ({
    data,
    onChange,
}: {
    data: string;
    onChange: (data: string) => void;
}) => {
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
    const [editorConfig, setEditorConfig] = useState<any>({
        removePlugins: "notification,notificationaggregator",
        disableNativeSpellChecker: true,
        height: 500,
        extraPlugins: "uploadimage,image",
        filebrowserUploadUrl: `${process.env.NEXT_PUBLIC_FILE_BASE}/attachment/uploads`, // API URL để upload ảnh
        filebrowserUploadMethod: "xhr", // Phương thức POST để upload ảnh
    });

    const handleDialogDefinition = (event: any) => {
        const dialogName = event.data.name;
        const dialogDefinition = event.data.definition;

        if (dialogName === "image") {
            const infoTab = dialogDefinition.getContents("info");

            // Set default Alt text
            infoTab.get("txtAlt").default = "Default Alt Text";

            // Set default Width and Height
            infoTab.get("txtWidth").default = "500";
            infoTab.get("txtHeight").default = "300";

            // Set default Border, HSpace, VSpace
            infoTab.get("txtBorder").default = "2";
            infoTab.get("txtHSpace").default = "5";
            infoTab.get("txtVSpace").default = "5";
        }
    };

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    return (
        <>
            {editorLoaded ? (
                <CKEditor
                    config={editorConfig}
                    onInstanceReady={(evt: any) => {
                        console.log("CKEditor instance đã sẵn sàng!");
                        console.log(evt.editor);

                        evt.editor.on(
                            "dialogDefinition",
                            handleDialogDefinition,
                        );

                        evt.editor.on("fileUploadRequest", (event: any) => {
                            const fileLoader = event.data.fileLoader;
                            const xhrRq = fileLoader.xhr; // Tạo một XMLHttpRequest mới
                            const formData = new FormData(); // Khởi tạo FormData để chứa file
                            formData.append("upload", fileLoader.file); // Thêm file vào formData
                            // Thêm các header tùy chỉnh nếu cần
                            // Đặt URL upload
                            xhrRq.open("POST", fileLoader.uploadUrl, true);
                            xhrRq.withCredentials = true; // Đảm bảo cookie được gửi với yêu cầu
                            // Gửi request lên server với formData
                            xhrRq.send(formData);
                            // Ngừng hành động mặc định của CKEditor (không gửi request mặc định)
                            event.cancel();
                        });
                    }}
                    data={data}
                    onChange={(event: any) => onChange(event.editor.getData())}
                />
            ) : (
                <p>Loading editor...</p>
            )}
        </>
    );
};

export default CustomEditor;
