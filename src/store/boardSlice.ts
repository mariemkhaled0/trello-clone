import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  title: string;
  description: string;
  flag: string | null;
  dueDate: string | null;
  completed: boolean;
};

type Board = {
  id: number;
  name: string;
  data: Task[];
};

interface BoardState {
  boards: Board[];
}

const initialState: BoardState = {
  boards: [
    { id: 1, name: "To Do", data: [] },
    { id: 2, name: "In Progress", data: [] },
    { id: 3, name: "Done", data: [] },
  ],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addCard: (
      state,
      action: PayloadAction<{ boardId: number; card: string }>
    ) => {
      const { boardId, card } = action.payload;
      const targetBoard = state.boards.find((c) => c.id === boardId);
      if (targetBoard) {
        targetBoard.data.push({
          title: card,
          description: "",
          flag: null,
          dueDate: null,
          completed: false,
        });
      }
    },
    updateTaskDetails: (
      state,
      action: PayloadAction<{
        boardId: number;
        index: number;
        taskDetails: Partial<Task>;
      }>
    ) => {
      const { boardId, index, taskDetails } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board && board.data[index]) {
        board.data[index] = { ...board.data[index], ...taskDetails };
      }
    },

    addList: (
      state,
      action: PayloadAction<{ boardId: number; name: string }>
    ) => {
      const { boardId, name } = action.payload;
      state.boards.push({ id: boardId, name, data: [] });
    },
    deleteCard: (
      state,
      action: PayloadAction<{ boardId: number; cardIndex: number }>
    ) => {
      const { boardId, cardIndex } = action.payload;
      const targetBoard = state.boards.find((b) => b.id === boardId);
      if (targetBoard && targetBoard.data.length > cardIndex) {
        targetBoard.data.splice(cardIndex, 1);
      }
    },
    deleteBoard: (state, action: PayloadAction<{ boardId: number }>) => {
      const { boardId } = action.payload;
      state.boards = state.boards.filter((board) => board.id !== boardId);
    },
    moveCard: (
      state,
      action: PayloadAction<{
        sourceBoardId: number;
        destinationBoardId: number;
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) => {
      const {
        sourceBoardId,
        destinationBoardId,
        sourceIndex,
        destinationIndex,
      } = action.payload;

      const sourceBoard = state.boards.find((b) => b.id === sourceBoardId);
      const destinationBoard = state.boards.find(
        (b) => b.id === destinationBoardId
      );

      if (!sourceBoard || !destinationBoard) return;

      const [movedTask] = sourceBoard.data.splice(sourceIndex, 1);
      destinationBoard.data.splice(destinationIndex, 0, movedTask);
    },
    updateBoardName: (
      state,
      action: PayloadAction<{ boardId: number; name: string }>
    ) => {
      const { boardId, name } = action.payload;
      const board = state.boards.find((board) => board.id === boardId);
      if (board) board.name = name;
    },
    updateTask: (
      state,
      action: PayloadAction<{
        boardId: number;
        index: number;
        task: Partial<Task>;
      }>
    ) => {
      const { boardId, index, task } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board && board.data[index]) {
        board.data[index] = { ...board.data[index], ...task };
      }
    },
    sortTasks: (state, action: PayloadAction<{ boardId: number }>) => {
      const { boardId } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        board.data.sort((a, b) => {
          const priorityOrder: Record<string, number> = {
            urgent: 1,
            high: 2,
            medium: 3,
            Normal: 4,
          };

          const priorityA = a.flag ? priorityOrder[a.flag] : 5;
          const priorityB = b.flag ? priorityOrder[b.flag] : 5;

          return priorityB - priorityA;
        });
      }
    },
  },
});

export const {
  addCard,
  addList,
  deleteCard,
  deleteBoard,
  moveCard,
  updateBoardName,
  updateTask,
  updateTaskDetails,
  sortTasks,
} = boardSlice.actions;
export default boardSlice.reducer;
