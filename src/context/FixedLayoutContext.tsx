import {
  type PropsWithChildren,
  type FC,
  createContext,
  useState,
  useContext,
} from "react";
import type {
  CommonElementData,
  IDevices,
  IFixedElement,
  IFixedElementEditingImgProps,
  IFixedElementEditingTextProps,
  IFixedElementNew,
  IFixedElementsDict,
} from "@/types";
import { addElementToElementsDict, editImgPropsInElementsDict, editingImgDefaults, editingTextDefaults, editTextPropsInElementsDict, moveElementInElementsDict, resizeElementInElementsDict } from "@/utils/fixedElement";

type DeviceElementsDict = Record<IDevices, IFixedElementsDict>;

const initialElements: DeviceElementsDict = {
  mobile: {
    "1": {
      id: "1",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["Hello World"],
      },
    },
    "2": {
      id: "2",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["Hello World 2"],
        x: 100,
        y: 100,
      },
    },
    "3": {
      id: "3",
      type: "fixed--editing-img",
      data: {
        ...editingImgDefaults,
        x: 50,
        y: 250,
      },
    },
  },
  desktop: {},
};

type ContextState = {
  elements: IFixedElementsDict;
  elementIds: string[];
  selectedElementId: string | undefined;
  selectedElement: IFixedElement | undefined;
  setElements: (fn: (prev: IFixedElementsDict) => IFixedElementsDict) => void;
  setSelectedElementId: (id: string | undefined) => void;
  addElement: (type: IFixedElementNew["type"]) => (x: number, y: number) => void;
  moveElement: (id: string) => (x: number, y: number) => void;
  resizeElement: (id: string) => (h: number, w: number) => void;
  editCommonElementData: (id: string) => (data: Partial<CommonElementData>) => void;
  editSelectedElementCommonData: (data: Partial<CommonElementData>) => void;
  editTextProps: (id: string) => (textProps: IFixedElementEditingTextProps) => void;
  editSelectedElementTextProps: (textProps: IFixedElementEditingTextProps) => void;
  editImgProps: (id: string) => (imgProps: IFixedElementEditingImgProps) => void;
  editSelectedElementImgProps: (imgProps: IFixedElementEditingImgProps) => void;
};

export const FixedLayoutContext = createContext<ContextState | undefined>(undefined);

type Props = PropsWithChildren<{
  device: IDevices;
}>;

export const FixedLayoutProvider: FC<Props> = ({ children, device }) => {
  const [deviceElements, setDeviceElements] = useState<DeviceElementsDict>(() => initialElements);
  const elements = deviceElements[device];
  const elementIds = Object.keys(elements);
  const setElements = (fn: (prev: IFixedElementsDict) => IFixedElementsDict) => {
    return setDeviceElements(prev => ({
      ...prev,
      [device]: fn(prev[device]),
    }));
  };

  const [selectedElementId, setSelectedElementId] = useState<string | undefined>(undefined);

  const selectedElement = selectedElementId ? elements[selectedElementId] : undefined;
  const isTextSelected = (selectedElement && selectedElement.type === "fixed--editing-text") ?? false;
  const isImgSelected = (selectedElement && selectedElement.type === "fixed--editing-img") ?? false;

  const addElement = (type: IFixedElementNew["type"]) => (x: number, y: number) => {
    const id = `${Math.random()}`;
    setElements(addElementToElementsDict(type)(id, x, y));
  };

  const moveElement = (id: string) => (x: number, y: number) => {
    setElements(moveElementInElementsDict(id, x, y));
  };

  const resizeElement = (id: string) => (h: number, w: number) => {
    setElements(resizeElementInElementsDict(id, h, w));
  };

  const editCommonElementData = (id: string) => (data: Partial<CommonElementData>) => {
    const element = { ...elements[id] };
    element.data = { ...element.data, ...data };
    setElements((prev) => ({ ...prev, [id]: element }));
  };

  const editSelectedElementCommonData = (data: Partial<CommonElementData>) => {
    if (selectedElementId) {
      editCommonElementData(selectedElementId)(data);
    }
  };

  const editTextProps = (id: string) => (textProps: IFixedElementEditingTextProps) => {
    setElements(editTextPropsInElementsDict(id, textProps));
  };

  const editSelectedElementTextProps = (textProps: IFixedElementEditingTextProps) => {
    if (selectedElementId && isTextSelected) {
      editTextProps(selectedElementId)(textProps);
    }
  };

  const editImgProps = (id: string) => (imgProps: IFixedElementEditingImgProps) => {
    setElements(editImgPropsInElementsDict(id, imgProps));
  };

  const editSelectedElementImgProps = (imgProps: IFixedElementEditingImgProps) => {
    if (selectedElementId && isImgSelected) {
      editImgProps(selectedElementId)(imgProps);
    }
  };

  const states = {
    elements,
    elementIds,
    selectedElementId,
    selectedElement,
    isTextSelected,
    isImgSelected,
  };

  const updaters = {
    setElements,
    setSelectedElementId,
    addElement,
    moveElement,
    resizeElement,
    editCommonElementData,
    editSelectedElementCommonData,
    editTextProps,
    editSelectedElementTextProps,
    editImgProps,
    editSelectedElementImgProps,
  };

  return (
    <FixedLayoutContext.Provider value={{ ...states, ...updaters }}>
      {children}
    </FixedLayoutContext.Provider>
  );
};

export const useFixedLayout = () => {
  const context = useContext(FixedLayoutContext);
  if (!context) {
    throw new Error("useFixedLayout must be used within a FixedLayoutProvider");
  }
  return context;
};
