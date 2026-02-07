import { useEffect, useState } from "react";
import api from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Inventario</h1>

      <div className="overflow-x-auto bg-gray-800 rounded-lg">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-gray-700">
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-center">{p.category}</td>
                <td className="p-3 text-center">{p.stock}</td>
                <td className="p-3 text-center">${p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
