
import React from "react";
import { Drawer } from "antd";
import { tableQLTinTuc_CommentDataType } from "@/interface/QLTinTuc_Comment/QLTinTuc_Comment";

interface QLTinTuc_CommentViewProps {
  qLTinTuc_Comment?: tableQLTinTuc_CommentDataType | null;
  isOpen: boolean;
  onClose: () => void;
}

const QLTinTuc_CommentDetail: React.FC<QLTinTuc_CommentViewProps> = ({ qLTinTuc_Comment, isOpen, onClose }) => {
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
                <span className="ml-3 text-dark">{qLTinTuc_Comment?.id}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{qLTinTuc_Comment?.id_TinTuc}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{qLTinTuc_Comment?.comment}</span>
              </p>
              <p>
                <span className="ml-3 text-dark">{qLTinTuc_Comment?.isHidden}</span>
              </p>
      </div>
    </Drawer>
  );
};

export default QLTinTuc_CommentDetail;

