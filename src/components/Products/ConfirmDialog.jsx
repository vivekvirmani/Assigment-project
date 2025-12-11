export default function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow w-64">
        <h3 className="text-lg font-bold mb-3">Are you sure?</h3>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-400 text-white rounded cursor-pointer hover:bg-green-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-700 text-white rounded cursor-pointer hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
