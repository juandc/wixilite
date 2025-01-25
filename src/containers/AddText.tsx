import { useDrag } from "react-dnd";
import { dndTypes } from "@/constants/dnd";

export const AddText = () => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dndTypes.ADD_TEXT,
      item: {},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      isDragging() {
        // close configbar
        console.log("Dragging add text");
        return true;
      },
      end: (_, monitor) => {
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          // open configbar
        }
      },
    }),
    [],
  );

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      Drag me (text)
    </div>
  );
};
