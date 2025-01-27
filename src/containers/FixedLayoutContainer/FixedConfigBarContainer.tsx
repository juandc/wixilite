import { type ChangeEventHandler, type FC } from "react";
import type { CommonElementData } from "@/types";
import { defaultImages } from "@/utils/fixedElement";
import { useFixedLayout } from "@/context/FixedLayoutContext";
import { useShowConfigBar } from "@/context/ShowConfigBarContext";
import { AddText } from "@/containers/FixedLayoutContainer/AddText";
import { AddImg } from "@/containers/FixedLayoutContainer/AddImg";

type CommonElementDataKeys = Array<keyof CommonElementData>;
const commonElementDataKeys: CommonElementDataKeys = ["h", "w", "x", "y", "opacity"];

export const FixedConfigBarContainer: FC = () => {
  const {
    state: {
      selectedElement,
    },
    updaters: {
      duplicateElement,
      deleteElement,
      editSelectedElementImgProps,
      editSelectedElementTextProps,
      editSelectedElementCommonData,
    },
  } = useFixedLayout();

  const {
    hideConfigBar,
  } = useShowConfigBar();

  const isTextSelected = selectedElement && selectedElement.type === "fixed--editing-text";
  const isImgSelected = selectedElement && selectedElement.type === "fixed--editing-img";

  let selectedCommonData: Array<[string, number]> = []; // TODO: only numbers?
  if (selectedElement) {
    selectedCommonData = Object.entries(selectedElement.data)
      .filter(([key]) => {
        return commonElementDataKeys.includes(key as keyof CommonElementData);
      }) as Array<[string, number]>; // TODO: come on, should be a better way
  }

  type TextAreaChangeHandler = ChangeEventHandler<HTMLTextAreaElement>;
  type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;

  const onDuplicate = () => {
    if (selectedElement) {
      duplicateElement(selectedElement.id);
      hideConfigBar();
    }
  };

  const onDelete = () => {
    if (selectedElement) {
      deleteElement(selectedElement.id);
      hideConfigBar();
    }
  };

  const onCommonDataChange = (keyName: string): InputChangeHandler => {
    return (e) => {
      editSelectedElementCommonData({ [keyName]: Number(e.target.value) });
    };
  };

  const onTextChange: TextAreaChangeHandler = (e) => {
    editSelectedElementTextProps({ text: e.target.value.split("\n") })
  };

  const onColorChange: InputChangeHandler = (e) => {
    editSelectedElementTextProps({ color: e.target.value });
  };

  return (
    <>
      <input type="text" placeholder="Board name" />
      <button>Copy JSON</button>
      <AddText />
      <AddImg />

      {selectedElement && (
        <>
          <button onClick={onDuplicate}>
            Duplicate
          </button>
          <button onClick={onDelete}>
            Delete
          </button>
        </>
      )}

      {selectedCommonData?.map(prop => (
        <input
          key={prop[0]}
          type="number"
          placeholder={prop[0]}
          value={prop[1]}
          onChange={onCommonDataChange(prop[0])}
          min={0}
          max={prop[0] === "opacity" ? 1 : undefined}
          step={prop[0] === "opacity" ? 0.1 : 1}
        />
      ))}

      {(selectedElement && isTextSelected) && (
        <>
          <textarea
            value={selectedElement.data.text.join("\n")}
            onChange={onTextChange}
          />
          <input
            type="color"
            value={selectedElement.data.color}
            onChange={onColorChange}
          />
        </>
      )}

      {isImgSelected && (
        <>
          {defaultImages.map((img) => (
            <button
              key={img}
              onClick={() => editSelectedElementImgProps({
                url: img
              })}
            >
              <img src={img} width={50} height={50} />
            </button>
          ))}

          <input
            value={selectedElement.data.url}
            onChange={(e) => editSelectedElementImgProps({
              url: e.target.value,
            })
            }
          />

          <input
            type="number"
            value={selectedElement.data.borderRadius}
            onChange={(e) => editSelectedElementImgProps({
              borderRadius: Number(e.target.value),
            })}
          />
        </>
      )}
    </>
  );
};
