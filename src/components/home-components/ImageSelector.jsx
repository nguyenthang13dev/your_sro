import { Col, Row } from "antd";
import { useState } from "react";

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState("/img/imgSelector/a.png");

  const images = [
    "/img/imgSelector/a.png",
    "/img/imgSelector/b.png",
    "/img/imgSelector/c.png",
  ];

  const labels = ["LUẬT CHƠI", "LỰA JOB", "LỊCH TRÌNH UPDATE"];

  return (
    // <div className="items-start p-4" style={{ display: "flex" }}>
    //   {/* Background Display Area */}
    //   <div
    //     className="w-2/3 h-64 relative mr-4 bg-center bg-contain bg-no-repeat transform scale-[1.5] transition-all duration-300"
    //     style={{
    //       backgroundImage: `url(${selectedImage})`,
    //     }}
    //   ></div>

    //   {/* Smaller Images and Labels */}
    //   <div>
    //     {images.map((image, index) => (
    //       <div key={index} style={{ display: "flex" }}>
    //         <div
    //           className="w-12 h-12 relative cursor-pointer"
    //           onClick={() => setSelectedImage(image)}
    //         >
    //           <img
    //             src={image}
    //             alt={`Job ${index + 1}`}
    //             className="rounded-full w-full h-full object-cover"
    //           />
    //         </div>
    //         <span
    //           className="text-white font-bold cursor-pointer"
    //           onClick={() => setSelectedImage(image)}
    //         >
    //           {labels[index]}
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <>
      <Row className="items-start p-4" style={{ display: "flex" }}>
        <Col
          className="w-2/3 h-64 relative mr-4 bg-center bg-contain bg-no-repeat transform scale-[1.5] transition-all duration-300"
          style={{ backgroundImage: `url(${selectedImage})` }}
        ></Col>
        <Col>
          {images.map((image, index) => (
            <div key={index} style={{ display: "flex" }}>
              <div
                className="w-12 h-12 relative cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Job ${index + 1}`}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <span
                className="text-white font-bold cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {labels[index]}
              </span>
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ImageSelector;
