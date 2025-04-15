
import React from "react";
import { Drawer } from "antd";
import { tableQLPage_ComponentDataType } from "@/interface/QLPage_Component/QLPage_Component";

interface QLPage_ComponentViewProps {
  qLPage_Component?: tableQLPage_ComponentDataType | null;
  isOpen: boolean;
  onClose: () => void;
}

const QLPage_ComponentDetail: React.FC<QLPage_ComponentViewProps> = ({ qLPage_Component, isOpen, onClose }) => {
  return (
    <Drawer
      title="Thông tin chi tiết"
      width="20%"
      placement="right"
      onClose={onClose}
      closable={true}
      open={isOpen}
    >
      <div>
        <h6 className="text-muted text-uppercase mb-3">Thông tin chung</h6>
        
              <p>
                <span className="ml-3 text-dark">{qLPage_Component?.id}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{qLPage_Component?.code}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{qLPage_Component?.type}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{qLPage_Component?.api}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{qLPage_Component?.elements}</span>
              </p>
      </div>
    </Drawer>
  );
};

export default QLPage_ComponentDetail;

