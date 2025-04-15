"use client";
import { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const DragAndDropComponent = () => {
    const [layout, setLayout] = useState([
        { i: "1", x: 0, y: 0, w: 2, h: 2 },
        { i: "2", x: 2, y: 0, w: 2, h: 1 },
        { i: "3", x: 0, y: 2, w: 4, h: 1 },
    ]);

    const handleLayoutChange = (newLayout: any) => {
        setLayout(newLayout);
    };

    return (
        <div className="p-4 bg-gray-100">
            <GridLayout
                className="layout"
                layout={layout}
                cols={4}
                rowHeight={20}
                width={800}
                onLayoutChange={handleLayoutChange}
                draggableHandle=".drag-handle"
            >
                <div key="1" className="bg-white p-4 border rounded">
                    <div className="drag-handle cursor-grab bg-gray-200 p-2 rounded text-center">
                        🟰 Kéo thả
                    </div>
                    <img
                        src="/image1.png"
                        className="w-full h-auto rounded-md"
                        alt="image1"
                    />
                </div>
                <div key="2" className="bg-white p-4 border rounded">
                    <div className="drag-handle cursor-grab bg-gray-200 p-2 rounded text-center">
                        🟰 Kéo thả
                    </div>
                    <p className="text-lg font-bold">Tiêu đề bài viết</p>
                </div>
                <div key="3" className="bg-white p-4 border rounded">
                    <div className="drag-handle cursor-grab bg-gray-200 p-2 rounded text-center">
                        🟰 Kéo thả
                    </div>
                    <p className="text-gray-600">Mô tả bài viết...</p>
                </div>
            </GridLayout>
        </div>
    );
};

export default DragAndDropComponent;
