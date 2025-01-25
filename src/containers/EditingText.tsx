import {
  type FC,
  type FocusEvent,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import { useDrag } from "react-dnd";
import sanitizeHtml from 'sanitize-html';
import type { IFixedElementEditingText } from "@/types";
import { dndTypes } from "@/constants/dnd";

type Props = {
  editText: (text: string[]) => void;
} & IFixedElementEditingText;

export const EditingText: FC<Props> = ({
  editText,
  ...props
}) => {
  const { data: { x, y, text } } = props;
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: dndTypes.EDITING_TEXT,
      item: { ...props },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [props],
  );

  const [drag, setDrag] = useState({ active: false, x: "", y: "" });

  const [dims, setDims] = useState({ w: 200, h: 200 });

  const boxStyle = { width: `${dims.w}px`, height: `${dims.h}px` };

  const startResize: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag({
      active: true,
      x: `${e.clientX}`,
      y: `${e.clientY}`,
    });
  };

  const resizeFrame: MouseEventHandler<HTMLDivElement> = (e) => {
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

  const stopResize: MouseEventHandler<HTMLDivElement> = () => {
    setDrag({ ...drag, active: false });
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
        padding: ".5rem",
        border: "1px solid rgba(255,255,255,.1)",
        cursor: "move",
        top: y,
        left: x,
        width: "fit-content",
        height: "fit-content",
      }}
      onMouseMove={resizeFrame} // TODO: this event should be in mobile frame, not text container
      onMouseUp={stopResize}
    >
      <div
        onBlur={onContentBlur}
        contentEditable
        dangerouslySetInnerHTML={{ __html: `${html}` }}
        style={{ cursor: "text", ...boxStyle }}
      />
      <button
        className="dragger"
        onMouseDown={startResize}
        style={{
          backgroundColor: "rgba(255,255,255,.1)",
          borderRadius: 0,
          height: "1rem",
          width: "1rem",
          padding: 0,
          position: "absolute",
          bottom: 0,
          right: 0,
          cursor: "se-resize",
        }}
      >
      </button>
    </div>
  );
};
