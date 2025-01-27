import { type FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { AppEditor } from "@/containers/AppEditor";
import { initiallyIsTouchDevice } from "./utils/isTouchDevice";

export const App: FC = () => {
  const backend = initiallyIsTouchDevice ? TouchBackend : HTML5Backend;
  return (
    <DndProvider backend={backend}>
      <AppEditor />
    </DndProvider>
  );
};
