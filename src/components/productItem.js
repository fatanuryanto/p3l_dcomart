import React, { useState, useEffect } from "react";

const ProductItem = ({ id, name, price, desc, onToggle, isInCart }) => {
  const buttonText = isInCart ? "- Hapus dari keranjang" : "+ Tambah ke keranjang";
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/item/image/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className="card bg-white w-96 shadow-xl rounded-lg overflow-hidden border border-gray-200">
    <figure className="bg-gray-100 p-4">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
      ) : (
        <p className="text-gray-500">Loading image...</p>
      )}
    </figure>
    <div className="card-body p-5 space-y-3">
      <h2 className="card-title text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-600">{desc}</p>
      <p className="text-lg font-bold text-yellow-400">Rp {price.toLocaleString()}</p>
      <div className="card-actions justify-center mt-4">
        <button
          className="btn bg-yellow-400 w-full hover:scale-105 transition-transform text-gray-600"
          onClick={() => onToggle(id)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ProductItem;
