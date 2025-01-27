import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useFixedLayout } from "@/context/FixedLayoutContext";
import { useShowConfigBar } from "@/context/ShowConfigBarContext";
import { FixedBoardContainer } from "./FixedBoardContainer";
import { editingImgDefaults, editingRectangleDefaults, editingTextDefaults } from "@/utils/fixedElement";

vi.mock("@/context/FixedLayoutContext");
vi.mock("@/context/ShowConfigBarContext");
vi.mock("@/utils/isTouchDevice", () => ({
  isTouchDevice: () => false,
}));
vi.mock("react-dnd", () => ({
  useDrag: () => [{ isDragging: false }, vi.fn()],
  useDrop: () => [{ isOver: false }, vi.fn()],
}));

describe("FixedBoardContainer", () => {
  const mockFixedLayout = {
    state: {
      device: "mobile",
      elements: {
        "1": {
          id: "1",
          type: "fixed--editing-text",
          data: {
            ...editingTextDefaults,
            text: ["Sample Text"],
          }
        },
        "2": {
          id: "2",
          type: "fixed--editing-img",
          data: {
            ...editingImgDefaults,
            url: "https://textiful.com/theme/dist/assets/img/logos/mailerlite-logo-white.png",
          }
        },
        "3": {
          id: "3",
          type: "fixed--editing-rectangle",
          data: {
            ...editingRectangleDefaults,
          }
        },
      },
      elementIds: ["1", "2", "3"],
      selectedElementId: null,
    },
    updaters: {
      setMobileTab: vi.fn(),
      setDesktopTab: vi.fn(),
      addElement: vi.fn(),
      moveElement: vi.fn(),
      setSelectedElementId: vi.fn(),
      resizeElement: vi.fn(() => vi.fn()),
      editTextProps: vi.fn(() => vi.fn()),
    },
  };

  const mockShowConfigBar = {
    isShowingConfigBar: false,
    hideConfigBar: vi.fn(),
  };

  beforeEach(() => {
    (useFixedLayout as Mock).mockReturnValue(mockFixedLayout);
    (useShowConfigBar as Mock).mockReturnValue(mockShowConfigBar);
  });

  it("renders FixedBoardContainer", () => {
    render(<FixedBoardContainer />);
    expect(screen.getByTestId("fixed-mobile-board")).toBeInTheDocument();
  });

  it("calls hideConfigBar on container click when config bar is showing", () => {
    mockShowConfigBar.isShowingConfigBar = true;
    render(<FixedBoardContainer />);
    fireEvent.click(screen.getByTestId("fixed-mobile-board"));
    expect(mockShowConfigBar.hideConfigBar).toHaveBeenCalled();
  });

  it("calls setSelectedElementId with undefined on container click when config bar is not showing", () => {
    mockShowConfigBar.isShowingConfigBar = false;
    render(<FixedBoardContainer />);
    fireEvent.click(screen.getByTestId("fixed-mobile-board"));
    expect(mockFixedLayout.updaters.setSelectedElementId).toHaveBeenCalledWith(undefined);
  });

  it("renders elements based on type", () => {
    render(<FixedBoardContainer />);
    expect(screen.getByTestId("editing-text")).toBeInTheDocument();
    expect(screen.getByTestId("editing-img")).toBeInTheDocument();
    expect(screen.getByTestId("editing-rectangle")).toBeInTheDocument();
  });
});
