import React, { useState, useEffect } from "react";

const InsertItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryPhoto, setNewCategoryPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data == null) {
      alert("Data Kosong");
    } else {
      setCategories(data);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategoryPhoto) {
      alert("Please select a photo first!");
      return;
    }

    if (!newCategory.trim()) {
      alert("Category name cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory);
    formData.append("photo", newCategoryPhoto);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/category`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Response data:", data); // Debugging log

      if (!response.ok) {
        const errorMessage = data.message || data.error || "Terjadi kesalahan";
        alert(`Gagal menambahkan Category: ${errorMessage}`);
        return;
      }

      setCategories([...categories, data.name]);
      setNewCategory("");
      setNewCategoryPhoto(null);
      alert("Category Berhasil ditambah!");
      setCategories([...categories, { ID: data.ID, Name: data.Name }]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
      alert(`Gagal menambahkan kategori: ${error.message || error}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("desc", description);
    formData.append("photo", photo);
    formData.append("category_id", category);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/item`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Response Data:", data); // Debugging log

      if (!response.ok) {
        const errorMessage = data.message || data.error || "Terjadi kesalahan";
        alert(`Gagal menambahkan Barang: ${errorMessage}`);
        return;
      }

      alert("Barang berhasil ditambahkan!");
      setName("");
      setPrice("");
      setDescription("");
      setPhoto(null);
      setCategory("");
    } catch (error) {
      console.error("Error adding item:", error);
      alert(`Terjadi kesalahan: ${error.message || error}`);
    }
  };

  return (
    <>
      {/* Modal untuk Tambah Kategori Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Tambah Kategori Baru</h2>
              <button
                onClick={() => setIsModalOpen(false)} // Tutup modal
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Foto Kategori
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCategoryPhoto(e.target.files[0])}
                    className="file-input file-input-bordered w-full"
                    required
                  />
                </div>
                <label className="block text-sm font-medium mb-1">
                  Nama Kategori Baru
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Masukkan kategori baru"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Tutup modal
                  className="btn btn-secondary bg-red-600 hover:bg-red-700 text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary bg-yellow-500 hover:bg-gray-900 text-white"
                >
                  Tambahkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-black mb-6">Insert Barang</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama Barang */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Barang
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama barang"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-medium mb-1">Harga</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Masukkan harga barang"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Deskripsi
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi singkat barang"
                className="textarea textarea-bordered w-full"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Foto */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Foto Barang
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>

            {/* Bagian Kategori */}
            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.ID}>
                    {cat.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tombol Tambah Kategori Baru */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tambah Kategori Baru
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)} // Buka modal
                  className="bg-yellow-500 hover:bg-yellow-600 text-white btn btn-secondary"
                >
                  Tambah Kategori Baru
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Simpan Barang
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InsertItem;
