import { tableQLNewsData } from "@/interface/QLNews/QLNews";
import { Drawer } from "antd";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) // import ReactQuill

interface Props
{
        qlnews?: tableQLNewsData;
        isOpen: boolean;
        onClose: () => void; //function callback
}

const QLNewDetail = (props: Props) =>
{
    return (
        <Drawer title="Chi tiết tin bài"
      open={props.isOpen}
     onClose={() =>
            {
                props.onClose();
      }}
      width={600}>
            <h2>{props.qlnews?.title}</h2>
            <p><strong>Ngày đăng:</strong> {props.qlnews?.publishDate}</p>            
                <ReactQuill value={props.qlnews?.content} readOnly={true} />        
        </Drawer>
    )
}

export default QLNewDetail;