"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addList } from "@/src/store/boardSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

function AddList() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.board.boards);
  const handleList = () => {
    if (value.trim()) {
      dispatch(addList({ boardId: boards.length + 1, name: value }));
      setValue("");
      setShow(false);
    }
  };
  const handelShow = () => {
    setShow(!show);
    setValue("");
  };
  return (
    <div className="bg-slate-800 text-white p-4 rounded-md shadow-xl shrink-0  h-fit w-60">
      {show ? (
        <div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
            placeholder="Enter list Title..."
          ></textarea>
          <div className="flex p-1">
            <button
              onClick={handleList}
              className="p-1 rounded bg-sky-600 text-white mr-2"
            >
              Add List
            </button>
            <button onClick={handelShow} className="p-1 rounded">
              <IoClose />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handelShow}
          className="flex p-1 w-full justify-start rounded items-center mt-1  h-8"
        >
          <FaPlus className="mr-2" /> Add a list
        </button>
      )}
    </div>
  );
}

export default AddList;
