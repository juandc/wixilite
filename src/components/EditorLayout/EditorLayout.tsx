import type { FC, ReactNode } from "react";
import "./EditorLayout.css";
import { MenuIcon } from "../icons/Menu";

type Props = {
  configBar: ReactNode;
  board: ReactNode;
  showMobileConfigBar?: boolean;
  showMobileConfigBarToggle?: boolean;
  onToggleConfigBar?: () => void;
};

export const EditorLayout: FC<Props> = ({
  configBar,
  board,
  showMobileConfigBar = false,
  showMobileConfigBarToggle = false,
  onToggleConfigBar = () => {},
}) => {
  return (
    <main className={`
      EditorLayout
      ${showMobileConfigBar ? "EditorLayout__showMobileConfigBar" : ""}
    `}>
      <aside className="EditorLayout_configBarContainer">
        {(showMobileConfigBarToggle && showMobileConfigBar) && (
          <button
            className="EditorLayout_toggleConfigBarBtn"
            onClick={onToggleConfigBar}
          >
            <MenuIcon fill="white" />
          </button>
        )}
        {configBar}
      </aside>

      <div className="EditorLayout_boardContainer">
        {(showMobileConfigBarToggle && !showMobileConfigBar) && (
          <button
            className="EditorLayout_toggleConfigBarBtn"
            onClick={onToggleConfigBar}
          >
            <MenuIcon fill="white" />
          </button>
        )}
        {board}
      </div>
    </main>
  );
};
