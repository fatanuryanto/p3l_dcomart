import React, { useEffect, useState } from "react";
import ProductItem from "../components/productItem";

const App = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BACKEND_API}/item`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setProducts(data);
      })
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

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.Category.Name)),
  ];

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.Category.Name === activeCategory);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Tabs for Category Filtering */}
        <div className="tabs tabs-boxed bg-white p-2 rounded-lg shadow-lg flex justify-center">
          {categories.map((category) => (
            <a
              key={category}
              className={`tab ${
                activeCategory === category ? "tab-active bg-yellow-400 text-black" : ""
              } transition-all cursor-pointer`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </a>
          ))}
        </div>

        {/* Product List */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg text-gray-500">No products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => {
              const isInCart = orders.some((order) => order.id === product.ID);
              return (
                <div
                  className="flex items-center space-x-4 p-4 bg-base-100 shadow-lg rounded-lg border border-gray-300"
                  key={product.ID}
                >
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
        )}
      </div>

      {/* Floating Checkout Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md">
        <button
          className="btn bg-yellow-400 w-full shadow-xl"
          onClick={() => window.location.href = "/summary"}
        >
          Beli
        </button>
      </div>
    </div>
  );
};

export default App;
