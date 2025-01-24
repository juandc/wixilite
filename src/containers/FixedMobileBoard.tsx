import { type PropsWithChildren } from "react";
import { useDrop, type XYCoord } from "react-dnd";
import { dndTypes } from "@/constants/dnd";

export const FixedMobileBoard = ({ children }: PropsWithChildren) => {
  const [, drop] = useDrop(
    () => ({
      accept: [dndTypes.ADD_TEXT, dndTypes.EDITING_IMAGE],
      drop(item: unknown, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        console.log("Dropped", item, monitor, delta);
      },
    }),
    [],
  )

  return (
    <div ref={drop} style={{ border: "1px solid white", width: "320px", minHeight: "100px", margin: "0 auto" }}>
      {children}
    </div>
  );
};
