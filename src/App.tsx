
import { useState } from "react";
import type { IDevices, IFixedElementsDict } from "./types";
import { FixedMobileBoard } from "@/containers/FixedMobileBoard";
import { AddText } from "@/containers/AddText";
import { EditingText } from "@/containers/EditingText";
import { DeviceTabs, EditorLayout } from "@/components";
import {
  addTextElementToElementsDict,
  editingTextDefaults,
  editTextInElementsDict,
  moveElementInElementsDict,
  resizeElementInElementsDict,
} from "@/utils/fixedElement";

type Layouts = "fixed" | "responsive";

type DeviceElementsDict = Record<IDevices, IFixedElementsDict>;

const initialElements: DeviceElementsDict = {
  mobile: {
    "1": {
      id: "1",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["Hello World"],
      },
    },
    "2": {
      id: "2",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["Hello World 2"],
        x: 100,
        y: 100,
      },
    },
  },
  desktop: {},
};

export const App = () => {
  const [showConfigBar, setShowConfigBar] = useState<boolean>(false);
  const [layout, setLayout] = useState<Layouts | undefined>(undefined);

  const [tab, setTab] = useState<IDevices>("mobile");
  const setMobileTab = () => setTab("mobile");
  const setDesktopTab = () => setTab("desktop");

  const [selectedElementId, setSelectedElementId] = useState<string | undefined>(undefined);

  const [deviceElements, setDeviceElements] = useState<DeviceElementsDict>(() => initialElements);
  const elements = deviceElements[tab];
  const elementIds = Object.keys(elements);
  const setElements = (fn: (prev: IFixedElementsDict) => IFixedElementsDict) => {
    return setDeviceElements(prev => ({
      ...prev,
      [tab]: fn(prev[tab]),
    }));
  };

  const addElement = (x: number, y: number) => {
    const id = `${Math.random()}`;
    setElements(addTextElementToElementsDict(id, x, y));
  };

  const moveElement = (id: string) => (x: number, y: number) => {
    setElements(moveElementInElementsDict(id, x, y));
  };

  const resizeElement = (id: string) => (h: number, w: number) => {
    setElements(resizeElementInElementsDict(id, h, w));
  };

  const editText = (id: string) => (text: string[]) => {
    setElements(editTextInElementsDict(id, text));
  };

  // const selectElement = (id: string) => setSelectedElementId(id);
  // const resetSelection = () => setSelectedElementId(undefined);

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
        <div onClick={() => setSelectedElementId(undefined)}>
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
                            resize={resizeElement(elementId)}
                            selected={selectedElementId === element.id}
                            selectElement={() => setSelectedElementId(element.id)}
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
        </div>
      )}
    />
  );
};
