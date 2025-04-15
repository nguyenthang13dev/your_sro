"use client";

import {
    gridItemDataType,
    tableQLTinTuc_Widget,
} from "@/interface/QLTinTuc_Widget/QLTinTuc_Widget";
import { Drawer } from "antd";
import React, { useState } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import { qLTinTuc_Widget } from "@/services/QLTinTuc_Widget/QLTinTuc_Widget.service";
const ResponsiveGridLayout = WidthProvider(Responsive);

interface DrawerDetail {
    isOpen: boolean;
    onSuccess: () => void;
    onClose: () => void;
    data?: tableQLTinTuc_Widget;
}
const DrawerDetail: React.FC<DrawerDetail> = ({
    isOpen,
    onSuccess,
    onClose,
    data,
}) => {
    return (
        <Drawer
            title="Cấu hình widgets"
            width={"90%"}
            open={isOpen}
            onClose={onClose}
        >
            <ResponsiveGridLayout
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={240}
                isDraggable={false}
                isResizable={false}
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px)",
                }}
            >
                {data?.content?.map((item, idx) => {
                    return (
                        <div
                            key={item.i}
                            className="border border-gray-400 p-3 bg-blue-700 text-white shadow-lg rounded-md flex flex-col items-center"
                            data-grid={item} // Load đúng vị trí
                        >
                            <p>{item.i}</p>
                        </div>
                    );
                })}
            </ResponsiveGridLayout>
        </Drawer>
    );
};

export default DrawerDetail;
