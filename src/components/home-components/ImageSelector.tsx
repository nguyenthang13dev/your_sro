import {
  Card,
  Col,
  ConfigProvider,
  Row,
  Badge,
  Divider,
  theme,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
const { Title, Text } = Typography;

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState("/img/imgSelector/a.png");
  const [selectedLabel, setSelectedLabel] = useState("LUẬT CHƠI");

  const images = [
    "/img/imgSelector/a.png",
    "/img/imgSelector/b.png",
    "/img/imgSelector/c.png",
  ];
  const labels = ["LUẬT CHƠI", "LỰA JOB", "LỊCH TRÌNH UPDATE"];

  const handleGetSelectedImg = (image: string, label: string) => {
    setSelectedImage(image);
    setSelectedLabel(label);
  };

  // Auto switch image every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = images.indexOf(selectedImage);
      const nextIndex = (currentIndex + 1) % images.length;
      handleGetSelectedImg(images[nextIndex], labels[nextIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedImage]);

  return (
    <Row gutter={24} style={{ marginTop: "60px", marginBottom: "40px" }}>
      <Col span={24}>
        <Row className="items-start p-4" style={{ display: "flex" }}>
          <Col
            className="w-2/3 h-64 relative mr-4 bg-center bg-contain bg-no-repeat transform scale-[1.5] transition-all duration-300"
            style={{ backgroundImage: `url(${selectedImage})` }}
          ></Col>
          <Col>
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
                    onClick={() => handleGetSelectedImg(image, labels[index])}
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
                    onClick={() => handleGetSelectedImg(image, labels[index])}
                  >
                    {labels[index]}
                  </span>
                </div>
              );
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default ImageSelector;
