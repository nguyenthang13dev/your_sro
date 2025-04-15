"use client";

import { buocXuLyService } from "@/services/BuocXuLy/BuocXuLy.service";
import { Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  groupId: string ;
  visible: boolean;
  onClose: () => void;
}

const ModalLuong: React.FC<Props> = ({ groupId, visible, onClose }) => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramInstance = useRef<any>(null); // Lưu diagram để không gây re-render
  const [go, setGo] = useState<any>(null);
  const [diagramData, setDiagramData] = useState<any>(null);

  const handleGetDiagramData = async () => {
    if (!groupId) return;
    try {
      const res = await buocXuLyService.GetDiagramData(groupId);
      if (res.status) {
        setDiagramData(res.data);
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra: " + err);
    }
  };

  useEffect(() => {
    if (!visible) return;

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
  }, [visible]);

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

  return (
    <Modal
      open={visible}
      title={"Luồng quy trình"}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
      width="60%"
      afterClose={() => {
        if (diagramInstance.current) {
          diagramInstance.current.clear();
          diagramInstance.current.div = null;
          diagramInstance.current = null;
        }
      }}
    >
      <div ref={diagramRef} style={{ height: "500px" }} />
    </Modal>
  );
};

export default ModalLuong;
