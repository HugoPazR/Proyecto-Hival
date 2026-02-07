import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProductForm({ product, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        sku: product.sku || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
      });
    } else {
      setForm({
        name: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
      });
    }
  }, [product]);

  // ✍️ Manejo de inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 Guardar (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (product?._id) {
        // EDITAR
        await api.put(`/products/${product._id}`, form);
      } else {
        // CREAR
        await api.post("/products", form);
      }

      onSuccess();
    } catch (error) {
      console.error("Error guardando producto", error);
      alert("Error al guardar el producto");
    }
  };

  return (
    <div className="w-[350px] text-white">
      <h2 className="text-xl font-bold mb-4">
        {product ? "Editar producto" : "Nuevo producto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={form.category}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          {product ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
}
