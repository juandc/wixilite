
import { useState } from "react";
import type {
  CommonElementData,
  IDevices,
  IFixedElementEditingImgProps,
  IFixedElementEditingTextProps,
  IFixedElementNew,
  IFixedElementsDict,
} from "./types";
import { FixedMobileBoard } from "@/containers/FixedMobileBoard";
import { AddText } from "@/containers/AddText";
import { AddImg } from "@/containers/AddImg";
import { EditingText } from "@/containers/EditingText";
import { EditingImg } from "./containers/EditingImg";
import { DeviceTabs, EditorLayout } from "@/components";
import {
  defaultImages,
  editingImgDefaults,
  editingTextDefaults,
  addElementToElementsDict,
  moveElementInElementsDict,
  resizeElementInElementsDict,
  editTextPropsInElementsDict,
  editImgPropsInElementsDict,
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
    "3": {
      id: "3",
      type: "fixed--editing-img",
      data: {
        ...editingImgDefaults,
        x: 50,
        y: 250,
      },
    },
  },
  desktop: {},
};

const commonElementDataKeys: Array<keyof CommonElementData> = ["h", "w", "x", "y", "opacity"];

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

  const selectedElement = selectedElementId && elements[selectedElementId];
  const isTextSelected = selectedElement && selectedElement.type === "fixed--editing-text";
  const isImgSelected = selectedElement && selectedElement.type === "fixed--editing-img";

  const addElement = (type: IFixedElementNew["type"]) => (x: number, y: number) => {
    const id = `${Math.random()}`;
    setElements(addElementToElementsDict(type)(id, x, y));
  };

  const moveElement = (id: string) => (x: number, y: number) => {
    setElements(moveElementInElementsDict(id, x, y));
  };

  const resizeElement = (id: string) => (h: number, w: number) => {
    setElements(resizeElementInElementsDict(id, h, w));
  };

  const editCommonElementData = (id: string) => (data: Partial<CommonElementData>) => {
    const element = { ...elements[id] };
    element.data = { ...element.data, ...data };
    setElements((prev) => ({ ...prev, [id]: element }));
  };

  const editSelectedElementCommonData = (data: Partial<CommonElementData>) => {
    if (selectedElementId) {
      editCommonElementData(selectedElementId)(data);
    }
  };

  const editTextProps = (id: string) => (textProps: IFixedElementEditingTextProps) => {
    setElements(editTextPropsInElementsDict(id, textProps));
  };

  const editSelectedElementTextProps = (textProps: IFixedElementEditingTextProps) => {
    if (isTextSelected) {
      editTextProps(selectedElementId)(textProps);
    }
  };

  const editImgProps = (id: string) => (imgProps: IFixedElementEditingImgProps) => {
    setElements(editImgPropsInElementsDict(id, imgProps));
  };

  const editSelectedElementImgProps = (imgProps: IFixedElementEditingImgProps) => {
    if (isImgSelected) {
      editImgProps(selectedElementId)(imgProps);
    }
  };

  let selectedCommonData: Array<[string, number]> = []; // TODO: only numbers?

  if (selectedElement) {
    selectedCommonData = Object.entries(selectedElement.data)
      .filter(([key]) => {
        return commonElementDataKeys.includes(key as keyof CommonElementData);
      }) as Array<[string, number]>; // TODO: come on, should be a better way
  }

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
          <AddImg />

          {selectedCommonData?.map(prop => (
            <input
              key={prop[0]}
              type="number"
              placeholder={prop[0]}
              value={prop[1]}
              onChange={(e) => {
                editSelectedElementCommonData({
                  [prop[0]]: Number(e.target.value)
                });
              }}
              min={0}
              max={prop[0] === "opacity" ? 1 : undefined}
              step={prop[0] === "opacity" ? 0.1 : 1}
            />
          ))}

          {isTextSelected && (
            <>
              <textarea
                value={selectedElement.data.text.join("\n")}
                onChange={(e) => editSelectedElementTextProps({ text: e.target.value.split("\n") })}
              />
              <input
                type="color"
                value={selectedElement.data.color}
                onChange={(e) => editSelectedElementTextProps({ color: e.target.value })}
              />
            </>
          )}

          {isImgSelected && (
            <>
              {defaultImages.map((img) => (
                <button onClick={() => editSelectedElementImgProps({ url: img })}>
                  <img src={img} width={50} height={50} />
                </button>
              ))}

              <input
                value={selectedElement.data.url}
                onChange={(e) => editSelectedElementImgProps({ url: e.target.value })}
              />

              <input
                type="number"
                value={selectedElement.data.borderRadius}
                onChange={(e) => editSelectedElementImgProps({ borderRadius: Number(e.target.value) })}
              />
            </>
          )}
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
                    isItemSelected={!!selectedElementId?.length}
                  >
                    {elementIds.map((elementId) => {
                      const element = { ...elements[elementId] };
                      if (element.type === "fixed--editing-text") {
                        return (
                          <EditingText
                            key={element.id}
                            {...element}
                            editText={text => editTextProps(elementId)({ text })}
                            resize={resizeElement(elementId)}
                            selected={selectedElementId === element.id}
                            selectElement={() => setSelectedElementId(element.id)}
                          />
                        );
                      }
                      if (element.type === "fixed--editing-img") {
                        return (
                          <EditingImg
                            key={element.id}
                            {...element}
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
