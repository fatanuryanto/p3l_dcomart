import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Fetch data with Authorization header if token exists
    fetch(`${process.env.REACT_APP_BACKEND_API}/item`, {
      headers: {
        Authorization: `Bearer ${token}`, // Always include "Bearer " with the token
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error fetching data with token:", error)
      );
  }, []);

  // Handle toggle (Add or remove item from localStorage and state)
  const handleToggle = (id) => {
    const updatedOrders = [...orders];
    const orderIndex = updatedOrders.findIndex((order) => order.id === id);

    if (orderIndex === -1) {
      // Item is not in cart, so add it
      const product = products.find((product) => product.ID === id);
      updatedOrders.push({
        id,
        name: product.Name,
        price: product.Price,
        desc: product.Desc,
        category_id: product.CategoryID,
        quantity: 1,
      });
    } else {
      // Item is in cart, so remove it
      updatedOrders.splice(orderIndex, 1);
    }
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="space-y-4">
        {products.map((product) => {
          const isInCart = orders.some((order) => order.id === product.ID);
          return (
            <div className="flex items-center space-x-2" key={product.ID}>
              <ProductItem
                id={product.ID}
                name={product.Name}
                price={product.Price}
                desc={product.Desc}
                onToggle={handleToggle}
                isInCart={isInCart}
              />
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/summary")}
        >
          Beli
        </button>
      </div>
    </div>
  );
};

export default App;
