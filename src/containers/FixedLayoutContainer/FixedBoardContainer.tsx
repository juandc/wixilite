import { type FC } from "react";
import { useFixedLayout } from "@/context/FixedLayoutContext";
import { FixedMobileBoard } from "@/containers/FixedMobileBoard";
import { EditingText } from "@/containers/EditingText";
import { EditingImg } from "@/containers/EditingImg";
import { DeviceTabs } from "@/components";

export const FixedBoardContainer: FC = () => {
  const {
    device,
    elements,
    elementIds,
    selectedElementId,
    setMobileTab,
    setDesktopTab,
    addElement,
    moveElement,
    setSelectedElementId,
    editTextProps,
    resizeElement,
  } = useFixedLayout();

  return (
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
  );
};
