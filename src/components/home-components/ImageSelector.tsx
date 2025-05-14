import { useSelector } from "@/store/hooks";
import { setCurrent } from "@/store/QLNewsCurrent/QLNewsCurrentSlice";
import
  {
    Col,
    Row,
    Typography
  } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const { Title, Text } = Typography;

const ImageSelector = () =>
{
  
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState("/img/imgSelector/a.png");
  const [selectedLabel, setSelectedLabel] = useState("LUẬT CHƠI");

  const newsGroupData = useSelector( state => state.qlnewsGroup.newsGroups );
  const currentNews = useSelector( state => state.currentNews.news );

  const images = [
    "/img/imgSelector/a.png",
    "/img/imgSelector/b.png",
    "/img/imgSelector/c.png",
  ];
  const labels = [ {
      label: "LUẬT CHƠI",
      value: "lawplay"
  }, {
      label: "LỰA JOB",
      value: "jobselect"
    }, {
      label: "LỊCH TRÌNH UPDATE",
      value: "updateroad"
  }];
  const handleGetSelectedImg = (image: string, label: string, value: string) => {
    setSelectedImage(image);
    setSelectedLabel( label );
    const data = newsGroupData.find( g => g.groupName == value)?.items[0] ?? null;
    if ( data != null )
    {
      dispatch( setCurrent(data));
    }
  };

  // Auto switch image every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = images.indexOf(selectedImage);
      const nextIndex = (currentIndex + 1) % images.length;
      handleGetSelectedImg(images[nextIndex], labels[nextIndex]?.label, labels[nextIndex]?.value);
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedImage]);

  return (
    <Row gutter={10}>
        <Col
          span={18}
              className="h-64 relative bg-center bg-contain bg-no-repeat transform  transition-all duration-300"
              style={{ backgroundImage: `url(${selectedImage})` }}
          ></Col>
          <Col span={6}>
            {images.map((image, index) => {
              const isSelected = image === selectedImage;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginTop: index !== 0 ? "40px" : "0px",
                  }}
                >
                  <div
                    className={`w-12 h-12 relative cursor-pointer rounded-full `}
                    onClick={() => handleGetSelectedImg(image, labels[index].label, labels[index].value)}
                    style={{
                      border: isSelected ? "2px solid #fbbf24" : undefined,
                      borderRadius: "9999px",
                      padding: "2px",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Job ${index + 1}`}
                      className={`rounded-full w-full h-full object-cover scale-[1.5] ${
                        isSelected ? "border-[2px] border-yellow-400" : ""
                      }`}
                    />
                  </div>
                  <span
                    className="text-white font-bold cursor-pointer"
                    onClick={() => handleGetSelectedImg(image, labels[index].label, labels[index].value)}
                  >
                    {labels[index].label}
                  </span>
                </div>
              );
            })}
          </Col>
    </Row>
  );
};
export default ImageSelector;
