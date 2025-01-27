import { useState } from "react";
import { FixedLayoutProvider } from "@/context/FixedLayoutContext";
import { FixedConfigBarContainer, FixedBoardContainer } from "@/containers/FixedLayoutContainer";
import { EditorLayout } from "./components";

type Layouts = "fixed" | "responsive";

export const App = () => {
  // const [pageInfo, setPageInfo] = useState({
  //   name: "info",
  //   innerBackground: "#fff",
  //   outerBackground: "#222",
  // });
  const [layout, setLayout] = useState<Layouts | undefined>(undefined);

  const [showConfigBar, setShowConfigBar] = useState<boolean>(false);
  const toggleConfigBar = () => setShowConfigBar(prev => !prev);

  const sharedLayoutProps = {
    showMobileConfigBar: showConfigBar,
    showMobileConfigBarToggle: true,
    onToggleConfigBar: toggleConfigBar,
  };

  if (layout === "fixed") {
    return (
      <FixedLayoutProvider>
        <EditorLayout
          {...sharedLayoutProps}
          configBar={<FixedConfigBarContainer />}
          board={<FixedBoardContainer />}
        />
      </FixedLayoutProvider>
    );
  }

  return (
    <EditorLayout
      {...sharedLayoutProps}
      configBar={null}
      board={(
        <div>
          <button onClick={() => setLayout("fixed")}>Fixed</button>
          <button onClick={() => setLayout("responsive")} disabled>Responsive (WIP)</button>
        </div>
      )}
    />
  );
};
