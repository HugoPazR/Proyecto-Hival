export default function ClientTable({ clients, onEdit, onDelete }) {
  return (
    <table className="w-full bg-gray-900 text-white">
      <thead>
        <tr className="bg-gray-700">
          <th className="p-2">Nombre</th>
          <th className="p-2">Email</th>
          <th className="p-2">Teléfono</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((c) => (
          <tr key={c._id} className="border-t">
            <td className="p-2">{c.name}</td>
            <td className="p-2">{c.email}</td>
            <td className="p-2">{c.phone}</td>
            <td className="p-2 space-x-2">
              <button
                className="bg-yellow-500 px-2 rounded"
                onClick={() => onEdit(c)}
              >
                Editar
              </button>
              <button
                className="bg-red-600 px-2 rounded"
                onClick={() => onDelete(c._id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
