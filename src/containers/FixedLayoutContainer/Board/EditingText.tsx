import {
  type FC,
  type FocusEvent,
  type MouseEventHandler,
  useCallback,
} from "react";
import { useDrag } from "react-dnd";
import sanitizeHtml from 'sanitize-html';
import type { IFixedElementEditingText } from "@/types";
import { initiallyIsTouchDevice } from "@/utils/isTouchDevice";
import { dndTypes } from "@/constants/dnd";
import { useMousePos } from "@/hooks/useMousePos";

type Props = {
  editText: (text: string[]) => void;
  resize: (h: number, w: number) => void;
  selected: boolean;
  selectElement: () => void;
} & IFixedElementEditingText;

export const EditingText: FC<Props> = ({
  editText,
  resize,
  selected,
  selectElement,
  ...item
}) => {
  const {
    data: { text, color, fontSize, textAlign, x, y, h, w, opacity },
  } = item;
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: dndTypes.EDITING_TEXT,
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
        zIndex: selected ? 5 : 4,
      }}
      onClick={containerOnClick}
      data-testid="editing-text"
    >
      <div
        onBlur={onContentBlur}
        contentEditable
        dangerouslySetInnerHTML={{ __html: `${html}` }}
        style={{
          cursor: "text",
          color,
          fontSize,
          textAlign,
          height: h,
          width: w,
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
          display: showResize ? "block" : "none",
        }}
      >
      </button>
    </div>
  );
};
