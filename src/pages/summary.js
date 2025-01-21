import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storage = window.localStorage;
    const orders = JSON.parse(storage.getItem("orders")) || [];
    return orders;
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  
  const handlePlaceOrder = () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const order_detail = cartItems.map((item) => ({
      item_id: item.id,
      quantity: item.quantity,
    }));
      const order ={
      method: "COD",
      status: "pending",
      order_detail: order_detail
    }
    fetch(`${process.env.REACT_APP_BACKEND_API}/order/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Add Bearer token to Authorization header
      },
      body: JSON.stringify( order), // Include cartItems in the request body
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowPopup(true); // Show a popup indicating order placement
        setTimeout(() => {
          localStorage.removeItem("orders");
          navigate("/order-review", {
            state: { cartItems, total: calculateTotal() },
          }); // Redirect to the order review page after 5 seconds
        }, 5000);
      })
      .catch((error) => {
        console.log("Error placing order:", error); // Handle errors if the request fails
      });
  };
  

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleUpdateQuantity = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    const storage = window.localStorage;
    storage.setItem("orders", JSON.stringify(updatedCartItems));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 p-6 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-extrabold text-green-900 mb-6 tracking-wide drop-shadow-lg">
        Order Summary
      </h1>

      <div className="bg-white shadow-2xl rounded-xl w-full max-w-4xl p-6 transition-all duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-semibold text-yellow-700 mb-4 border-b pb-2">
          Your Cart
        </h2>
        <table className="w-full text-gray-700">
          <thead>
            <tr className="border-b text-green-900">
              <th className="text-left py-2 uppercase">Name</th>
              <th className="text-center uppercase">Price</th>
              <th className="text-center uppercase">Quantity</th>
              <th className="text-center uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-green-50 transition-all"
              >
                <td className="py-3 text-left font-medium">{item.name}</td>
                <td className="text-center">
                  Rp {item.price.toLocaleString()}
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    className="input bg-white border border-gray-300 rounded-md p-1 w-16 text-center outline-none focus:ring-2 focus:ring-green-400"
                    required
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, Number(e.target.value))
                    }
                    min={1}
                  />
                </td>
                <td className="text-center font-semibold text-green-700">
                  Rp {(item.quantity * item.price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center font-bold text-green-800 mt-6 text-lg">
          <span>Total:</span>
          <span>Rp {calculateTotal().toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-6 mt-6 transition-all duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-semibold text-yellow-700 mb-4 border-b pb-2">
          Payment Method
        </h2>
        <p className="text-green-700 text-lg">Cash on Delivery (COD)</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg mt-6 w-full max-w-lg shadow-md transition-all duration-300 transform hover:scale-105"
      >
        Place Order
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-8 w-96 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Order Received
            </h2>
            <p className="text-green-700 mb-6 text-lg">
              Terimakasih sudah berbelanja,{" "}
              Dimohon untuk menunjukkan bukti pesanan ketika mengambil barang
              pesanan.
            </p>
            <button
              onClick={closePopup}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
