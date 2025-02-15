import React from "react";
type ConfirmationModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <p className="mb-4 text-black text-lg">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
