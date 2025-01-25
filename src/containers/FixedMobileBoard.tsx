import { useRef, type PropsWithChildren } from "react";
import { useDrop, type XYCoord } from "react-dnd";
import { dndTypes } from "@/constants/dnd";
import { useForkRef } from "@/hooks/useForkedRef";

export const FixedMobileBoard = ({ children }: PropsWithChildren) => {
  const boundingRef = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [dndTypes.ADD_TEXT, dndTypes.EDITING_TEXT],
      drop(item: unknown, monitor) {
        const boundingRect = boundingRef.current?.getBoundingClientRect() ?? { x: 0, y: 0 };
        const end = monitor.getClientOffset() as XYCoord;
        const newPos = {
          x: end.x - boundingRect.x,
          y: end.y - boundingRect.y,
        };
        console.log("New position", newPos);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [],
  );

  const forkedRef = useForkRef(boundingRef, drop);

  return (
    <div ref={forkedRef} style={{
      border: "1px solid white",
      borderColor: canDrop ? "red" : "white",
      backgroundColor: isOver ? "red" : "transparent",
      width: "320px",
      minHeight: "100px",
      margin: "0 auto",
      position: "relative",
    }}>
      {children}
    </div>
  );
};
