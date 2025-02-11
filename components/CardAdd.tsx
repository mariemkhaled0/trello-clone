"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addCard } from "@/src/store/boardSlice";
import { useClick } from "@/hooks/useClick";

type CardAddProps = {
  boardId: number;
};

const CardAdd: React.FC<CardAddProps> = ({ boardId }) => {
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const ref = useClick(() => setShow(false));

  const closeBtn = () => {
    setCard("");
    setShow(false);
  };

  const handleCard = () => {
    if (card.trim()) {
      dispatch(addCard({ boardId, card }));
      setCard("");
      setShow(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        {show && (
          <div ref={ref}>
            <textarea
              value={card}
              onChange={(e) => setCard(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
              placeholder="Enter Card Title..."
              autoFocus
            ></textarea>
            <div className="flex p-1">
              <button
                onClick={handleCard}
                className="p-1 rounded bg-sky-600 text-white mr-1"
              >
                Add Card
              </button>
              <button onClick={closeBtn} className="p-1 rounded">
                <IoClose />
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(true)}
            className="flex p-1 w-full justify-start rounded items-center mt-1 h-8"
          >
            <FaPlus className="mr-2" /> Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default CardAdd;
