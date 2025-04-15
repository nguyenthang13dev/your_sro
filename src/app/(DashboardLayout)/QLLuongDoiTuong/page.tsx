"use client";

import { buocXuLyService } from "@/services/BuocXuLy/BuocXuLy.service";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const QLLuongDoiTuong = () => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramInstance = useRef<any>(null); // Lưu diagram để không gây re-render
  const [go, setGo] = useState<any>(null);
  const [diagramData, setDiagramData] = useState<any>(null);
  const { id } = useParams();
  const idLuong = id?.toString() ?? null;

  const handleGetDiagramData = async () => {
    try {
      const res = await buocXuLyService.GetDiagramData(idLuong);
      if (res.status) {
        setDiagramData(res.data);
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra: " + err);
    }
  };

  useEffect(() => {
    handleGetDiagramData();

    if (!(window as any).go) {
      const script = document.createElement("script");
      script.src = "/goJs/go.js";
      script.async = true;
      script.onload = () => {
        setGo((window as any).go);
      };
      document.body.appendChild(script);
    } else {
      setGo((window as any).go);
    }
  }, []);

  useEffect(() => {
    if (!go || !diagramRef.current) return;

    if (!diagramInstance.current) {
      const graphJS = go.GraphObject.make;
      const diagram = graphJS(go.Diagram, diagramRef.current, {
        initialContentAlignment: go.Spot.Top,
        allowInsert: false,
        allowDelete: false,
        allowLink: true,
        allowTextEdit: false,
      });

      diagram.nodeTemplate = graphJS(
        go.Node,
        "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        graphJS(go.Shape, "RoundedRectangle", {
          parameter1: 20,
          fill: graphJS(go.Brush, "Linear", {
            0: "rgb(19, 194, 194)",
          }),
          stroke: null,
          portId: "",
          fromLinkable: false,
          toLinkable: false,
          cursor: "pointer",
        }),
        graphJS(
          go.TextBlock,
          {
            font: "bold 11pt helvetica, bold arial, sans-serif",
            editable: true,
            stroke: "white",
          },
          new go.Binding("text").makeTwoWay()
        )
      );

      diagram.linkTemplate = graphJS(
        go.Link,
        {
          curve: go.Link.Bezier,
          adjusting: go.Link.Stretch,
          toShortLength: 3,
          reshapable: true,
          resegmentable: true,
        },
        new go.Binding("points").makeTwoWay(),
        new go.Binding("curviness"),
        graphJS(go.Shape, { strokeWidth: 1.5 }),
        graphJS(go.Shape, { toArrow: "standard", stroke: null }),
        graphJS(
          go.Panel,
          "Auto",
          graphJS(go.Shape, {
            fill: graphJS(go.Brush, "Radial", {
              0: "rgb(240, 240, 240)",
              1: "rgba(240, 240, 240, 0)",
            }),
            stroke: null,
          }),
          graphJS(
            go.TextBlock,
            "transition",
            {
              textAlign: "center",
              font: "9pt helvetica, arial, sans-serif",
              margin: 4,
              editable: true,
            },
            new go.Binding("text").makeTwoWay()
          )
        )
      );

      diagramInstance.current = diagram;
    }

    if (
      diagramData &&
      JSON.stringify(diagramInstance.current.model.toJson()) !==
        JSON.stringify(diagramData)
    ) {
      diagramInstance.current.model = go.Model.fromJson(diagramData);
    }
  }, [go, diagramData]);

  const handleGetLocation = async () => {
    try {
      const data = diagramInstance.current.model.toJson();
      const goModel = JSON.parse(data);

      const res = await buocXuLyService.SaveStateLocation(goModel);
      if (res.status) {
        toast.success("Lưu vị trí thành công");
      } else {
        toast.error("Có lỗi xảy ra: " + res.errors);
      }
    } catch (ex) {
      toast.error("Có lỗi xảy ra: " + ex);
    }
  };

  return (
    <>
      <div
        ref={diagramRef}
        style={{ width: "100%", height: "500px", border: "1px solid black" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={handleGetLocation}
          size="small"
          icon={<SaveOutlined />}
          color="danger"
          variant="solid"
        >
          Lưu vị trí
        </Button>
      </div>
    </>
  );
};

export default QLLuongDoiTuong;
