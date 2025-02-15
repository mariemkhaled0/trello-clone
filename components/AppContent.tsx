"use client";
import React, { useState } from "react";
import CardAdd from "./CardAdd";
import { RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBoard,
  moveCard,
  sortTasks,
  updateBoardName,
} from "@/src/store/boardSlice";
import { MdDeleteOutline } from "react-icons/md";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import AddList from "./AddList";
import Edit from "./Edit";
import Task from "./Task";
import { FaSort } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

function AppContent() {
  const boards = useSelector((state: RootState) => state.board.boards);
  const dispatch = useDispatch();

  const [editBoardId, setEditBoardId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [boardId, setBoardId] = useState<number>(0);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceBoardId = parseInt(source.droppableId);
    const destinationBoardId = parseInt(destination.droppableId);

    if (
      sourceBoardId === destinationBoardId &&
      source.index === destination.index
    )
      return;

    dispatch(
      moveCard({
        sourceBoardId,
        destinationBoardId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };
  const handleDeleteBoard = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteBoard({ boardId: boardId }));
    setShowConfirm(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-8 overflow-x-scroll scrollbar-hide overflow-y-hidden w-full">
        {boards.map((board) => (
          <Droppable key={board.id} droppableId={board.id.toString()}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-slate-800 text-white p-4 rounded-md shrink-0 shadow-xl h-fit w-60"
              >
                <div className="flex justify-between items-center">
                  {editBoardId === board.id ? (
                    <Edit
                      value={board.name}
                      onSave={(newName) => {
                        dispatch(
                          updateBoardName({ boardId: board.id, name: newName })
                        );
                        setEditBoardId(null);
                      }}
                    />
                  ) : (
                    <h1
                      onClick={() => setEditBoardId(board.id)}
                      className="cursor-pointer"
                    >
                      {board.name}
                    </h1>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setBoardId(board.id);
                        handleDeleteBoard();
                      }}
                      className="text-red-400 hover:text-red-500"
                    >
                      <MdDeleteOutline />
                    </button>
                    <button
                      onClick={() => dispatch(sortTasks({ boardId: board.id }))}
                      className="text-gray-300 hover:text-white"
                    >
                      <FaSort />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  {board.data.map((task, index) => (
                    <Draggable
                      key={`${board.id}-${index}`}
                      draggableId={`${board.id}-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-700 flex justify-between p-2 my-2 rounded-md text-white"
                        >
                          <Task
                            task={task}
                            boardId={board.id}
                            taskIndex={index}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>

                <div className="hover:bg-gray-700 px-3 py-1 rounded-md flex items-center gap-2 cursor-pointer shrink-0 mt-4">
                  <CardAdd boardId={board.id} />
                </div>
                {showConfirm && (
                  <ConfirmationModal
                    message="Are you sure you want to delete this Board?"
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirm(false)}
                  />
                )}
              </div>
            )}
          </Droppable>
        ))}
        <AddList />
      </div>
    </DragDropContext>
  );
}

export default AppContent;
