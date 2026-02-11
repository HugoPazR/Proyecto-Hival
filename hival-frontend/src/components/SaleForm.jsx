import { useEffect, useState } from "react";
import api from "../services/api";

export default function SaleForm() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [client, setClient] = useState("");
  const [items, setItems] = useState([]);
  const [success, setSuccess] = useState(false);

  // Cargar clientes y productos
  useEffect(() => {
    const loadData = async () => {
      const clientsRes = await api.get("/clients");
      const productsRes = await api.get("/products");

      setClients(clientsRes.data);
      setProducts(productsRes.data);
    };

    loadData();
  }, []);

  // Agregar producto a la venta
  const addItem = () => {
    setItems([
      ...items,
      { product: "", quantity: 1, price: 0 }
    ]);
  };

  // Actualizar producto
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    // Si selecciona producto → asignar precio automáticamente
    if (field === "product") {
      const selected = products.find(p => p._id === value);
      updated[index].price = selected?.price || 0;
    }

    setItems(updated);
  };

  // Eliminar producto
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Total
  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Limpiar formulario
  const clearForm = () => {
    setClient("");
    setItems([]);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  // Enviar venta
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!client || items.length === 0) return;

    await api.post("/sales", {
      client,
      products: items,
      total
    });

    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {/* MENSAJE */}
      {success && (
        <div className="bg-green-600 text-white p-3 rounded">
          ✅ Venta registrada correctamente!!
        </div>
      )}

      {/* CLIENTE */}
      <select
        value={client}
        onChange={(e) => setClient(e.target.value)}
        className="w-full p-2 rounded text-black"
        required
      >
        <option value="">Seleccione cliente</option>
        {clients.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* PRODUCTOS */}
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <select
            className="flex-1 p-2 rounded text-black"
            value={item.product}
            onChange={(e) =>
              updateItem(index, "product", e.target.value)
            }
            required
          >
            <option value="">Producto</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            className="w-20 p-2 rounded text-black"
            value={item.quantity}
            onChange={(e) =>
              updateItem(index, "quantity", Number(e.target.value))
            }
            required
          />

          <button
            type="button"
            onClick={() => removeItem(index)}
            className="bg-red-600 px-3 rounded"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="bg-gray-700 px-4 py-2 rounded"
      >
        + Agregar producto
      </button>

      {/* TOTAL */}
      <p className="text-lg font-bold">
        Total:{" "}
        <span className="text-green-400">
          ${total.toLocaleString()}
        </span>
      </p>

      {/* GUARDAR */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded"
      >
        Registrar venta
      </button>
    </form>
  );
}
