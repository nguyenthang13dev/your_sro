import React from "react";
import { Drawer } from "antd";
import { tableQLPage_ApiDataType } from "@/interface/QLPage_Api/QLPage_Api";

interface QLPage_ApiViewProps {
    qLPage_Api?: tableQLPage_ApiDataType | null;
    isOpen: boolean;
    onClose: () => void;
}

const QLPage_ApiDetail: React.FC<QLPage_ApiViewProps> = ({
    qLPage_Api,
    isOpen,
    onClose,
}) => {
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
                <h6 className="text-muted text-uppercase mb-3">
                    Thông tin chung
                </h6>

                <p>
                    <span className="ml-3 text-dark">{qLPage_Api?.id}</span>
                </p>
                <p>
                    <span className="ml-3 text-dark">{qLPage_Api?.api}</span>
                </p>
                <p>
                    <span className="ml-3 text-dark">{qLPage_Api?.method}</span>
                </p>
                <p>
                    <span className="ml-3 text-dark">
                        {qLPage_Api?.isKhaiThac}
                    </span>
                </p>
                <p>
                    <span className="ml-3 text-dark">
                        {qLPage_Api?.isTable}
                    </span>
                </p>
            </div>
        </Drawer>
    );
};

export default QLPage_ApiDetail;
