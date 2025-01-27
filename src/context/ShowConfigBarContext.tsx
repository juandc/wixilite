import {
  type PropsWithChildren,
  type FC,
  createContext,
  useState,
  useContext,
} from "react";

type ContextState = {
  isShowingConfigBar: boolean;
};

type ContextUpdaters = {
  toggleConfigBar: () => void;
  showConfigBar: () => void;
  hideConfigBar: () => void;
};

export const ShowConfigBarContext = createContext<ContextState & ContextUpdaters | undefined>(undefined);

export const ShowConfigBarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isShowingConfigBar, setIsShowingConfigBar] = useState<boolean>(false);
  const toggleConfigBar = () => setIsShowingConfigBar(prev => !prev);
  const showConfigBar = () => setIsShowingConfigBar(true);
  const hideConfigBar = () => setIsShowingConfigBar(false);

  const state = {
    isShowingConfigBar,
  };

  const updaters = {
    toggleConfigBar,
    showConfigBar,
    hideConfigBar,
  };

  return (
    <ShowConfigBarContext.Provider value={{ ...state, ...updaters }}>
      {children}
    </ShowConfigBarContext.Provider>
  );
};

export const useShowConfigBar = () => {
  const context = useContext(ShowConfigBarContext);
  if (!context) {
    throw new Error("useShowConfigBar must be used within a ShowConfigBarProvider");
  }
  return context;
};
