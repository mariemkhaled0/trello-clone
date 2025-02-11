import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTaskDetails } from "@/src/store/boardSlice";

interface TaskModalProps {
  boardId: number;
  task: {
    title: string;
    description: string;
    flag: string | null;
    dueDate: string | null;
  };
  taskIndex: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModal: React.FC<TaskModalProps> = ({
  boardId,
  task,
  taskIndex,
  setShowModal,
}) => {
  const [description, setDescription] = useState(task.description || "");
  const [selectedFlag, setSelectedFlag] = useState(task.flag);
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const dispatch = useDispatch();

  useEffect(() => {
    setDescription(task.description);
    setSelectedFlag(task.flag);
    setDueDate(task.dueDate || "");
  }, [task]);

  const flagColors: Record<string, string> = {
    Normal: "bg-green-500",
    Medium: "bg-blue-500",
    High: "bg-orange-400",
    Urgent: "bg-red-500",
  };

  const handleSave = () => {
    dispatch(
      updateTaskDetails({
        boardId,
        index: taskIndex,
        taskDetails: { description, flag: selectedFlag, dueDate },
      })
    );
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Edit Task: {task.title}</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Task details..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Select a Flag:</label>
          <div className="flex gap-2">
            {Object.keys(flagColors).map((flag) => (
              <button
                key={flag}
                onClick={() => setSelectedFlag(flag)}
                className={`px-3 py-1 rounded-md ${
                  selectedFlag === flag ? flagColors[flag] : "bg-gray-500"
                } text-white`}
              >
                {flag}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
