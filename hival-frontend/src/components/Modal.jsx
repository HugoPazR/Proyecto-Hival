export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        {children}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-400 hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
