import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 border-r border-blue-400">
      <h2 className="text-2xl font-bold text-blue-400 mb-8">
        Hival
      </h2>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/products" className="hover:text-blue-400">Productos</Link>
        <Link to="/sales" className="hover:text-blue-400">Ventas</Link>
      </nav>
    </aside>
  );
}
