import { type FC } from "react";
import { useDrag } from "react-dnd";
import { dndTypes } from "@/constants/dnd";

export const AddImg: FC = () => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dndTypes.ADD_IMAGE,
      item: { type: "fixed--new-img" },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      Drag me (img)
    </div>
  );
};
