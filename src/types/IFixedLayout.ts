export type CommonElementData = {
  x: number;
  y: number;
  h: number;
  w: number;
  opacity: number;
  // ...
};


export type IFixedElementEditingTextData = {
  text: string[];
  color: string;
  fontSize: number;
  textAlign: CanvasTextAlign;
} & CommonElementData;

export type IFixedElementEditingTextProps = Partial<
  Omit<IFixedElementEditingTextData, keyof CommonElementData>
>;

export type IFixedElementEditingText = {
  id: string;
  type: "fixed--editing-text";
  data: IFixedElementEditingTextData;
};

export type IFixedElementNewText = {
  type: "fixed--new-text";
};


export type IFixedElementEditingImgData = {
  url: string;
  borderRadius: number;
} & CommonElementData;

export type IFixedElementEditingImgProps = Partial<
  Omit<IFixedElementEditingImgData, keyof CommonElementData>
>;

export type IFixedElementEditingImg = {
  id: string;
  type: "fixed--editing-img";
  data: IFixedElementEditingImgData;
};

export type IFixedElementNewImg = {
  type: "fixed--new-img";
};


export type IFixedElementEditingRectangleData = {
  background: string;
  borderRadius: number;
} & CommonElementData;

export type IFixedElementEditingRectangleProps = Partial<
  Omit<IFixedElementEditingRectangleData, keyof CommonElementData>
>;

export type IFixedElementEditingRectangle = {
  id: string;
  type: "fixed--editing-rectangle";
  data: IFixedElementEditingRectangleData;
};

export type IFixedElementNewRectangle = {
  type: "fixed--new-rectangle";
};


export type IFixedElement = IFixedElementEditingText | IFixedElementEditingImg | IFixedElementEditingRectangle;
export type IFixedElementNew = IFixedElementNewText | IFixedElementNewImg | IFixedElementNewRectangle;
export type IDraggableFixedElement = IFixedElement | IFixedElementNew;

export type IFixedElementsDict = Record<string, IFixedElement>;
