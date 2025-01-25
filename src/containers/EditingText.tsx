import { useCallback, useState, type FocusEvent } from "react";
import { useDrag } from "react-dnd";
import sanitizeHtml from 'sanitize-html';
import { dndTypes } from "@/constants/dnd";

export const EditingText = () => {
  const [value, setValue] = useState<string[]>(["EditingText"]);
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
      setValue(newValue);
    },
    []
  );

  const html = value.map(v => `<p>${v}</p>`).join("");

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: "fit-content",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      onBlur={onContentBlur}
      contentEditable
      dangerouslySetInnerHTML={{ __html: `${html}` }}
    />
  );
};
