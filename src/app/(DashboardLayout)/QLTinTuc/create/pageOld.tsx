"use client";
import { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import withAuthorization from "@/libs/authentication";
import { Button, Col, Input, Layout, Row } from "antd";

const { TextArea } = Input;
const { Header: AntHeader } = Layout;

// Định nghĩa kiểu dữ liệu cho props
interface EditorProps {
    onSave: (data: OutputData) => void;
}

const Create: React.FC<EditorProps> = ({ onSave }) => {
    const editorRef = useRef<EditorJS | null>(null);
    const [data, setData] = useState<OutputData | null>(null);

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "editorjs",
                data: data || undefined,
                placeholder: 'Nhập nội dung hoặc gõ "/" để thêm khối',
                tools: {
                    header: {
                        class: Header as unknown as ToolConstructable,
                        inlineToolbar: true,
                        config: { placeholder: "Nhập tiêu đề..." },
                    },
                    list: {
                        class: List as unknown as ToolConstructable,
                        inlineToolbar: true,
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: "/api/upload-image", // API upload ảnh
                                byUrl: "/api/fetch-image",
                            },
                        },
                    },
                    table: {
                        class: Table as unknown as ToolConstructable,
                        inlineToolbar: true,
                        config: {
                            rows: 3,
                            cols: 3,
                        },
                    },
                    paragraph: {
                        class: Paragraph as unknown as ToolConstructable,
                        inlineToolbar: true,
                        config: {
                            placeholder: "Nhập nội dung...",
                        },
                    },
                },
                onReady: () => console.log("Editor.js is ready!"),
                onChange: async () => {
                    const savedData = await editorRef.current?.save();
                    console.log("Editor Data:", savedData);
                },
            });

            return () => {
                editorRef.current?.destroy();
                editorRef.current = null;
            };
        }
    }, []);

    const handleSave = async () => {
        if (editorRef.current) {
            const output = await editorRef.current.save();
            onSave(output); // Trả dữ liệu về component cha
        }
    };

    return (
        <Layout style={{ paddingTop: 64 }}>
            <Row>
                <Col span={12}>
                    <div id="editorjs" style={{ marginTop: "20px" }}></div>
                </Col>
            </Row>
        </Layout>
    );
};
export default withAuthorization(Create, "");
