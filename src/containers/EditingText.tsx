import { useDrag } from "react-dnd";
import { dndTypes } from "@/constants/dnd";

export const EditingText = () => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dndTypes.EDITING_TEXT,
      item: {},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      isDragging() {
        // close configbar
        console.log("Dragging editting text");
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
    <div ref={drag} style={{
      opacity: isDragging ? 0.5 : 1,
      width: "fit-content",
      position: "absolute",
      top: 0,
      left: 0,
    }}>
      Edit me (text)
    </div>
  );
};
