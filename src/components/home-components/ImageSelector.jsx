import { useState } from "react";

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState("/img/imgSelector/a.png");

  const images = [
    "/img/imgSelector/a.png",
    "/img/imgSelector/b.png",
    "/img/imgSelector/c.png",
  ];

  const labels = ["LỰA JOB", "LỊCH TRÌNH UPDATE", "THÔNG TIN MÁY CHỦ"];

  return (
    <div className="flex flex-row items-start p-4">
      {/* Background Display Area */}
      <div
        className="w-2/3 h-64 relative mr-4 bg-center bg-contain bg-no-repeat transform scale-[1.5] transition-all duration-300"
        style={{
          backgroundImage: `url(${selectedImage})`,
        }}
      ></div>

      {/* Smaller Images and Labels */}
      <div className="flex flex-col space-y-2">
        {images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2">
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
      </div>
    </div>
  );
};

export default ImageSelector;
