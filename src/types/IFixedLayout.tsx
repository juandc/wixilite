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
  id: string;
  type: "fixed--new-text";
  data: {
    x: number;
    y: number;
    text: string[];
  };
};

export type IFixedElement = IFixedElementEditingText | IFixedElementNewText;

export type IFixedElementsDict = Record<string, IFixedElement>;
