import type { IFixedElementsDict } from "@/types";

export const editingTextDefaults = {
  text: ["New Text"],
  x: 0,
  y: 0,
  h: 38,
  w: 140,
};

export const addTextElementToElementsDict = (id: string, x: number, y: number) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    return {
      ...elements,
      [id]: {
        id,
        type: "fixed--editing-text",
        data: {
          ...editingTextDefaults,
          x,
          y,
        },
      },
    };
  };
};

export const moveElementInElementsDict = (id: string, x: number, y: number) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    return {
      ...elements,
      [id]: {
        ...elements[id],
        data: {
          ...elements[id].data,
          x,
          y,
        },
      },
    };
  };
};

export const editTextInElementsDict = (id: string, text: string[]) => {
  return (elements: IFixedElementsDict): IFixedElementsDict => {
    return {
      ...elements,
      [id]: {
        ...elements[id],
        data: {
          ...elements[id].data,
          text,
        },
      },
    };
  };
};
