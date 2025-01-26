import { useState } from "react";
import type { IDevices } from "@/types";
import { FixedLayoutProvider } from "@/context/FixedLayoutContext";
import { FixedLayoutContainer } from "@/containers/FixedLayoutContainer";

type Layouts = "fixed" | "responsive";

export const App = () => {
  const [layout, setLayout] = useState<Layouts | undefined>(undefined);

  const [showConfigBar, setShowConfigBar] = useState<boolean>(false);

  const openConfigBar = () => setShowConfigBar(true);
  const closeConfigBar = () => setShowConfigBar(false);
  const toggleConfigBar = () => setShowConfigBar(prev => !prev);

  const [tab, setTab] = useState<IDevices>("mobile");
  const setMobileTab = () => setTab("mobile");
  const setDesktopTab = () => setTab("desktop");

  if (layout === "fixed") {
    return (
      <FixedLayoutProvider device={tab}>
        <FixedLayoutContainer
          showConfigBar={showConfigBar}
          openConfigBar={openConfigBar}
          closeConfigBar={closeConfigBar}
          toggleConfigBar={toggleConfigBar}
          device={tab}
          setMobileTab={setMobileTab}
          setDesktopTab={setDesktopTab}
        />
      </FixedLayoutProvider>
    );
  }

  return (
    <div>
      <button onClick={() => setLayout("fixed")}>Fixed</button>
      <button onClick={() => setLayout("responsive")} disabled>Responsive (WIP)</button>
    </div>
  );
};
