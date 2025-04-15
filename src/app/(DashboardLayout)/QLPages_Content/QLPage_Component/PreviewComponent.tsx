import { qLPages_Content } from "@/services/QLPages_Content/QLPages_Content.service";
import { Card, Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  codeComponent: string;
}

const PreviewComponent: React.FC<Props> = (props: Props) => {
  const [componentHtml, setComponentHtml] = useState<string>();

  const getComponentHtml = async () => {
    try {
      const respone = await qLPages_Content.GetPreviewComponent(
        props.codeComponent
      );
      setComponentHtml(respone.data);
    } catch (err) {
      toast.error("Có lỗi xảy ra: " + err);
    }
  };

  useEffect(() => {
    if (props.codeComponent) {
      getComponentHtml();
    }
  }, [props.codeComponent]);

  return (
    <>
      <Modal
        title={`Hiển thị component (${props.codeComponent})`}
        open={props.isOpen}
        onOk={props.onClose}
        onCancel={props.onClose}
        width={"50%"}
      >
        {componentHtml ? (
          <Card>
            <div
              style={{ width: "100%" }}
              dangerouslySetInnerHTML={{
                __html: componentHtml.replace(
                  /<img /g,
                  '<img style="width:100%; height:auto;" '
                ),
              }}
            ></div>
          </Card>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default PreviewComponent;
