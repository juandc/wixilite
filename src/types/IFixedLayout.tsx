export type IFixedElementEditingTextData = {
  text: string[];
  x: number;
  y: number;
  h: number;
  w: number;
  // opacity: number;
  // ...
};

export type IFixedElementEditingText = {
  id: string;
  type: "fixed--editing-text";
  data: IFixedElementEditingTextData;
};

export type IFixedElementNewText = {
  type: "fixed--new-text";
};

export type IFixedElement = IFixedElementEditingText;
export type IDraggableFixedElement = IFixedElementEditingText | IFixedElementNewText;

export type IFixedElementsDict = Record<string, IFixedElement>;
