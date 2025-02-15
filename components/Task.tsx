"use client";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateTask, deleteCard } from "@/src/store/boardSlice";
import { Task as TaskType } from "@/src/store/boardSlice";
import Edit from "./Edit";
import TaskModal from "./Modal";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import dayjs from "dayjs";
import ConfirmationModal from "./ConfirmationModal";
interface TaskProps {
  boardId: number;
  task: TaskType;
  taskIndex: number;
}

const Task: React.FC<TaskProps> = ({ boardId, task, taskIndex }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const flagColors: Record<string, string> = {
    Normal: "bg-green-500",
    Medium: "bg-blue-500",
    High: "bg-orange-400",
    Urgent: "bg-red-500",
  };
  const getDueDateColor = (dueDate: string | null) => {
    if (!dueDate) return "bg-gray-400";

    const today = dayjs().startOf("day");
    const date = dayjs(dueDate);

    if (date.isBefore(today)) return "bg-red-500 text-white";
    if (date.isSame(today, "day")) return "bg-yellow-500";
    if (date.isSame(today.add(1, "day"), "day")) return "bg-yellow-600";

    return "bg-gray-400";
  };

  const handleToggleComplete = () => {
    dispatch(
      updateTask({
        boardId,
        index: taskIndex,
        task: { completed: !task.completed },
      })
    );
  };

  const handleDeleteTask = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCard({ boardId, cardIndex: taskIndex }));
    setShowConfirm(false);
  };
  const handleSaveEdit = (newText: string) => {
    dispatch(
      updateTask({ boardId, index: taskIndex, task: { title: newText } })
    );
    setIsEditing(false);
  };

  return (
    <div
      className={`flex justify-between items-center w-full p-2  rounded-md ${
        task.completed ? " line-through" : "bg-gray-700"
      } text-white`}
    >
      {isEditing && task.completed === false ? (
        <Edit value={task.title} onSave={handleSaveEdit} />
      ) : (
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center  gap-2 w-full">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                className="accent-green-500 cursor-pointer"
              />
              <span
                className="flex-1 cursor-pointer"
                onClick={handleToggleComplete}
              >
                {task.title}
              </span>
            </div>

            <div className="flex gap-1">
              <button
                disabled={task.completed}
                onClick={() => setIsEditing(!isEditing)}
              >
                <MdEdit
                  className={`${task.completed === true && "text-gray-800"}`}
                />
              </button>
              <button onClick={handleDeleteTask}>
                <MdDelete />
              </button>
              <button
                onClick={() => {
                  setShowModal(!showModal);
                }}
                disabled={task.completed}
                className={`${task.completed === true && "text-gray-800"}`}
              >
                <PiDotsThreeOutlineFill />
              </button>
            </div>
          </div>
          {(task.dueDate || task.flag) && (
            <div className="flex gap-3 text-xs mt-2 items-center">
              {task.flag && (
                <span
                  className={`px-2 py-1 rounded-md text-white ${
                    flagColors[task.flag]
                  }`}
                >
                  {task.flag}
                </span>
              )}
              {task.dueDate && (
                <div
                  className={`px-2 py-1 rounded-md ${getDueDateColor(
                    task.dueDate
                  )}`}
                >
                  {task.dueDate}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {showModal && (
        <TaskModal
          task={task}
          boardId={boardId}
          taskIndex={taskIndex}
          setShowModal={setShowModal}
        />
      )}
      {showConfirm && (
        <ConfirmationModal
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default Task;
