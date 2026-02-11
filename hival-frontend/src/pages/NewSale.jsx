import DashboardLayout from "../layouts/DashboardLayout";
import SaleForm from "../components/SaleForm";

export default function NewSale() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Registrar venta</h1>
      <SaleForm />
    </DashboardLayout>
  );
}
