import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeviceTabs } from "./DeviceTabs";

describe("DeviceTabs", () => {
  const mobileTabId = "mobile-tab";
  const desktopTabId = "desktop-tab";

  it("should render mobile and desktop buttons", () => {
    render(
      <DeviceTabs
        selected="mobile"
        setMobile={() => {}}
        setDesktop={() => {}}
      />
    );

    expect(screen.getByTestId(mobileTabId)).toBeInTheDocument();
    expect(screen.getByTestId(desktopTabId)).toBeInTheDocument();
  });

  it("should call setMobile when mobile button is clicked", () => {
    const setMobile = vi.fn();
    render(
      <DeviceTabs
        selected="desktop"
        setMobile={setMobile}
        setDesktop={() => {}}
      />
    );

    fireEvent.click(screen.getByTestId(mobileTabId));
    expect(setMobile).toHaveBeenCalled();
  });

  it("should call setDesktop when desktop button is clicked", () => {
    const setDesktop = vi.fn();
    render(
      <DeviceTabs
        selected="mobile"
        setMobile={() => {}}
        setDesktop={setDesktop}
      />
    );

    fireEvent.click(screen.getByTestId(desktopTabId));
    expect(setDesktop).toHaveBeenCalled();
  });

  it("should apply active class to mobile button when selected is mobile", () => {
    render(
      <DeviceTabs
        selected="mobile"
        setMobile={() => {}}
        setDesktop={() => {}}
      />
    );

    expect(screen.getByTestId(mobileTabId)).toHaveClass("active");
    expect(screen.getByTestId(desktopTabId)).not.toHaveClass("active");
  });

  it("should apply active class to desktop button when selected is desktop", () => {
    render(
      <DeviceTabs
        selected="desktop"
        setMobile={() => {}}
        setDesktop={() => {}}
      />
    );

    expect(screen.getByTestId(desktopTabId)).toHaveClass("active");
    expect(screen.getByTestId(mobileTabId)).not.toHaveClass("active");
  });
});
