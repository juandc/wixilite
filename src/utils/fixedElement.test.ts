import { describe, expect, it } from "vitest";
import {
  addTextElementToElementsDict,
  addImgElementToElementsDict,
  addRectangleElementToElementsDict,
  addElementToElementsDict,
  duplicateElementInElementsDict,
  deleteElementInElementsDict,
  moveElementInElementsDict,
  resizeElementInElementsDict,
  editTextPropsInElementsDict,
  editImgPropsInElementsDict,
  editRectanglePropsInElementsDict,
  editingTextDefaults,
  editingImgDefaults,
  editingRectangleDefaults,
} from "./fixedElement";
import type { IFixedElementEditingImg, IFixedElementEditingRectangle, IFixedElementEditingText, IFixedElementsDict } from "@/types";

describe("fixedElement utils", () => {
  const mockElementsDict: IFixedElementsDict = {
    "1": {
      id: "1",
      type: "fixed--editing-text",
      data: { ...editingTextDefaults, x: 10, y: 20 },
    },
    "2": {
      id: "2",
      type: "fixed--editing-img",
      data: { ...editingImgDefaults, x: 30, y: 40 },
    },
    "3": {
      id: "3",
      type: "fixed--editing-rectangle",
      data: { ...editingRectangleDefaults, x: 50, y: 60 },
    },
  };

  it("should add text element to elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newId = "new-text";
    const newElements = addTextElementToElementsDict(newId, 10, 20)(elements);
    expect(newElements[newId]).toEqual({
      id: newId,
      type: "fixed--editing-text",
      data: { ...editingTextDefaults, x: 10, y: 20 },
    });
  });

  it("should add image element to elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newId = "new-img";
    const newElements = addImgElementToElementsDict(newId, 10, 20)(elements);
    expect(newElements[newId]).toEqual({
      id: newId,
      type: "fixed--editing-img",
      data: { ...editingImgDefaults, x: 10, y: 20 },
    });
  });

  it("should add rectangle element to elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newId = "new-rectangle";
    const newElements = addRectangleElementToElementsDict(newId, 10, 20)(elements);
    expect(newElements[newId]).toEqual({
      id: newId,
      type: "fixed--editing-rectangle",
      data: { ...editingRectangleDefaults, x: 10, y: 20 },
    });
  });

  it("should add element to elements dict based on type", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const addElement = addElementToElementsDict("fixed--new-text");
    const newId = "new-text";
    const newElements = addElement(newId, 10, 20)(elements);
    expect(newElements[newId]).toEqual({
      id: newId,
      type: "fixed--editing-text",
      data: { ...editingTextDefaults, x: 10, y: 20 },
    });
  });

  it("should duplicate an element in elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newId = "id-duplicated";
    const newElements = duplicateElementInElementsDict("1", newId)(elements);
    expect(newElements[newId]).toEqual({
      id: newId,
      type: "fixed--editing-text",
      data: { ...editingTextDefaults, x: 50, y: 60 },
    });
  });

  it("should delete an element in elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newElements = deleteElementInElementsDict("1")(elements);
    expect(newElements["1"]).toBeUndefined();
  });

  it("should move an element in elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newElements = moveElementInElementsDict("1", 30, 40)(elements);
    expect(newElements["1"].data.x).toBe(30);
    expect(newElements["1"].data.y).toBe(40);
  });

  it("should resize an element in elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newElements = resizeElementInElementsDict("1", 50, 60)(elements);
    expect(newElements["1"].data.h).toBe(50);
    expect(newElements["1"].data.w).toBe(60);
  });

  it("should edit text props in elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newText = ["Updated Text"];
    const newElements = editTextPropsInElementsDict("1", { text: newText })(elements);
    expect((newElements["1"] as IFixedElementEditingText).data.text).toEqual(newText);
  });

  it("should edit image props in elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newUrl = "https://textiful.com/theme/dist/assets/img/logos/mailerlite-logo-white.png";
    const newElements = editImgPropsInElementsDict("2", { url: newUrl })(elements);
    expect((newElements["2"] as IFixedElementEditingImg).data.url).toBe(newUrl);
  });

  it("should edit rectangle props in elements dict", () => {
    const elements: IFixedElementsDict = structuredClone(mockElementsDict);
    const newBg = "#050505";
    const newElements = editRectanglePropsInElementsDict("3", { background: newBg })(elements);
    expect((newElements["3"] as IFixedElementEditingRectangle).data.background).toBe(newBg);
  });
});
