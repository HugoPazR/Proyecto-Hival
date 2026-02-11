import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import ClientForm from "../components/ClientForm";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const getClients = async () => {
    const { data } = await api.get("/clients");
    setClients(data);
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleEdit = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar cliente?")) return;
    await api.delete(`/clients/${id}`);
    getClients();
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>

        <button
          onClick={() => {
            setSelectedClient(null);
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          + Agregar cliente
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-gray-800 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-center">Email</th>
              <th className="p-3 text-center">Teléfono</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c._id} className="border-b border-gray-700">
                <td className="p-3">{c.name}</td>
                <td className="p-3 text-center">{c.email}</td>
                <td className="p-3 text-center">{c.phone || "-"}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-500 px-3 py-1 rounded text-black"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {clients.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No hay clientes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedClient(null);
        }}
      >
        <ClientForm
          client={selectedClient}
          onSuccess={() => {
            setOpen(false);
            setSelectedClient(null);
            getClients();
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}
