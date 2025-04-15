"use client";

import { dsItemDataWidget } from "@/interface/QLTinTuc_Widget/QLTinTuc_Widget";
import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface NewsWidgetProps {
    data?: dsItemDataWidget;
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ data }) => {
    const dsLayout = data?.dsContent.map((x) => x.item);

    return (
        <ResponsiveGridLayout
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={25}
            isDraggable={false}
            isResizable={false}
            className="background-items"
        >
            {dsLayout?.map((item, idx) => {
                return (
                    <div
                        key={item.i}
                        data-grid={item}
                        className={`border border-gray-400 p-3 bg-blue-700 text-white  shadow-lg rounded-md backgroud-it `}
                    >
                        {/* <div>
                            <img
                                src={`${process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL}/${data?.dsContent[idx]?.infor.image}`}
                                alt={data?.dsContent[idx]?.infor.title}
                            />
                        </div>

                        <p>{data?.dsContent[idx]?.infor.title}</p> */}

                        <ResponsiveGridLayout
                            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                            rowHeight={35}
                            isDraggable={false}
                            isResizable={false}
                            className="background-items-v2"
                        ></ResponsiveGridLayout>
                    </div>
                );
            })}
        </ResponsiveGridLayout>
    );
};

export default NewsWidget;
