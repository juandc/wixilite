
import { useState } from "react";
import type { IDevices, IFixedElementsDict } from "./types";
import { FixedMobileBoard } from "@/containers/FixedMobileBoard";
import { AddText } from "@/containers/AddText";
import { EditingText } from "@/containers/EditingText";
import { DeviceTabs, EditorLayout } from "@/components";

type Layouts = "fixed" | "responsive";

const initialElements: IFixedElementsDict = {
  "1": {
    id: "1",
    type: "fixed--editing-text",
    data: {
      x: 10,
      y: 10,
      text: ["Hello World"],
    },
  },
  "2": {
    id: "2",
    type: "fixed--editing-text",
    data: {
      x: 50,
      y: 50,
      text: ["Hello World 2"],
    },
  },
};

export const App = () => {
  const [showConfigBar, setShowConfigBar] = useState<boolean>(false);
  const [layout, setLayout] = useState<Layouts | undefined>(undefined);

  const [tab, setTab] = useState<IDevices>("mobile");
  const setMobileTab = () => setTab("mobile");
  const setDesktopTab = () => setTab("desktop");

  const [elements, setElements] = useState<IFixedElementsDict>(() => initialElements);
  const elementIds = Object.keys(elements);

  const addElement = (x: number, y: number) => {
    const id = `${Math.random()}`;
    setElements(prev => ({
      ...prev,
      [id]: {
        id,
        type: "fixed--editing-text",
        data: { x, y, text: ["New Text"], },
      },
    }));
  };

  const moveElement = (id: string) => (x: number, y: number) => {
    setElements(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        data: { ...prev[id].data, x, y },
      },
    }));
  };

  const editText = (id: string) => (text: string[]) => {
    setElements(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        data: { ...prev[id].data, text },
      },
    }));
  };

  return (
    <EditorLayout
      showMobileConfigBar={showConfigBar}
      showMobileConfigBarToggle
      onToggleConfigBar={() => setShowConfigBar(!showConfigBar)}
      configBar={(
        <>
          Config Tab
          <input type="text" placeholder="Board name" />
          <button>Copy JSON</button>
          <AddText />
        </>
      )}
      board={(
        <>
          {!layout && (
            <div>
              <button onClick={() => setLayout("fixed")}>Fixed</button>
              <button onClick={() => setLayout("responsive")} disabled>Responsive (WIP)</button>
            </div>
          )}

          {layout === "fixed" && (
            <div>
              <DeviceTabs
                selected={tab}
                setMobile={setMobileTab}
                setDesktop={setDesktopTab}
              />

              {tab === "mobile" && (
                <div>
                  <FixedMobileBoard
                    addElement={addElement}
                    moveElement={moveElement}
                  >
                    {elementIds.map((elementId) => {
                      const element = { ...elements[elementId] };
                      if (element.type === "fixed--editing-text") {
                        return (
                          <EditingText
                            key={element.id}
                            {...element}
                            editText={editText(elementId)}
                          />
                        );
                      }
                    })}
                  </FixedMobileBoard>
                </div>
              )}

              {tab === "desktop" && (
                <div>
                  Board desktop
                </div>
              )}
            </div>
          )}
        </>
      )}
    />
  );
};
