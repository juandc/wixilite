import { type FC } from "react";
import { useShowConfigBar } from "@/context/ShowConfigBarContext";
import { useFixedLayout } from "@/context/FixedLayoutContext";
import { FixedMobileBoard } from "./FixedMobileBoard";
import { EditingText } from "./EditingText";
import { EditingImg } from "./EditingImg";
import { EditingRectangle } from "./EditingRectangle";
import { DeviceTabs } from "@/components";

export const FixedBoardContainer: FC = () => {
  const {
    isShowingConfigBar,
    hideConfigBar,
  } = useShowConfigBar();
  const {
    state: {
      device,
      elements,
      elementIds,
      selectedElementId,
    },
    updaters: {
      setMobileTab,
      setDesktopTab,
      addElement,
      moveElement,
      setSelectedElementId,
      resizeElement,
      editTextProps,
    },
  } = useFixedLayout();

  const containerOnClick = () => {
    if (isShowingConfigBar) {
      hideConfigBar();
    } else {
      setSelectedElementId(undefined);
    }
  };

  return (
    <div onClick={containerOnClick}>
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
                if (element.type === "fixed--editing-rectangle") {
                  return (
                    <EditingRectangle
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
