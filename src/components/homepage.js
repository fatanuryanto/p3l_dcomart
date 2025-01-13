import React from "react";
import WelcomeImage from "../assets/Welcome.png";
import Dollars from "../assets/Dollars.png";
import Voucher from "../assets/Voucher.png";

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

        {/* Points and Vouchers */}
        <div className="flex flex-wrap justify-between p-4 bg-gray-100">
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
        </div>

        {/* Categories */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">Hari ini mau belanja apa?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <button className="btn btn-outline btn-sm">Produk UMKM</button>
            <button className="btn btn-outline btn-sm">
              Bahan Pokok & Dapur
            </button>
            <button className="btn btn-outline btn-sm">
              Minuman & Es Krim
            </button>
            <button className="btn btn-outline btn-sm">Camilan</button>
            <button className="btn btn-outline btn-sm">Roti</button>
            <button className="btn btn-outline btn-sm">Buah</button>
            <button className="btn btn-outline btn-sm">Perawatan</button>
            <button className="btn btn-outline btn-sm">
              Perlengkapan Rumah Tangga
            </button>
            <button className="btn btn-outline btn-sm">
              Peralatan Listrik
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
