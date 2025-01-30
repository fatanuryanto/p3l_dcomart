import React, { useEffect, useState } from "react";

const InsertItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/category", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddCategory = async () => {
    if (
      newCategory.trim() &&
      !categories.some((cat) => cat.name === newCategory)
    ) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newCategory }),
        });

        if (response.ok) {
          const newCat = await response.json();
          setCategories([...categories, newCat]); // Add new category from response
          setNewCategory("");
        } else {
          alert("Gagal menambahkan kategori");
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !desc || !price) {
      alert("Please fill all fields and select an image!");
      return;
    }
    console.log(category);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("category_id", category);
    formData.append("photo", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/item", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-black mb-6">Insert Barang</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Deskripsi singkat barang"
              className="textarea textarea-bordered w-full"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Foto Barang
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select
              value={category}
              onChange={(e) => {
                const selectedCategoryId = e.target.value; // Ensure it's a number
                setCategory(selectedCategoryId);
              }}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Pilih kategori
              </option>
              {categories.map((cat) => (
                <option key={cat.ID} value={cat.ID}>
                  {cat.ID} - {cat.Name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tambah Kategori Baru
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Masukkan kategori baru"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-yellow-500 hover:bg-yellow-600 text-white btn btn-secondary"
              >
                Tambah
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Simpan Barang
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertItem;
