import React, { useState } from "react";

type EditProps = {
  value: string;
  onSave: (newValue: string) => void;
  onCancel?: () => void;
};

const Edit: React.FC<EditProps> = ({ value, onSave, onCancel }) => {
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    if (editValue.trim()) {
      onSave(editValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape" && onCancel) {
      onCancel();
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-1 rounded-md border-2 border-gray-300 bg-white text-black focus:outline-none"
        autoFocus
      />
      <button
        onClick={handleSave}
        className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
      >
        Save
      </button>
      {onCancel && (
        <button
          onClick={onCancel}
          className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default Edit;
