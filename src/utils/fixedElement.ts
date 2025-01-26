import type {
  IFixedElement,
  IFixedElementEditingImg,
  IFixedElementEditingImgData,
  IFixedElementEditingText,
  IFixedElementEditingTextData,
  IFixedElementNew,
  IFixedElementsDict,
} from "@/types";

export const editingTextDefaults: IFixedElementEditingTextData = {
  text: ["New Text"],
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

export const addElementToElementsDict = (type: IFixedElementNew["type"]) => (id: string, x: number, y: number) => {
  if (type === "fixed--new-text") {
    return addTextElementToElementsDict(id, x, y);
  } else if (type === "fixed--new-img") {
    return addImgElementToElementsDict(id, x, y);
  }
  return (elements: IFixedElementsDict): IFixedElementsDict => elements;
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


export const editTextInElementsDict = (id: string, text: string[]) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    if (elements[id].type === "fixed--editing-text") {
      const element: IFixedElementEditingText = { ...elements[id] };
      element.data.text = text;
      return { ...elements, [id]: element };
    }
    return elements;
  };
};
