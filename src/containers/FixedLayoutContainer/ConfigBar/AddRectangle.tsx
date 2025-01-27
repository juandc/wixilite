import { type FC } from "react";
import { useDrag } from "react-dnd";
import { dndTypes } from "@/constants/dnd";
import { useShowConfigBar } from "@/context/ShowConfigBarContext";

export const AddRectangle: FC = () => {
  const { hideConfigBar } = useShowConfigBar();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dndTypes.ADD_RECTANGLE,
      item: { type: "fixed--new-rectangle" },
      isDragging: (monitor) => {
        const isDragging = monitor.getItem().type === "fixed--new-rectangle";
        if (isDragging) {
          hideConfigBar();
        }
        return isDragging;
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  );

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      Drag me (rectangle)
    </div>
  );
};
