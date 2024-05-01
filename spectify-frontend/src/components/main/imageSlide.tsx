import React, { useState } from "react";

export default function ImageSlideComponent() {
    const images = [
        {
            src: "https://www.commartthailand.com/wp-content/uploads/2023/09/KV_CommartAwards2023-01.png",
            alt: "image1"
        },
        {
            src: "https://notebookspec.com/web/wp-content/uploads/2022/07/NBS-220707_FB-Share-Link_Commart-2022.jpg",
            alt: "image2"
        },
        {
            src: "https://www.commartthailand.com/wp-content/uploads/2024/02/CommartX2.png",
            alt: "image3"
        }

    ];

    const [currentImage, setCurrentImage] = useState(0);

    return (
        <>
            <div className="relative mx-16">
                <img src={images[currentImage].src} alt={images[currentImage].alt} className="w-full h-96 object-cover rounded-2xl"/>
                <div className="absolute top-1/2 left-0 right-0 flex justify-between">
                    <button onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)} className="bg-black bg-opacity-50 text-white p-2 rounded-full">
                        {"<"}
                    </button>
                    <button onClick={() => setCurrentImage((currentImage + 1) % images.length)} className="bg-black bg-opacity-50 text-white p-2 rounded-full">
                        {">"}
                    </button>
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                    {images.map((image, index) => (
                        <button key={index} onClick={() => setCurrentImage(index)} className={`w-5 h-5 rounded-full mx-1 ${currentImage === index ? "bg-[#545454]" : "bg-[#9B9B9B]"}`}></button>
                    ))}
                </div>
            </div>
        </>
    );
}