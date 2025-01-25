import { type FC } from "react";
import type { IDevices } from "@/types";
import "./DeviceTabs.css";

type Props = {
  selected: IDevices;
  setMobile: () => void;
  setDesktop: () => void;
};

export const DeviceTabs: FC<Props> = ({ setMobile, setDesktop }) => {
  return (
    <div className="DeviceTabs">
      <button onClick={setMobile}>Mobile</button>
      <button onClick={setDesktop}>Desktop</button>
    </div>
  );
};