import { type ChangeEventHandler, type FC } from "react";
import type { IDevices, CommonElementData } from "@/types";
import { useFixedLayout } from "@/context/FixedLayoutContext";
import { FixedMobileBoard } from "@/containers/FixedMobileBoard";
import { AddText } from "@/containers/AddText";
import { AddImg } from "@/containers/AddImg";
import { EditingText } from "@/containers/EditingText";
import { EditingImg } from "@/containers/EditingImg";
import { DeviceTabs, EditorLayout } from "@/components";
import { defaultImages } from "@/utils/fixedElement";

const commonElementDataKeys: Array<keyof CommonElementData> = ["h", "w", "x", "y", "opacity"];

type Props = {
  showConfigBar: boolean;
  openConfigBar: () => void;
  closeConfigBar: () => void;
  toggleConfigBar: () => void;
  device: IDevices;
  setMobileTab: () => void;
  setDesktopTab: () => void;
};

export const FixedLayoutContainer: FC<Props> = ({
  showConfigBar,
  // openConfigBar,
  // closeConfigBar,
  toggleConfigBar,
  device,
  setMobileTab,
  setDesktopTab,
}) => {
  const {
    elements,
    elementIds,
    selectedElementId,
    selectedElement,
    addElement,
    moveElement,
    setSelectedElementId,
    editTextProps,
    resizeElement,
    editSelectedElementCommonData,
    editSelectedElementTextProps,
    editSelectedElementImgProps,
  } = useFixedLayout();

  const isTextSelected = selectedElement && selectedElement.type === "fixed--editing-text";
  const isImgSelected = selectedElement && selectedElement.type === "fixed--editing-img";

  let selectedCommonData: Array<[string, number]> = []; // TODO: only numbers?
  if (selectedElement) {
    selectedCommonData = Object.entries(selectedElement.data)
      .filter(([key]) => {
        return commonElementDataKeys.includes(key as keyof CommonElementData);
      }) as Array<[string, number]>; // TODO: come on, should be a better way
  }

  type TextAreaChangeHandler = ChangeEventHandler<HTMLTextAreaElement>;
  type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;

  const onCommonDataChange = (keyName: string): InputChangeHandler => {
    return (e) => {
      editSelectedElementCommonData({ [keyName]: Number(e.target.value) });
    };
  };

  const onTextChange: TextAreaChangeHandler = (e) => {
    editSelectedElementTextProps({ text: e.target.value.split("\n") })
  };

  const onColorChange: InputChangeHandler = (e) => {
    editSelectedElementTextProps({ color: e.target.value });
  };

  return (
    <EditorLayout
      showMobileConfigBar={showConfigBar}
      showMobileConfigBarToggle
      onToggleConfigBar={toggleConfigBar}
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
              onChange={onCommonDataChange(prop[0])}
              min={0}
              max={prop[0] === "opacity" ? 1 : undefined}
              step={prop[0] === "opacity" ? 0.1 : 1}
            />
          ))}

          {(selectedElement && isTextSelected) && (
            <>
              <textarea
                value={selectedElement.data.text.join("\n")}
                onChange={onTextChange}
              />
              <input
                type="color"
                value={selectedElement.data.color}
                onChange={onColorChange}
              />
            </>
          )}

          {isImgSelected && (
            <>
              {defaultImages.map((img) => (
                <button
                  key={img}
                  onClick={() => editSelectedElementImgProps({
                    url: img
                  })}
                >
                  <img src={img} width={50} height={50} />
                </button>
              ))}

              <input
                value={selectedElement.data.url}
                onChange={(e) => editSelectedElementImgProps({
                  url: e.target.value,
                })
                }
              />

              <input
                type="number"
                value={selectedElement.data.borderRadius}
                onChange={(e) => editSelectedElementImgProps({
                  borderRadius: Number(e.target.value),
                })}
              />
            </>
          )}
        </>
      )}
      board={(
        <div onClick={() => setSelectedElementId(undefined)}>
          <div>
            <DeviceTabs
              selected={device}
              setMobile={setMobileTab}
              setDesktop={setDesktopTab}
            />

            {device === "mobile" && (
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

            {device === "desktop" && (
              <div>
                Board desktop
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};
