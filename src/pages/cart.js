import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "../pages/productItem"; // Perbaiki path di sini

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BACKEND_API}/item`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error fetching data with token:", error)
      );
  }, []);

  const handleToggle = (id) => {
    const updatedOrders = [...orders];
    const orderIndex = updatedOrders.findIndex((order) => order.id === id);

    if (orderIndex === -1) {
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
                imageID={product.ID}
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
