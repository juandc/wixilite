import { type FC } from "react";
import type { IDevices } from "@/types";
import "./DeviceTabs.css";

type Props = {
  selected: IDevices;
  setMobile: () => void;
  setDesktop: () => void;
};

export const DeviceTabs: FC<Props> = ({ selected, setMobile, setDesktop }) => {
  return (
    <div className="DeviceTabs">
      <button
        className={`${selected === "mobile" ? "active" : ""}`}
        onClick={setMobile}
        data-testid="mobile-tab"
      >Mobile</button>
      <button
        className={`${selected === "desktop" ? "active" : ""}`}
        onClick={setDesktop}
        data-testid="desktop-tab"
      >Desktop</button>
    </div>
  );
};