import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    await api.delete(`/products/${id}`);
    getProducts();
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario</h1>

        <button
          onClick={() => {
            setSelectedProduct(null);
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          + Agregar producto
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-gray-800 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-center">SKU</th>
              <th className="p-3 text-center">Categoría</th>
              <th className="p-3 text-center">Precio</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-gray-700">
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-center">{p.sku}</td>
                <td className="p-3 text-center">{p.category}</td>
                <td className="p-3 text-center">${p.price}</td>
                <td className="p-3 text-center">{p.stock}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 px-3 py-1 rounded text-black"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedProduct(null);
        }}
      >
        <ProductForm
          product={selectedProduct}
          onSuccess={() => {
            setOpen(false);
            setSelectedProduct(null);
            getProducts();
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
