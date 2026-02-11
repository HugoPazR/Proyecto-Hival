import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [openSales, setOpenSales] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 border-r border-blue-400">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">
        Hival
      </h2>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/products" className="hover:text-blue-400">
          Productos
        </Link>

        <div>
          <button
            onClick={() => setOpenSales(!openSales)}
            className="w-full text-left hover:text-blue-400"
          >
            Ventas
          </button>

          {openSales && (
            <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
              <Link
                to="/sales"
                className="hover:text-blue-400"
              >
                • Listado de ventas
              </Link>

              <Link
                to="/sales/new"
                className="hover:text-blue-400"
              >
                • Registrar venta
              </Link>
            </div>
          )}
        </div>

        <Link to="/clients" className="hover:text-blue-400">
          Clientes
        </Link>
      </nav>
    </aside>
  );
}
