import type { FC, ReactNode } from "react";
import "./EditorLayout.css";

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
          >x</button>
        )}
        {configBar}
      </aside>

      <div className="EditorLayout_boardContainer">
        {(showMobileConfigBarToggle && !showMobileConfigBar) && (
          <button
            className="EditorLayout_toggleConfigBarBtn"
            onClick={onToggleConfigBar}
          >x</button>
        )}
        {board}
      </div>
    </main>
  );
};
