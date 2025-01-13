import React, { useState } from 'react';
import Dimsum from "../assets/Dimsum.jpg";
import Gethuk from "../assets/Gethuk.jpg";

const ProductItem = ({ name, price, image, quantity, onIncrease, onDecrease, selected, onSelect }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
      <input
        type="checkbox"
        checked={selected}
        onChange={onSelect}
        className="checkbox"
      />
      <div className="flex items-center space-x-4">
        <img src={image} alt={name} className="w-16 h-16 rounded-md object-cover" />
        <div>
          <h3 className="font-bold text-blue-950">{name}</h3>
          <p className="font-semibold text-sm text-green-400">Rp {price.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onDecrease} className="btn btn-outline btn-sm">
          -
        </button>
        <span>{quantity}</span>
        <button onClick={onIncrease} className="btn btn-outline btn-sm">
          +
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Dimsum Ayam', price: 18000, image: Dimsum, quantity: 2, selected: true },
    { id: 2, name: 'Getuk Lindri Manis', price: 15000, image: Gethuk, quantity: 1, selected: false },
  ]);

  const handleQuantityChange = (id, delta) => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, quantity: Math.max(1, product.quantity + delta) }
        : product
    ));
  };

  const handleSelect = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, selected: !product.selected } : product
    ));
  };

  const totalPrice = products
    .filter(product => product.selected)
    .reduce((sum, product) => sum + product.price * product.quantity, 0);

  const totalItems = products.filter(product => product.selected).length;

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="space-y-4">
        {products.map(product => (
          <ProductItem
            key={product.id}
            {...product}
            onIncrease={() => handleQuantityChange(product.id, 1)}
            onDecrease={() => handleQuantityChange(product.id, -1)}
            onSelect={() => handleSelect(product.id)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={products.every(product => product.selected)}
              onChange={() => setProducts(products.map(product => ({ ...product, selected: !products.every(p => p.selected) })))}
            />
            <span>Pilih Semua</span>
          </label>
          <div>
            <p>Total Produk: {totalItems}</p>
            <p>Total Bayar: Rp {totalPrice.toLocaleString()}</p>
          </div>
          <button className="btn btn-primary">Beli</button>
        </div>
      </div>
    </div>
  );
};

export default App;
