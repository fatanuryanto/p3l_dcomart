import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import ProductItem from "../pages/productItem"; // Perbaiki path di sini
=======

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
>>>>>>> b63e2aa71ea35d3b7d24f69e9aa2ffbc55e2c5a8


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
