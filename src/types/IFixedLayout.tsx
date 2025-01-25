export type IFixedElementEditingText = {
  id: string;
  type: "fixed--editing-text";
  data: {
    x: number;
    y: number;
    text: string[];
  };
};

export type IFixedElementNewText = {
  type: "fixed--new-text";
};

export type IFixedElement = IFixedElementEditingText;
export type IDraggableFixedElement = IFixedElementEditingText | IFixedElementNewText;

export type IFixedElementsDict = Record<string, IFixedElement>;
