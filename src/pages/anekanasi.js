import React from "react";

const AnekaNasi = () => {
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

  return (
    <section className="bg-[#e4f4fd] min-h-[86vh] w-full p-6">
      {/* Header Section */}
      <div className="flex items-center mb-6">
        <button className="bg-white border border-gray-400 rounded-full h-10 w-10 flex items-center justify-center shadow-md mr-3">
          <img src={require("../assets/Buah.png")} alt="Back" className="h-5 w-5" />
        </button>
        <div className="bg-white border border-gray-400 rounded-full h-16 w-[250px] flex items-center justify-center shadow-md gap-2 px-4">
          <img src={require("../assets/nasi-goreng.png")} alt="Category" className="h-12 w-12" />
          <span className="text-[#083c5a] font-bold text-sm">Semua Produk UMKM</span>
        </div>
      </div>
  
      {/* Category Section */}
      <div className="mb-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          <button className="bg-[#fcc72c] text-[#083c5a] font-bold py-2 px-4 rounded-full border border-gray-400">
            Aneka Nasi
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => (window.location.href = "dimsum.js")}
              className="bg-white text-[#083c5a] font-bold py-2 px-4 rounded-full border border-gray-400"
            >
              Dimsum
            </button>
            <button className="bg-white text-[#083c5a] font-bold py-2 px-4 rounded-full border border-gray-400">
              Kue Tradisional
            </button>
            <button className="bg-white text-[#083c5a] font-bold py-2 px-4 rounded-full border border-gray-400">
              Jajanan Manis
            </button>
          </div>
        </div>
      </div>
  
      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-400 rounded-lg shadow-md overflow-hidden text-center flex flex-col justify-between h-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[174px] object-cover rounded-t-lg"
            />
            <div className="flex-grow p-4">
              <h3 className="text-[#083c5a] font-semibold text-base text-left">
                {product.name}
              </h3>
              <p className="text-[#083c5a] text-sm mt-1 text-left">{product.description}</p>
            </div>
            <div className="px-4 pb-4">
              <div className="flex justify-between items-center mt-3">
                <p className="text-[#4cb648] font-bold text-lg">Rp {product.price.toLocaleString()}</p>
                <span className="text-[#083c5a] text-sm">{product.sold} terjual</span>
              </div>
              <button className="bg-[#fcc72c] text-[#083c5a] font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md mt-4">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}  

export default AnekaNasi;

