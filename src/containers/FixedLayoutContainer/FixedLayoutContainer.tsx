import { useShowConfigBar } from "@/context/ShowConfigBarContext";
import { EditorLayout } from "@/components";
import { FixedConfigBarContainer } from "./FixedConfigBarContainer";
import { FixedBoardContainer } from "./FixedBoardContainer";

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
