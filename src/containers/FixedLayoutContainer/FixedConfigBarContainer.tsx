import { type ChangeEventHandler, type FC } from "react";
import type { CommonElementData } from "@/types";
import { defaultImages } from "@/utils/fixedElement";
import { useFixedLayout } from "@/context/FixedLayoutContext";
import { useShowConfigBar } from "@/context/ShowConfigBarContext";
import { AddText } from "./AddText";
import { AddImg } from "./AddImg";
import { AddRectangle } from "./AddRectangle";
import {
  FixedAddDraggableElement,
  FixedConfigBar,
  FixedModule,
  FixedPropInput,
  FixedPropTextArea,
  FixedSecretInput,
  DuplicateIcon,
  DeleteIcon,
} from "@/components";
import { usePageInfo } from "@/context/PageInfoContext";

type CommonElementDataKeys = Array<keyof CommonElementData>;
const commonElementDataKeys: CommonElementDataKeys = ["h", "w", "x", "y", "opacity"];

export const FixedConfigBarContainer: FC = () => {
  const { name, editPageInfo } = usePageInfo();
  const {
    state: {
      selectedElement,
    },
    updaters: {
      addElement,
      duplicateElement,
      deleteElement,
      editSelectedElementCommonData,
      editSelectedElementImgProps,
      editSelectedElementTextProps,
      editSelectedElementRectangleProps,
    },
  } = useFixedLayout();

  const {
    hideConfigBar,
  } = useShowConfigBar();

  const isTextSelected = selectedElement && selectedElement.type === "fixed--editing-text";
  const isImgSelected = selectedElement && selectedElement.type === "fixed--editing-img";
  const isRectangleSelected = selectedElement && selectedElement.type === "fixed--editing-rectangle";

  let selectedCommonData: Array<[string, number]> = []; // TODO: only numbers?
  if (selectedElement) {
    selectedCommonData = Object.entries(selectedElement.data)
      .filter(([key]) => {
        return commonElementDataKeys.includes(key as keyof CommonElementData);
      }) as Array<[string, number]>; // TODO: come on, should be a better way
  }

  type TextAreaChangeHandler = ChangeEventHandler<HTMLTextAreaElement>;
  type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;

  const onNameChange: InputChangeHandler = (e) => {
    editPageInfo({ name: e.currentTarget.value ?? "" });
  };

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

  const onBackgroundChange: InputChangeHandler = (e) => {
    editSelectedElementRectangleProps({ background: e.target.value });
  };

  return (
    <FixedConfigBar>
      <FixedModule>
        <FixedSecretInput
          type="text"
          placeholder="Page name"
          value={name ?? ""}
          onChange={onNameChange}
        />
        <button>Copy JSON</button>
      </FixedModule>

      <FixedModule label="New elements">
        <div style={{ marginTop: "-.5rem", marginBottom: "-.5rem" }}>
          <FixedAddDraggableElement>
            <AddText />
            <button
              type="button"
              onClick={() => addElement("fixed--new-text")(0, 0)}
            >+</button>
          </FixedAddDraggableElement>

          <FixedAddDraggableElement>
            <AddImg />
            <button
              type="button"
              onClick={() => addElement("fixed--new-img")(0, 0)}
            >+</button>
          </FixedAddDraggableElement>

          <FixedAddDraggableElement>
            <AddRectangle />
            <button
              type="button"
              onClick={() => addElement("fixed--new-rectangle")(0, 0)}
            >+</button>
          </FixedAddDraggableElement>
        </div>
      </FixedModule>

      {selectedElement && (
        <FixedModule
          label="Element props"
          labelBtns={(
            <>
              <button onClick={onDuplicate}>
                <DuplicateIcon fill="white" />
              </button>
              <button onClick={onDelete}>
                <DeleteIcon fill="white" />
              </button>
            </>
          )}
        >
          {selectedCommonData?.map(prop => (
            <FixedPropInput
              type="number"
              id={prop[0]}
              placeholder={prop[0]}
              value={prop[1]}
              onChange={onCommonDataChange(prop[0])}
              min={0}
              max={prop[0] === "opacity" ? 1 : undefined}
              step={prop[0] === "opacity" ? 0.1 : 1}
            />
          ))}
        </FixedModule>
      )}


      {(selectedElement && isTextSelected) && (
        <FixedModule label="Text props">
          <FixedPropInput
            id="color"
            label="Color"
            type="color"
            value={selectedElement.data.color}
            onChange={onColorChange}
          />
          <FixedPropTextArea
            id="text"
            label="Text"
            value={selectedElement.data.text.join("\n")}
            onChange={onTextChange}
          />
        </FixedModule>
      )}

      {isImgSelected && (
        <FixedModule label="Image props">
          <FixedPropInput
            id="borderRadiusImg"
            label="Border Radius"
            type="number"
            value={selectedElement.data.borderRadius}
            onChange={e => editSelectedElementImgProps({
              borderRadius: Number(e.target.value),
            })}
          />
          <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            {defaultImages.map((img) => (
              <button
                key={img}
                onClick={() => editSelectedElementImgProps({ url: img })}
                style={{
                  border: (selectedElement.data.url === img
                    ? "2px solid lightgray"
                    : "none"
                  ),
                  width: "calc(50% - 1rem)",
                }}
              >
                <img src={img} width={50} height={50} />
              </button>
            ))}
          </div>
          <FixedSecretInput
            value={selectedElement.data.url}
            onChange={e => editSelectedElementImgProps({ url: e.target.value })}
          />
        </FixedModule>
      )}

      {isRectangleSelected && (
        <FixedModule label="Rectangle props">
          <FixedPropInput
            id="background"
            label="Background"
            type="color"
            value={selectedElement.data.background}
            onChange={onBackgroundChange}
          />

          <FixedPropInput
            id="borderRadiusRectangle"
            label="Border Radius"
            type="number"
            value={selectedElement.data.borderRadius}
            onChange={e => editSelectedElementRectangleProps({
              borderRadius: Number(e.target.value),
            })}
          />
        </FixedModule>
      )}
    </FixedConfigBar>
  );
};
