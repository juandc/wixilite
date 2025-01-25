import { useCallback, type FocusEvent, type FC } from "react";
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
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dndTypes.EDITING_TEXT,
      item: { ...props },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      isDragging() {
        console.log("Dragging editting text");
        return true;
      },
      // end: (_, monitor) => {
      //   const didDrop = monitor.didDrop();
      //   if (!didDrop) {
      //     // open configbar
      //   }
      // },
    }),
    [],
  );

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
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: "fit-content",
        position: "absolute",
        padding: ".5rem",
        border: "1px solid rgba(255,255,255,.1)",
        cursor: "move",
        top: y,
        left: x,
      }}
    >
      <div
        onBlur={onContentBlur}
        contentEditable
        dangerouslySetInnerHTML={{ __html: `${html}` }}
        style={{ cursor: "text" }}
      />
    </div>
  );
};
