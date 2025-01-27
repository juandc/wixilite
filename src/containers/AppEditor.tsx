import { useState } from "react";
import { FixedLayoutProvider } from "@/context/FixedLayoutContext";
import { ShowConfigBarProvider } from "@/context/ShowConfigBarContext";
import { EditorLayout } from "@/components";
import { FixedLayoutContainer } from "./FixedLayoutContainer/FixedLayoutContainer";

type Layouts = "fixed" | "responsive";

export const AppEditor = () => {
  // const [pageInfo, setPageInfo] = useState({
  //   name: "info",
  //   innerBackground: "#fff",
  //   outerBackground: "#222",
  // });
  const [layout, setLayout] = useState<Layouts | undefined>(undefined);

  if (layout === "fixed") {
    return (
      <FixedLayoutProvider>
        <ShowConfigBarProvider>
          <FixedLayoutContainer />
        </ShowConfigBarProvider>
      </FixedLayoutProvider>
    );
  }

  return (
    <EditorLayout
      showMobileConfigBarToggle={false}
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
