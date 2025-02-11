"use client";

import { useDraggable } from "@dnd-kit/core";

interface TaskProps {
  task: { id: string; title: string };
}

export default function Card({ task }: TaskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-gray-700 p-2 mt-2 rounded-md text-white"
    >
      {task.title}
    </div>
  );
}
