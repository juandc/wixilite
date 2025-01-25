import { useRef, type FC, type PropsWithChildren } from "react";
import { useDrop, type XYCoord } from "react-dnd";
import type { IFixedElement } from "@/types";
import { dndTypes } from "@/constants/dnd";
import { useForkRef } from "@/hooks/useForkedRef";

type Props = PropsWithChildren<{
  moveElement: (id: string) => (x: number, y: number) => void;
}>;

export const FixedMobileBoard: FC<Props> = ({ children, moveElement }) => {
  const boundingRef = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [dndTypes.ADD_TEXT, dndTypes.EDITING_TEXT],
      drop(item: IFixedElement, monitor) {
        // TODO: change logic to already editing elements
        const boundingRect = boundingRef.current?.getBoundingClientRect() ?? { x: 0, y: 0 };
        const end = monitor.getClientOffset() as XYCoord;
        const newPos = {
          x: end.x - boundingRect.x,
          y: end.y - boundingRect.y,
        };
        console.log("New position", newPos);
        moveElement(item.id)(newPos.x, newPos.y);
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
