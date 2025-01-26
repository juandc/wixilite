import {
  type MouseEventHandler,
  useEffect,
  useState,
} from "react";

type Props = {
  selected: boolean;
  h: number;
  w: number;
  resize: (h: number, w: number) => void;
};

export const useMousePos = ({
  selected,
  h,
  w,
  resize,
}: Props) => {
  const [mousePos, setMousePos] = useState({ active: false, x: "", y: "" });

  const resizeFrame = (e: MouseEvent) => {
    const { active, x, y } = mousePos;
    if (active) {
      const xDiff = Math.abs(+x - e.clientX);
      const yDiff = Math.abs(+y - e.clientY);
      const newW = +x > e.clientX ? w - xDiff : w + xDiff;
      const newH = +y > e.clientY ? h - yDiff : h + yDiff;

      setMousePos({ ...mousePos, x: `${e.clientX}`, y: `${e.clientY}` });
      resize(newH, newW);
    }
  };

  const stopResize = () => {
    console.log("stopResize");
    setMousePos({ ...mousePos, active: false });
  };

  const startResize: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("startResize");
    e.preventDefault();
    e.stopPropagation();
    setMousePos({
      active: true,
      x: `${e.clientX}`,
      y: `${e.clientY}`,
    });
  };

  useEffect(() => {
    if (selected && mousePos.active) {
      const parent = document.getElementById("fixed-mobile-board") as HTMLDivElement;
      parent.addEventListener("mousemove", resizeFrame);
      parent.addEventListener("mouseup", stopResize);
      parent.addEventListener("mouseleave", stopResize);
      return () => {
        parent.removeEventListener("mousemove", resizeFrame);
        parent.removeEventListener("mouseup", stopResize);
        parent.removeEventListener("mouseleave", stopResize);
      };
    }
  }, [selected, mousePos, h, w]);

  return {
    startResize,
    stopResize,
  };
};
