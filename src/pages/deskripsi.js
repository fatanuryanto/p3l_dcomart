import React from "react";

const Deskripsi = () => {
  return (
    <section className="bg-blue-100 h-[86vh] w-full font-poppins">
      <div className="flex items-center p-4 mb-4">
        <button className="bg-white border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center shadow-md cursor-pointer mr-2">
          <img src="assets/Back.png" alt="Back" className="h-5 w-5" />
        </button>
        <div className="bg-white border border-gray-300 rounded-lg h-15 w-64 flex items-center justify-center shadow-md cursor-pointer">
          <img src="../assets/nasi-goreng.png" alt="Category" className="h-12 w-12 mr-2" />
          <span className="text-sm font-bold text-blue-900">Semua Produk UMKM</span>
        </div>
      </div>

      <div className="flex items-start mt-4">
        <div className="rounded-lg border border-gray-300 shadow-md">
          <img
            src="assets/umkm_nasi goreng.png"
            alt="Gambar Produk"
            className="h-88 w-138 rounded-lg border-2 border-gray-300 shadow-sm"
          />
        </div>

        <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-[600px] p-5 flex flex-col mt-[-156px] ml-[-70px]">
          <div className="flex gap-4 items-center">
            <p className="text-blue-900 text-lg font-bold">Stok</p>
            <span className="text-blue-900 text-lg">30</span>
          </div>
          <p className="text-blue-900 text-lg font-bold mt-4">Deskripsi</p>
          <p className="text-blue-900 text-lg">
            Getuk lindri memiliki rasa manis lembut dengan aroma khas singkong
            dan sedikit gurih dari taburan kelapa parut.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-start mt-[150px] ml-[-400px]">
          <div className="bg-yellow-500 border border-gray-300 rounded-lg h-12 w-30 flex items-center justify-center shadow-md cursor-pointer">
            <img src="assets/Plus Math.png" alt="Tambah" className="h-6 w-6" />
            <span className="text-blue-900 text-sm font-bold ml-2">0</span>
            <img src="assets/Minus.png" alt="Kurang" className="h-6 w-6 ml-2" />
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start mt-[300px] ml-[-190px]">
          <div className="bg-yellow-500 border border-gray-300 rounded-lg h-12 w-64 flex items-center justify-center shadow-md cursor-pointer">
            <span className="text-blue-900 text-sm font-bold">Tambah ke Keranjang</span>
          </div>
        </div>
      </div>

      <div className="mt-4 ml-24">
        <div className="flex justify-between items-center max-w-[568px]">
          <p className="text-blue-900 text-4xl font-bold">Getuk Lindri Manis</p>
          <span className="text-blue-900 text-sm">10 terjual</span>
        </div>
        <p className="text-blue-900 text-sm mt-2">Ayu's Kitchen</p>
        <p className="text-green-500 text-2xl font-bold mt-2">Rp 15.000</p>
      </div>
    </section>
  );
};

export default Deskripsi;
