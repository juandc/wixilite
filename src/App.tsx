
import { useState } from "react";
import { FixedMobileBoard } from "@/containers/FixedMobileBoard";
import { AddText } from "@/containers/AddText";
import { EditingText } from "@/containers/EditingText";
import { EditorLayout } from "@/components";
import "./App.css";

type Layouts = "fixed" | "responsive";
type Tabs = "mobile" | "desktop";

export const App = () => {
  const [showConfigBar, setShowConfigBar] = useState<boolean>(false);
  const [layout, setLayout] = useState<Layouts | undefined>(undefined);
  const [tab, setTab] = useState<Tabs>("mobile");

  const setMobileTab = () => setTab("mobile");
  const setDesktopTab = () => setTab("desktop");

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
        <>
          {!layout && (
            <div>
              <button onClick={() => setLayout("fixed")}>Fixed</button>
              <button onClick={() => setLayout("responsive")} disabled>Responsive (WIP)</button>
            </div>
          )}

          {layout === "fixed" && (
            <div>
              Board area

              <div>
                <button onClick={setMobileTab}>Mobile</button>
                <button onClick={setDesktopTab}>Desktop</button>
              </div>

              {tab === "mobile" && (
                <div>
                  <FixedMobileBoard>
                    Board mobile
                    <EditingText />
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
        </>
      )}
    />
  );
};
