import { type FC } from "react";
import { useDrag } from "react-dnd";
import { dndTypes } from "@/constants/dnd";

export const AddText: FC = () => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dndTypes.ADD_TEXT,
      item: { type: "fixed--new-text" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      Drag me (text)
    </div>
  );
};
