import { useEffect, useState } from "react";
import api from "../services/api";

export default function ClientForm({ client, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name,
        email: client.email,
        phone: client.phone || "",
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (client) {
      await api.put(`/clients/${client._id}`, form);
    } else {
      await api.post("/clients", form);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-2">
        {client ? "Editar cliente" : "Nuevo cliente"}
      </h2>

      <input
        className="w-full p-2 rounded text-black"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        className="w-full p-2 rounded text-black"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        className="w-full p-2 rounded text-black"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
      />

      <button className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded">
        Guardar
      </button>
    </form>
  );
}
