import { useRef, type FC, type PropsWithChildren } from "react";
import { useDrop, type XYCoord } from "react-dnd";
import type { IDraggableFixedElement, IFixedElementNew } from "@/types";
import { dndTypes } from "@/constants/dnd";
import { useForkRef } from "@/hooks/useForkedRef";

type Props = PropsWithChildren<{
  isItemSelected: boolean;
  addElement: (type: IFixedElementNew["type"]) => (x: number, y: number) => void;
  moveElement: (id: string) => (x: number, y: number) => void;
}>;

export const FixedMobileBoard: FC<Props> = ({
  children,
  isItemSelected,
  addElement,
  moveElement,
}) => {
  const boundingRef = useRef<HTMLDivElement>(null);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [
        dndTypes.ADD_TEXT,
        dndTypes.EDITING_TEXT,
        dndTypes.ADD_IMAGE,
        dndTypes.EDITING_IMAGE,
        dndTypes.ADD_RECTANGLE,
        dndTypes.EDITING_RECTANGLE,
      ],
      drop(item: IDraggableFixedElement, monitor) {
        if (
          item.type === "fixed--editing-text"
          || item.type === "fixed--editing-img"
          || item.type === "fixed--editing-rectangle"
        ) {
          const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
          const newPos = {
            x: item.data.x + delta.x,
            y: item.data.y + delta.y,
          };
          moveElement(item.id)(newPos.x, newPos.y);
        } else if (
          item.type === "fixed--new-text"
          || item.type === "fixed--new-img"
          || item.type === "fixed--new-rectangle"
        ) {
          const boundingRect = boundingRef.current?.getBoundingClientRect() ?? {
            x: 0,
            y: 0
          };
          const end = monitor.getClientOffset() as XYCoord;
          const newPos = {
            x: end.x - boundingRect.x,
            y: end.y - boundingRect.y,
          };
          addElement(item.type)(newPos.x, newPos.y);
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
    <div
      id="fixed-mobile-board"
      ref={forkedRef}
      style={{
        boxShadow: isOver ? "0 0 0px 10px white" : "none",
        backgroundColor: "var(--page-inner-bg)",
        opacity: canDrop ? isOver ? 0.75 : 0.5 : 1,
        width: "320px",
        minHeight: "400px",
        margin: "0 auto",
        position: "relative",
        overflow: isItemSelected ? "unset" : "hidden",
        transition: "box-shadow 0.3s, opacity 0.3s",
      }}
    >
      {children}
    </div>
  );
};
