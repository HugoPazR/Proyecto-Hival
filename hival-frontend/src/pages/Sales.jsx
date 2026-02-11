import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import SaleDetail from "../components/SaleDetail";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const getSales = async () => {
    const { data } = await api.get("/sales");
    setSales(data);
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Ventas</h1>

      <div className="bg-gray-800 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3">Fecha</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Total</th>
              <th className="p-3">Acción</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id} className="border-b border-gray-700">
                <td className="p-3">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">{sale.client?.name}</td>
                <td className="p-3 font-bold text-green-400">
                  ${sale.total.toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      setSelectedSale(sale);
                      setOpen(true);
                    }}
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <SaleDetail sale={selectedSale} />
      </Modal>
    </DashboardLayout>
  );
}
