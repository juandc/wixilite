import {
  type FC,
  type FocusEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDrag } from "react-dnd";
import sanitizeHtml from 'sanitize-html';
import type { IFixedElementEditingText } from "@/types";
import { dndTypes } from "@/constants/dnd";

type Props = {
  editText: (text: string[]) => void;
  selected: boolean;
  selectElement: () => void;
} & IFixedElementEditingText;

export const EditingText: FC<Props> = ({
  editText,
  selected,
  selectElement,
  ...item
}) => {
  const {
    data: { text, x, y },
  } = item;
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: dndTypes.EDITING_TEXT,
      item: { ...item },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      // TODO: select item on drag with didDrop? or isDragging?
    }),
    [item],
  );

  const [drag, setDrag] = useState({ active: false, x: "", y: "" });

  const [dims, setDims] = useState({ w: 200, h: 200 });

  const boxStyle = { width: `${dims.w}px`, height: `${dims.h}px` };

  const resizeFrame = (e: MouseEvent) => {
    console.log("resizeFrame", item.id);
    const { active, x, y } = drag;
    if (active) {
      const xDiff = Math.abs(+x - e.clientX);
      const yDiff = Math.abs(+y - e.clientY);
      const newW = +x > e.clientX ? dims.w - xDiff : dims.w + xDiff;
      const newH = +y > e.clientY ? dims.h - yDiff : dims.h + yDiff;

      setDrag({ ...drag, x: `${e.clientX}`, y: `${e.clientY}` });
      setDims({ w: newW, h: newH });
    }
  };

  const stopResize = () => {
    console.log("stopResize");
    setDrag({ ...drag, active: false });
  };

  const startResize: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("startResize");
    e.preventDefault();
    e.stopPropagation();
    setDrag({
      active: true,
      x: `${e.clientX}`,
      y: `${e.clientY}`,
    });
  };

  useEffect(() => {
    if (selected && drag.active) {
      const parent = document.getElementById("fixed-mobile-board") as HTMLDivElement;
      parent.addEventListener("mousemove", resizeFrame);
      parent.addEventListener("mouseup", stopResize);
      parent.addEventListener("mouseleave", stopResize);
      return () => {
        parent.removeEventListener("mousemove", resizeFrame);
        parent.removeEventListener("mouseup", stopResize);
        parent.removeEventListener("mouseleave", stopResize);
      };
    }
  }, [selected, drag, dims]);

  const containerOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectElement();
  };

  const onContentBlur = useCallback(
    (evt: FocusEvent) => {
      const sanitizeOpts = { allowedTags: [], allowedAttributes: {} };
      const sanitize = (v: string) => sanitizeHtml(v, sanitizeOpts);
      const newHtml = evt.currentTarget.innerHTML;
      const newValue = `${newHtml}`
        .replaceAll('</p><p>', '<br>')
        .replaceAll('<p>', '')
        .replaceAll('</p>', '')
        .split('<br>')
        .map(sanitize)
        .filter((v) => v.length);
      editText(newValue);
    },
    []
  );

  const html = text.map(v => `<p>${v}</p>`).join("");

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: "absolute",
        padding: "2px",
        border: "2px solid transparent",
        borderColor: selected ? "white" : "transparent", // TODO: also on hover
        cursor: "move",
        top: y,
        left: x,
        width: "fit-content",
        height: "fit-content",
        zIndex: selected ? 2 : 1,
      }}
      onClick={containerOnClick}
    >
      <div
        onBlur={onContentBlur}
        contentEditable
        dangerouslySetInnerHTML={{ __html: `${html}` }}
        style={{
          cursor: "text",
          ...boxStyle,
          minWidth: "fit-content",
          minHeight: "fit-content",
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
          display: selected ? "block" : "none",
        }}
      >
      </button>
    </div>
  );
};
