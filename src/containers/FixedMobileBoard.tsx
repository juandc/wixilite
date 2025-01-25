import { useRef, type FC, type PropsWithChildren } from "react";
import { useDrop, type XYCoord } from "react-dnd";
import type { IDraggableFixedElement } from "@/types";
import { dndTypes } from "@/constants/dnd";
import { useForkRef } from "@/hooks/useForkedRef";

type Props = PropsWithChildren<{
  addElement: (x: number, y: number) => void;
  moveElement: (id: string) => (x: number, y: number) => void;
}>;

export const FixedMobileBoard: FC<Props> = ({
  children,
  addElement,
  moveElement,
}) => {
  const boundingRef = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [dndTypes.ADD_TEXT, dndTypes.EDITING_TEXT],
      drop(item: IDraggableFixedElement, monitor) {
        if (item.type === "fixed--editing-text") {
          const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
          const newPos = {
            x: item.data.x + delta.x,
            y: item.data.y + delta.y,
          };
          moveElement(item.id)(newPos.x, newPos.y);
        } else if (item.type === "fixed--new-text") {
          const boundingRect = boundingRef.current?.getBoundingClientRect() ?? { x: 0, y: 0 };
          const end = monitor.getClientOffset() as XYCoord;
          const newPos = {
            x: end.x - boundingRect.x,
            y: end.y - boundingRect.y,
          };
          addElement(newPos.x, newPos.y);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [boundingRef, moveElement],
  );

  const forkedRef = useForkRef(boundingRef, drop);

  return (
    <div ref={forkedRef} style={{
      border: "1px solid white",
      borderColor: canDrop ? "red" : "white",
      backgroundColor: isOver ? "red" : "transparent",
      width: "320px",
      minHeight: "400px",
      margin: "0 auto",
      position: "relative",
    }}>
      {children}
    </div>
  );
};
