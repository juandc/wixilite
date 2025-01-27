import {
  type FC,
  type PropsWithChildren,
  createContext,
  useState,
  useContext,
  CSSProperties,
} from "react";
import type { IPageInfo } from "@/types";

type ContextState = IPageInfo;

type ContextUpdaters = {
  editPageInfo: (info: Partial<Omit<IPageInfo, "id">>) => void;
};

const defaultPageInfo = {
  id: "default-page",
  name: "Untitled Landing",
  innerBackground: "#ffffff",
  outerBackground: "#222222",
};

export const PageInfoContext = createContext<ContextState & ContextUpdaters | undefined>(undefined);

export const PageInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pageInfo, setPageInfo] = useState<IPageInfo>(() => defaultPageInfo);

  const editPageInfo = (info: Partial<Omit<IPageInfo, "id">>) => {
    setPageInfo((prev) => ({ ...prev, ...info }));
  };

  return (
    <PageInfoContext.Provider value={{ ...pageInfo, editPageInfo }}>
      <div style={{ "--page-inner-bg": pageInfo.innerBackground, "--page-outer-bg": pageInfo.outerBackground } as CSSProperties}>
        {children}
      </div>
    </PageInfoContext.Provider>
  );
};

export const usePageInfo = () => {
  const context = useContext(PageInfoContext);
  if (!context) {
    throw new Error("usePageInfo must be used within a PageInfoProvider");
  }
  return context;
};
