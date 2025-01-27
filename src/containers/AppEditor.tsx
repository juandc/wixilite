import { useState } from "react";
import { PageInfoProvider } from "@/context/PageInfoContext";
import { FixedLayoutProvider } from "@/context/FixedLayoutContext";
import { ShowConfigBarProvider } from "@/context/ShowConfigBarContext";
import { EditorLayout } from "@/components";
import { FixedLayoutContainer } from "./FixedLayoutContainer/FixedLayoutContainer";

type Layouts = "fixed" | "fluid";

export const AppEditor = () => {
  const [layout, setLayout] = useState<Layouts | undefined>("fixed");

  return (
    <PageInfoProvider>
      {layout === "fixed" && (
        <FixedLayoutProvider>
          <ShowConfigBarProvider>
            <FixedLayoutContainer  />
          </ShowConfigBarProvider>
        </FixedLayoutProvider>
      )}

      {!layout && (
        <EditorLayout
          showMobileConfigBarToggle={false}
          configBar={null}
          board={(
            <div>
              <button onClick={() => setLayout("fixed")}>
                Fixed Layout
              </button>
              <button onClick={() => setLayout("fluid")} disabled>
                Fluid (soon)
              </button>
            </div>
          )}
        />
      )}
    </PageInfoProvider>
  );
};
