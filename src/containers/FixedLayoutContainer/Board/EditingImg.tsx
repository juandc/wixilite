import {
  type FC,
  type MouseEventHandler,
} from "react";
import { useDrag } from "react-dnd";
import type { IFixedElementEditingImg } from "@/types";
import { initiallyIsTouchDevice } from "@/utils/isTouchDevice";
import { dndTypes } from "@/constants/dnd";
import { useMousePos } from "@/hooks/useMousePos";

type Props = {
  resize: (h: number, w: number) => void;
  selected: boolean;
  selectElement: () => void;
} & IFixedElementEditingImg;

export const EditingImg: FC<Props> = ({
  resize,
  selected,
  selectElement,
  ...item
}) => {
  const {
    data: { url, borderRadius, x, y, h, w, opacity },
  } = item;
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: dndTypes.EDITING_IMAGE,
      item: { ...item },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item],
  );

  const {
    startResize,
    stopResize,
  } = useMousePos({ selected, h, w, resize });

  const containerOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectElement();
  };

  const showResize = selected && !initiallyIsTouchDevice;

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : opacity,
        position: "absolute",
        padding: "2px",
        border: "2px solid transparent",
        borderColor: selected ? "white" : "transparent", // TODO: also on hover
        cursor: "move",
        top: y,
        left: x,
        width: "fit-content",
        height: "fit-content",
        zIndex: selected ? 5 : 3,
      }}
      onClick={containerOnClick}
    >
      <img
        src={url}
        style={{
          borderRadius,
          cursor: "pointer",
          height: h,
          width: w,
          outline: "none"
        }}
      />
      <button
        className="dragger"
        onMouseDown={startResize}
        onMouseUp={stopResize}
        style={{
          backgroundColor: "rgba(255,255,255,.5)",
          borderRadius: 0,
          height: "1rem",
          width: "1rem",
          padding: 0,
          position: "absolute",
          bottom: 0,
          right: 0,
          cursor: "se-resize",
          display: showResize ? "block" : "none",
        }}
      >
      </button>
    </div>
  );
};
