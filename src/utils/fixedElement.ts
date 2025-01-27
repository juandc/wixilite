import type {
  IFixedElement,
  IFixedElementEditingImg,
  IFixedElementEditingImgData,
  IFixedElementEditingImgProps,
  IFixedElementEditingText,
  IFixedElementEditingTextData,
  IFixedElementEditingTextProps,
  IFixedElementEditingRectangleData,
  IFixedElementEditingRectangleProps,
  IFixedElementEditingRectangle,
  IFixedElementNew,
  IFixedElementsDict,
} from "@/types";

export const editingTextDefaults: IFixedElementEditingTextData = {
  text: ["New Text"],
  color: "#000000",
  fontSize: 16,
  textAlign: "left",
  x: 0,
  y: 0,
  h: 38,
  w: 140,
  opacity: 1,
};

export const defaultImages = [
  "https://media.trustradius.com/product-logos/co/Co/QJG9V44K8MIF.PNG",
  "https://ik.imagekit.io/debounce/wp-content/uploads/2019/06/mailerlite-square.png",
  "https://pbs.twimg.com/profile_images/1528762374597005313/eIxvv2Sx_400x400.jpg",
  "https://www.minimaldashboard.com/images/integration/mailerlite.png",
  // "https://textiful.com/theme/dist/assets/img/logos/mailerlite-logo-white.png",
];

export const editingImgDefaults: IFixedElementEditingImgData = {
  url: defaultImages[Math.floor(Math.random() * defaultImages.length)],
  borderRadius: 0,
  x: 0,
  y: 0,
  h: 140,
  w: 140,
  opacity: 1,
};

export const editingRectangleDefaults: IFixedElementEditingRectangleData = {
  background: "#25c26a",
  borderRadius: 0,
  x: 0,
  y: 0,
  h: 140,
  w: 140,
  opacity: 1,
};


export const addTextElementToElementsDict = (id: string, x: number, y: number) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    const element: IFixedElementEditingText = {
      id,
      type: "fixed--editing-text",
      data: { ...editingTextDefaults, x, y },
    };
    return { ...elements, [id]: element };
  };
};

export const addImgElementToElementsDict = (id: string, x: number, y: number) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    const element: IFixedElementEditingImg = {
      id,
      type: "fixed--editing-img",
      data: { ...editingImgDefaults, x, y },
    };
    return { ...elements, [id]: element };
  };
};

export const addRectangleElementToElementsDict = (id: string, x: number, y: number) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    const element: IFixedElementEditingRectangle = {
      id,
      type: "fixed--editing-rectangle",
      data: { ...editingRectangleDefaults, x, y },
    };
    return { ...elements, [id]: element };
  };
};

export const addElementToElementsDict = (type: IFixedElementNew["type"]) => (id: string, x: number, y: number) => {
  if (type === "fixed--new-text") {
    return addTextElementToElementsDict(id, x, y);
  } else if (type === "fixed--new-img") {
    return addImgElementToElementsDict(id, x, y);
  } else if (type === "fixed--new-rectangle") {
    return addRectangleElementToElementsDict(id, x, y);
  }
  return (elements: IFixedElementsDict): IFixedElementsDict => elements;
};

export const duplicateElementInElementsDict = (id: string, newId: string) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    const element: IFixedElement = structuredClone(elements[id]);
    element.id = newId;
    element.data.x += 40;
    element.data.y += 40;
    return { ...elements, [newId]: element };
  };
};

export const deleteElementInElementsDict = (id: string) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    const newElements = { ...elements };
    delete newElements[id];
    return newElements;
  };
};


export const moveElementInElementsDict = (id: string, x: number, y: number) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    const element: IFixedElement = { ...elements[id] };
    element.data.x = x;
    element.data.y = y;
    return { ...elements, [id]: element };
  };
};

export const resizeElementInElementsDict = (id: string, h: number, w: number) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    const element: IFixedElement = { ...elements[id] };
    element.data.h = h;
    element.data.w = w;
    return { ...elements, [id]: element };
  };
};


export const editTextPropsInElementsDict = (id: string, textProps: IFixedElementEditingTextProps) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    if (elements[id].type === "fixed--editing-text") {
      const element: IFixedElementEditingText = { ...elements[id] };
      element.data = { ...element.data, ...textProps };
      return { ...elements, [id]: element };
    }
    return elements;
  };
};


export const editImgPropsInElementsDict = (id: string, imgProps: IFixedElementEditingImgProps) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    if (elements[id].type === "fixed--editing-img") {
      const element: IFixedElementEditingImg = { ...elements[id] };
      element.data = { ...element.data, ...imgProps };
      return { ...elements, [id]: element };
    }
    return elements;
  };
}


export const editRectanglePropsInElementsDict = (id: string, imgProps: IFixedElementEditingRectangleProps) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    if (elements[id].type === "fixed--editing-rectangle") {
      const element: IFixedElementEditingRectangle = { ...elements[id] };
      element.data = { ...element.data, ...imgProps };
      return { ...elements, [id]: element };
    }
    return elements;
  };
}
