
import { useState } from "react";
import "./App.css"

type Tabs = "mobile" | "desktop";

export const App = () => {
  const [tab, setTab] = useState<Tabs>("mobile");

  const setMobileTab = () => setTab("mobile");
  const setDesktopTab = () => setTab("desktop");

  return (
    <>
      <div>
        Config Tab
        <input type="text" placeholder="Board name" />
        <button>Copy JSON</button>
      </div>
      <div>
        Board area

        <div>
          <button onClick={setMobileTab}>Mobile</button>
          <button onClick={setDesktopTab}>Desktop</button>
        </div>

        {tab === "mobile" && (
          <div>
            Board mobile
          </div>
        )}

        {tab === "desktop" && (
          <div>
            Board desktop
          </div>
        )}
      </div>
    </>
  )
};
