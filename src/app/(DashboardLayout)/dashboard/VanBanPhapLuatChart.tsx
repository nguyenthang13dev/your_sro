"use client";

import React, { useEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { SastifyLawDto } from "@/interface/vanBanPhapLuat/vanBanPhapLuat";
import { toast } from "react-toastify";
import { vanBanPhapLuatService } from "@/services/vanBanPhapLuat/vanBanPhapLuat.service";

const VanBanPhapLuatChart = () => {
  const [chartVanBan, setChartVanBan] = useState<SastifyLawDto[]>([]);
  const chartRepVanBan = useRef<HTMLDivElement | null>(null);

  const handelGetCharVanBan = async () => {
    try {
      const res = await vanBanPhapLuatService.ThongKeDuLieu();
      if (res.status) {
        setChartVanBan(res.data.data);
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra: " + err);
    }
  };

  useEffect(() => {
    handelGetCharVanBan();
  }, []);

  useEffect(() => {
    if (!chartRepVanBan.current) return;

    const root = am5.Root.new(chartRepVanBan.current);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "category",
        valueField: "value",
      })
    );

    const customColors = [
      am5.color(0x347928),
      am5.color(0xc0eba6),
      am5.color(0xfffbe6),
      am5.color(0xfccd2a),
      am5.color(0x6a9ab0),
      am5.color(0xee66a6),
    ];

    series.get("colors")?.set("colors", customColors);

    if (chartVanBan.length > 0) {
      const formattedData = chartVanBan.map((item) => ({
        category: item.label,
        value: item.value,
      }));

      series.data.setAll(formattedData);
    }

    root._logo?.dispose();

    return () => {
      root.dispose();
    };
  }, [chartVanBan]);

  return (
    <div ref={chartRepVanBan} style={{ width: "100%", height: "400px" }}></div>
  );
};

export default VanBanPhapLuatChart;
