import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { usePageInfo } from "@/context/PageInfoContext";
import { useFixedLayout } from "@/context/FixedLayoutContext";
import { useShowConfigBar } from "@/context/ShowConfigBarContext";
import { FixedConfigBarContainer } from "./FixedConfigBarContainer";

vi.mock("@/context/PageInfoContext");
vi.mock("@/context/FixedLayoutContext");
vi.mock("@/context/ShowConfigBarContext");
vi.mock("react-dnd", () => ({
  useDrag: () => [{ isDragging: false }, vi.fn()],
  useDrop: () => [{ isOver: false }, vi.fn()],
}));

describe("FixedConfigBarContainer", () => {
  const mockPageInfo = {
    id: "1",
    name: "Test Page",
    innerBackground: "#ffffff",
    outerBackground: "#000000",
    editPageInfo: vi.fn(),
  };

  const mockFixedLayout = {
    state: {
      elements: [],
      selectedElement: null,
    },
    updaters: {
      addElement: vi.fn(() => vi.fn()),
      duplicateElement: vi.fn(),
      deleteElement: vi.fn(),
      editSelectedElementCommonData: vi.fn(),
      editSelectedElementImgProps: vi.fn(),
      editSelectedElementTextProps: vi.fn(),
      editSelectedElementRectangleProps: vi.fn(),
    },
  };

  const mockShowConfigBar = {
    hideConfigBar: vi.fn(),
  };

  beforeEach(() => {
    (usePageInfo as Mock).mockReturnValue(mockPageInfo);
    (useFixedLayout as Mock).mockReturnValue(mockFixedLayout);
    (useShowConfigBar as Mock).mockReturnValue(mockShowConfigBar);
  });

  it("renders FixedConfigBarContainer", () => {
    render(<FixedConfigBarContainer />);
    expect(screen.getByPlaceholderText("Page name")).toBeInTheDocument();
  });

  it("calls editPageInfo on name change", () => {
    render(<FixedConfigBarContainer />);
    const input = screen.getByPlaceholderText("Page name");
    fireEvent.change(input, { target: { value: "New Page Name" } });
    expect(mockPageInfo.editPageInfo).toHaveBeenCalledWith({ name: "New Page Name" });
  });

  it("calls addElement on add button clicks", () => {
    render(<FixedConfigBarContainer />);
    const addButtons = screen.getAllByText("+");
    const elementTypes = ["fixed--new-text", "fixed--new-img", "fixed--new-rectangle"];
    addButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(mockFixedLayout.updaters.addElement).toHaveBeenCalledWith(elementTypes[index]);
    });
  });

  it("calls exportData on export button click", () => {
    console.info = vi.fn();
    render(<FixedConfigBarContainer />);
    const exportButton = screen.getByText("Export JSON (console)");
    fireEvent.click(exportButton);
    expect(console.info).toHaveBeenCalledWith({
      id: "1",
      name: "Test Page",
      attrs: { innerBackground: "#ffffff", outerBackground: "#000000" },
      elements: [],
    });
  });
});