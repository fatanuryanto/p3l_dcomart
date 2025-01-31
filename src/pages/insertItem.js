import React, { useState,useEffect } from "react";

const InsertItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    setLoadingCategories(true);
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BACKEND_API}/category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        setLoadingCategories(false);
      });
  }, []);
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
      setPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }else{
      alert("Please upload a valid image (JPG, JPEG, PNG)");
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingCategories(true);
    if (!photo) {
      alert("Please select an image first!");
    }

    const newProduct = {
      name,
      price,
      description,
      photo,
      category,
    };
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("desc", description);
    formData.append("photo", photo);
    formData.append("category_id", category);

    console.log(formData);
    
    fetch(`${process.env.REACT_APP_BACKEND_API}/item`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Barang berhasil ditambahkan:", data);
        // Handle the response data as needed
      })
      .catch(error => {
        console.error("Error adding item:", error);
        // Handle the error as needed
      });

    console.log("Barang berhasil ditambahkan:", newProduct);
    localStorage.setItem("products", JSON.stringify(newProduct));

    // Reset form
    setName("");
    setPrice("");
    setDescription("");
    setPhoto(null);
    setCategory("");

    setLoadingCategories(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Teks Insert Barang lebih hitam */}
        <h1 className="text-2xl font-bold text-black mb-6">Insert Barang</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Barang */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama Barang</label>
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
            <label className="block text-sm font-medium mb-1">Deskripsi</label>
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
            <img src={previewUrl} alt="Uploaded Preview" width="300" />
            <label className="block text-sm font-medium mb-1">Foto Barang</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadPhoto(e)}
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>Pilih kategori</option>
              {categories.map((cat, index) => (
                <option className="text-white" key={index} value={cat.ID}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tambah Kategori Baru */}
          <div>
            <label className="block text-sm font-medium mb-1">Tambah Kategori Baru</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Masukkan kategori baru"
                className="input input-bordered w-full"
              />
              {/* Tombol Tambah menjadi kuning */}
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-yellow-500 hover:bg-yellow-600 text-white btn btn-secondary"
              >
                Tambah
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full bg-yellow-500 hover:bg-yellow-600 text-white">
            Simpan Barang
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertItem;
