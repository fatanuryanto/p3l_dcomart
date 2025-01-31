import React from 'react';

const ProductItem = ({ id, name, price, desc, onToggle, isInCart }) => {
  const buttonText = isInCart ? "- Hapus dari keranjang" : "+ Tambah ke keranjang";

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{desc}</p>
        <p>Rp {price}</p>
      </div>
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt={name}
        />
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
