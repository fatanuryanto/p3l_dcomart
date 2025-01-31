import React, { useState, useEffect } from "react";

const ProductItem = ({ id, name, price, desc, imageID, onToggle, isInCart }) => {
  const buttonText = isInCart ? "- Hapus dari keranjang" : "+ Tambah ke keranjang";
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/item/image/${imageID}`, {
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
  }, [imageID]);

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{desc}</p>
        <p>Rp {price}</p>
      </div>
      <figure>
        {imageSrc ? <img src={imageSrc} alt={name} /> : <p>Loading image...</p>}
      </figure>
      <div className="card-actions justify-center">
        <div className="btn-group">
          <button className="btn" onClick={() => onToggle(id)}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
