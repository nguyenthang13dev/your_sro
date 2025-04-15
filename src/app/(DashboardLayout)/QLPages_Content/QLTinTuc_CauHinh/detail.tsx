import React from "react";
import { Drawer } from "antd";
import { tableQLTinTuc_CauHinhDataType } from "@/interface/QLTinTuc_CauHinh/QLTinTuc_CauHinh";

import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
const ResponsiveGridLayout = WidthProvider(Responsive);

interface QLTinTuc_CauHinhViewProps {
    qLTinTuc_CauHinh?: tableQLTinTuc_CauHinhDataType | null;
    isOpen: boolean;
    onClose: () => void;
}

const QLTinTuc_CauHinhDetail: React.FC<QLTinTuc_CauHinhViewProps> = ({
    qLTinTuc_CauHinh,
    isOpen,
    onClose,
}) => {
    const returnData = (key: string) => {
        if (key == "image") {
            return (
                <div key="image" className="bg-white p-4 border rounded">
                    <div className="drag-handle cursor-grab bg-gray-200 p-2 rounded text-center">
                        {" "}
                        🟰 Kéo thả{" "}
                    </div>
                    <img
                        src="/img/no_image_default.jpg"
                        className="w-full rounded-md"
                        alt="image1"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>
            );
        }

        if (key == "title") {
            return (
                <div
                    key="title"
                    data-grid={{ x: 0, y: 0, w: 1, h: 3 }}
                    className="bg-white p-4 border rounded"
                >
                    <div className="drag-handle cursor-grab bg-gray-200 p-2 rounded text-center">
                        {" "}
                        🟰 Kéo thả{" "}
                    </div>
                    <p className="text-lg font-bold"> Tiêu đề bài viết </p>
                </div>
            );
        }

        if (key == "desc") {
            return (
                <div
                    key="desc"
                    data-grid={{ x: 0, y: 0, w: 1, h: 3 }}
                    className="bg-white p-4 border rounded"
                >
                    <div className="drag-handle cursor-grab bg-gray-200 p-2 rounded text-center">
                        {" "}
                        🟰 Kéo thả{" "}
                    </div>
                    <p className="text-gray-600"> Mô tả bài viết... </p>
                </div>
            );
        }

        if (key == "publishdate") {
            return (
                <div
                    key="publishdate"
                    data-grid={{ x: 0, y: 0, w: 1, h: 3 }}
                    className="bg-white p-4 border rounded"
                >
                    <div className="drag-handle cursor-grab bg-gray-200 p-2 rounded text-center">
                        {" "}
                        🟰 Kéo thả{" "}
                    </div>
                    <p className="text-gray-600"> Ngày đăng </p>
                </div>
            );
        }
    };
    return (
        <Drawer
            title="Thông tin chi tiết"
            width="50%"
            placement="right"
            onClose={onClose}
            closable={true}
            open={isOpen}
        >
            <div>
                <h6 className="text-muted text-uppercase mb-3">
                    Thông tin chung
                </h6>

                <ResponsiveGridLayout
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={30}
                    isDraggable={false}
                    isResizable={false}
                >
                    {qLTinTuc_CauHinh?.content?.map((item, idx) => {
                        return (
                            <div
                                key={item.i}
                                data-grid={item} // Load đúng vị trí
                            >
                                {returnData(item.i)}
                            </div>
                        );
                    })}
                </ResponsiveGridLayout>
            </div>
        </Drawer>
    );
};

export default QLTinTuc_CauHinhDetail;
