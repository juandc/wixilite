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
      >Mobile</button>
      <button
        className={`${selected === "desktop" ? "active" : ""}`}
        onClick={setDesktop}
      >Desktop</button>
    </div>
  );
};