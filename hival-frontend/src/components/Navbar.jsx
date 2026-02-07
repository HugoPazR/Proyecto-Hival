import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-gray-800 flex items-center justify-between px-6 border-b border-blue-400">
      <h1 className="text-white font-semibold">Hival Admin</h1>

      <button
        onClick={logout}
        className="text-red-400 hover:text-red-500 font-semibold"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
