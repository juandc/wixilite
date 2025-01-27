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
  IFixedElementEditingRectangleProps,
  IFixedElementEditingTextProps,
  IFixedElementNew,
  IFixedElementsDict,
} from "@/types";
import {
  addElementToElementsDict,
  deleteElementInElementsDict,
  duplicateElementInElementsDict,
  editImgPropsInElementsDict,
  editingImgDefaults,
  editingRectangleDefaults,
  editingTextDefaults,
  editRectanglePropsInElementsDict,
  editTextPropsInElementsDict,
  moveElementInElementsDict,
  resizeElementInElementsDict,
} from "@/utils/fixedElement";

type DeviceElementsDict = Record<IDevices, IFixedElementsDict>;

const initialElements: DeviceElementsDict = {
  mobile: {
    "watermark": {
      id: "watermark",
      type: "fixed--editing-img",
      data: {
        ...editingImgDefaults,
        borderRadius: 12,
        x: 268,
        y: 4,
        w: 45,
        h: 45,
        opacity: 0.5,
      },
    },
    "title": {
      id: "title",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["JUANDC"],
        color: "#CA6AEC",
        fontSize: 21,
        x: 111,
        y: 90,
      },
    },
    "subtitle": {
      id: "subtitle",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["Un puente para conectar diseño, desarrollo y educación"],
        color: "#0E0319",
        fontSize: 14,
        textAlign: "center",
        x: 48,
        y: 142,
        w: 222,
        h: 20,
      },
    },
    "buttonbg": {
      id: "buttonbg",
      type: "fixed--editing-rectangle",
      data: {
        ...editingRectangleDefaults,
        borderRadius: 12,
        x: 80,
        y: 212,
        w: 145,
        h: 40,
      },
    },
    "buttontext": {
      id: "buttontext",
      type: "fixed--editing-text",
      data: {
        ...editingTextDefaults,
        text: ["Contáctame"],
        color: "#FFFFFF",
        x: 111,
        y: 220,
        w: 90,
        h: 16,
      },
    },
  },
  desktop: {},
};

type ContextState = {
  device: IDevices;
  elements: IFixedElementsDict;
  elementIds: string[];
  selectedElementId: string | undefined;
  selectedElement: IFixedElement | undefined;
};

type ContextUpdaters = {
  setMobileTab: () => void;
  setDesktopTab: () => void;
  setElements: (fn: (prev: IFixedElementsDict) => IFixedElementsDict) => void;
  setSelectedElementId: (id: string | undefined) => void;
  addElement: (type: IFixedElementNew["type"]) => (x: number, y: number) => void;
  duplicateElement: (id: string) => void;
  deleteElement: (id: string) => void;
  moveElement: (id: string) => (x: number, y: number) => void;
  resizeElement: (id: string) => (h: number, w: number) => void;
  editCommonElementData: (id: string) => (data: Partial<CommonElementData>) => void;
  editSelectedElementCommonData: (data: Partial<CommonElementData>) => void;
  editTextProps: (id: string) => (textProps: IFixedElementEditingTextProps) => void;
  editSelectedElementTextProps: (textProps: IFixedElementEditingTextProps) => void;
  editImgProps: (id: string) => (imgProps: IFixedElementEditingImgProps) => void;
  editSelectedElementImgProps: (imgProps: IFixedElementEditingImgProps) => void;
  editRectangleProps: (id: string) => (rectangleProps: IFixedElementEditingRectangleProps) => void;
  editSelectedElementRectangleProps: (rectangleProps: IFixedElementEditingRectangleProps) => void;
};

type ContextValue = {
  state: ContextState;
  updaters: ContextUpdaters;
};

export const FixedLayoutContext = createContext<ContextValue | undefined>(undefined);

export const FixedLayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [device, setDevice] = useState<IDevices>("mobile");
  const setMobileTab = () => setDevice("mobile");
  const setDesktopTab = () => setDevice("desktop");

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
  const isRectangleSelected = (selectedElement && selectedElement.type === "fixed--editing-rectangle") ?? false;

  const addElement = (type: IFixedElementNew["type"]) => (x: number, y: number) => {
    const id = `${Math.random()}`;
    setElements(addElementToElementsDict(type)(id, x, y));
    setSelectedElementId(id);
  };

  const duplicateElement = (id: string) => {
    const newId = `${Math.random()}`;
    setElements(duplicateElementInElementsDict(id, newId));
    setSelectedElementId(newId);
  };

  const deleteElement = (id: string) => {
    setElements(deleteElementInElementsDict(id));
  };

  const moveElement = (id: string) => (x: number, y: number) => {
    setElements(moveElementInElementsDict(id, x, y));
    setSelectedElementId(id);
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

  const editRectangleProps = (id: string) => (rectangleProps: IFixedElementEditingRectangleProps) => {
    setElements(editRectanglePropsInElementsDict(id, rectangleProps));
  };

  const editSelectedElementRectangleProps = (rectangleProps: IFixedElementEditingRectangleProps) => {
    if (selectedElementId && isRectangleSelected) {
      editRectangleProps(selectedElementId)(rectangleProps);
    }
  };

  const state = {
    device,
    elements,
    elementIds,
    selectedElementId,
    selectedElement,
    isTextSelected,
    isImgSelected,
  };

  const updaters = {
    setMobileTab,
    setDesktopTab,
    setElements,
    setSelectedElementId,
    addElement,
    duplicateElement,
    deleteElement,
    moveElement,
    resizeElement,
    editCommonElementData,
    editSelectedElementCommonData,
    editTextProps,
    editSelectedElementTextProps,
    editImgProps,
    editSelectedElementImgProps,
    editRectangleProps,
    editSelectedElementRectangleProps,
  };

  return (
    <FixedLayoutContext.Provider value={{ state, updaters }}>
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
