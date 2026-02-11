export default function SaleDetail({ sale }) {
  if (!sale) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Detalle de venta</h2>

      <p><strong>Cliente:</strong> {sale.client?.name}</p>
      <p>
        <strong>Fecha:</strong>{" "}
        {new Date(sale.createdAt).toLocaleString()}
      </p>

      <hr className="my-3 border-gray-600" />

      <ul className="space-y-1">
        {sale.products.map((item, index) => (
          <li key={index}>
            {item.product?.name} × {item.quantity} = $
            {(item.quantity * item.price).toLocaleString()}
          </li>
        ))}
      </ul>

      <hr className="my-3 border-gray-600" />

      <p className="font-bold text-green-400 text-lg">
        Total: ${sale.total.toLocaleString()}
      </p>
    </div>
  );
}
