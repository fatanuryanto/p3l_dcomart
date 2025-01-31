import React, { useState, useEffect } from "react";
import WelcomeImage from "../assets/Welcome.png";
import { Link } from "react-router-dom";
import CategoryButton from "../components/CategoryButton";
import LiveChat from "../components/LiveChat";

const products = [
  {
    id: 1,
    name: "Nasi Uduk Bowl",
    description: "Bakul Mak Entiek",
    price: 17000,
    sold: 10,
    image: require("../assets/umkm_nasduk.jpeg"),
  },
  {
    id: 2,
    name: "Nasi Goreng Spesial",
    description: "Warung Bu Nenik",
    price: 20000,
    sold: 20,
    image: require("../assets/umkm_nasgor.jpeg"),
  },
  {
    id: 3,
    name: "Nasi Kuning Lengkap",
    description: "Sutil Sederhana",
    price: 21000,
    sold: 10,
    image: require("../assets/umkm_naskun.jpeg"),
  },
  {
    id: 4,
    name: "Nasi Goreng Sosis",
    description: "Dapur Bapak",
    price: 20000,
    sold: 11,
    image: require("../assets/umkm_nasgor-sosis.jpeg"),
  },
];

const Homepage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BACKEND_API}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-md">
        {/* Banner */}
        <div className="p-4 text-center">
          <div className="bg-green-100 rounded-lg p-4">
            <img src={WelcomeImage} alt="User" className="max-w-full h-auto" />
          </div>
        </div>

        {/* Order */}
        <Link to="/cart">
          <button className="w-full sm:w-104 text-center py-2 px-6 bg-white text-blue-950 font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <div className="flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png"
                alt="dollars"
                className="w-8 h-8 mr-2"
              />
            </div>

            <p>Order Now</p>
          </button>
        </Link>

        {/* Points and Vouchers */}
        {/* <div className="flex flex-wrap justify-between p-4 bg-gray-100">
          <button className="w-full sm:w-96 text-center py-2 px-6 bg-white text-blue-950 font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <div className="flex items-center justify-center">
              <img src={Dollars} alt="dollars" className="w-8 h-8 mr-2" />
            </div>
            <p>Poin Anda</p>
            <p className="text-lg font-bold">10</p>
          </button>

          <button className="w-full sm:w-96 text-center py-2 px-6 bg-white text-blue-950 font-bold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-4 sm:mt-0">
            <div className="flex items-center justify-center">
              <img src={Voucher} alt="dollars" className="w-8 h-8 mr-2" />
            </div>
            <p>Voucher</p>
            <p className="text-lg font-bold">10</p>
          </button>
        </div> */}

        {/* Categories */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4 text-blue-950">
            Hari ini mau belanja apa?
          </h3>
          <div className="bg-white rounded-lg shadow-md p-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.length > 0 ? (
              categories.map((category) => (
                <CategoryButton id={category.ID} name={category.Name} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No categories available
              </p>
            )}
          </div>
          <div>
            <LiveChat />
          </div>

          <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Produk UMKM</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-base font-semibold text-center">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-green-600 font-bold">
                      Rp {product.price.toLocaleString()}
                    </p>
                    <span className="text-sm text-gray-400">
                      {product.sold} terjual
                    </span>
                  </div>
                  <button className="mt-4 bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
