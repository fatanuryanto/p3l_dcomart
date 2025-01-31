import React, { useState, useEffect } from "react";

const CategoryButton = ({ id, name }) => {
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/category/image/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [id]);
  return (
    <button
      key={id}
      className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950"
    >
      <figure className="w-16 h-16 mb-2">
        {imageSrc ? <img src={imageSrc} alt={name} /> : <p>Loading image...</p>}
      </figure>
      {name}
    </button>
  );
};

export default CategoryButton;
