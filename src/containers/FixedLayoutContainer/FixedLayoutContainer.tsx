import { useShowConfigBar } from "@/context/ShowConfigBarContext";
import { FixedConfigBarContainer } from "./ConfigBar/FixedConfigBarContainer";
import { FixedBoardContainer } from "./Board/FixedBoardContainer";
import { EditorLayout } from "@/components";

export const FixedLayoutContainer = () => {
  const {
    isShowingConfigBar,
    toggleConfigBar,
  } = useShowConfigBar();

  return (
    <EditorLayout
      showMobileConfigBar={isShowingConfigBar}
      showMobileConfigBarToggle={true}
      onToggleConfigBar={toggleConfigBar}
      configBar={<FixedConfigBarContainer />}
      board={<FixedBoardContainer />}
    />
  );
};
