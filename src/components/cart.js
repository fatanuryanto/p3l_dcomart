import React, {  useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, price, desc, handleAddToCart }) => {
  const [buttonText, setButtonText] = useState('+ Tambah ke Keranjang');

  const handleButtonClick = () => {
    const storage = window.localStorage;
    const orders = JSON.parse(storage.getItem('orders')) || [];
    if (buttonText === '+ Tambah ke Keranjang') {
      storage.setItem('orders', JSON.stringify([...orders, { id, name, price, desc }]));
      setButtonText('- Hapus dari Keranjang');
    } else {
      const updatedOrders = orders.filter(order => order.id !== id);
      storage.setItem('orders', JSON.stringify(updatedOrders));
      setButtonText('+ Tambah ke Keranjang');
    }
  };

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
          {/* Call handleButtonClick function directly */}
          <button className="btn" onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/item')
      .then(response => response.json())
      .then(data =>
        setProducts(
          data.map(product => ({
            ...product,
            selected: false,
            quantity: 1,
          }))
        )
      )
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);
  

  const handleAddToCart = (product) => {
    setOrders([...orders, product]);
    const isOrderExist = orders.some(order => order.id === product.id);
    return (
      <button className="btn" onClick={() => handleAddToCart(product)}>
        {isOrderExist ? '- Hapus dari keranjang' : '+ Tambah Ke keranjang'}
      </button>
    );
  };

  const handleSelectAll = () => {
    const allSelected = products.every(product => product.selected);
    setProducts(products.map(product => ({
      ...product,
      selected: !allSelected,
    })));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="space-y-4">
        {products.map(product => (
          <ProductItem
            key={product.ID}
            id={product.ID}
            name={product.Name}
            price={product.Price}
            desc={product.Desc}
            product={product}  // Pass the entire product object
            handleAddToCart={handleAddToCart} // Pass the handleAddToCart function
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
              onChange={handleSelectAll}
            />
            <span>Pilih Semua</span>
          </label>
          <div>
            {/* Display total items or other stats here */}
          </div>
          <Link to="/order"><button className="btn btn-primary">Beli</button></Link>
        </div>
      </div>
    </div>
  );
};

export default App;
