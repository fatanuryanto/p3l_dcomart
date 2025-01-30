import React from "react";
import WelcomeImage from "../assets/Welcome.png";
import Nasgor from "../assets/nasi-goreng.png";
import Minyak from "../assets/minyak.png";
import Minuman from "../assets/Minuman.png";
import Roti from "../assets/Roti.png";
import Listrik from "../assets/Peralatan Listrik.png";
import Perlengkapan from "../assets/PerlengkapanRT.png";
import Snack from "../assets/snack.png";
import Lainnya from "../assets/Lainnya.png";
import Buah from "../assets/Buah.png";
import Perawatan from "../assets/Perawatan.png";
import { Link } from "react-router-dom";

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
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Nasgor} alt="UMKM" className="w-16 h-16 mb-2" />
              Produk UMKM
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Minyak} alt="Minyak" className="w-16 h-16 mb-2" />
              Bahan Pokok & Dapur
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Minuman} alt="Minuman" className="w-16 h-16 mb-2" />
              Minuman & Es Krim
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Snack} alt="Snack" className="w-16 h-16 mb-2" />
              Camilan
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Roti} alt="Roti" className="w-16 h-16 mb-2" />
              Roti
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Buah} alt="Buah" className="w-16 h-16 mb-2" />
              Buah
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Perawatan} alt="Skincare" className="w-16 h-16 mb-2" />
              Perawatan
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Perlengkapan} alt="RT" className="w-16 h-16 mb-2" />
              Perlengkapan Rumah Tangga
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Listrik} alt="Listrik" className="w-16 h-16 mb-2" />
              Peralatan Listrik
            </button>
            <button className="btn btn-outline btn-sm flex flex-col items-center justify-center h-32 overflow-hidden border border-gray-300 rounded-lg font-bold text-blue-950">
              <img src={Lainnya} alt="Others" className="w-16 h-16 mb-2" />
              Lainnya
            </button>
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
