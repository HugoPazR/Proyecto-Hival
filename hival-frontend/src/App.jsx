import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Clients from "./pages/Clients";
import Sales from "./pages/Sales";
import NewSale from "./pages/NewSale";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/sales" element={<Sales />} />
      <Route
        path="/sales/new"
        element={
          <ProtectedRoute>
            <NewSale />
          </ProtectedRoute>
        }
      />

      <Route path="/clients" element={<Clients />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
