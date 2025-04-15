import { tableQLPage_ComponentDataType } from "@/interface/QLPage_Component/QLPage_Component";
import { tableQLTinTuc_CauHinhDataType } from "@/interface/QLTinTuc_CauHinh/QLTinTuc_CauHinh";
import { replaceCssToPreview, replaceHtmlToPreview } from "@/utils/string";

interface Props {
  item: tableQLPage_ComponentDataType;
}

const RenderComponent: React.FC<Props> = (props: Props) => {
  function mapComponent(
    component: tableQLPage_ComponentDataType
  ): tableQLTinTuc_CauHinhDataType {
    return {
      id: component.id,
      type: component.type,
      html: component.html,
      css: component.css,
      isImage: false,
      isDateTime: false,
      isTitle: false,
      isDescription: false,
    };
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <style>
              ${replaceCssToPreview(mapComponent(props.item))}
          </style>
          ${replaceHtmlToPreview(mapComponent(props.item))}
      `,
      }}
    />
  );
};

export default RenderComponent;
