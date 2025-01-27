import { type FC } from "react";
import { useDrag } from "react-dnd";
import { dndTypes } from "@/constants/dnd";
import { useShowConfigBar } from "@/context/ShowConfigBarContext";

export const AddImg: FC = () => {
  const { hideConfigBar } = useShowConfigBar();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dndTypes.ADD_IMAGE,
      item: { type: "fixed--new-img" },
      isDragging: (monitor) => {
        const isDragging = monitor.getItem().type === "fixed--new-img";
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
      Drag me (img)
    </div>
  );
};
