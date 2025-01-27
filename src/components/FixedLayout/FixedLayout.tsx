import type { FC, InputHTMLAttributes, PropsWithChildren, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import "./FixedLayout.css";

export const FixedConfigBar: FC<PropsWithChildren> = ({ children }) => (
  <div className="FixedConfigBar">{children}</div>
);

type FixedModuleProps = PropsWithChildren<{
  label?: string;
  labelBtns?: ReactNode;
}>;

export const FixedModule: FC<FixedModuleProps> = ({
  children,
  label,
  labelBtns,
}) => (
  <div className="FixedModule">
    {(label || labelBtns) && (
      <div className="FixedModule-label">
        {label && <p>{label}</p>}
        {labelBtns && <div className="FixedModule-labelBtns">{labelBtns}</div>}
      </div>
    )}
    <div className="FixedModule-content">{children}</div>
  </div>
);

export const FixedAddDraggableElement: FC<PropsWithChildren> = ({ children }) => (
  <div className="FixedAddDraggableElement">{children}</div>
);

type FixedSecretInputProps = InputHTMLAttributes<HTMLInputElement>;

export const FixedSecretInput: FC<FixedSecretInputProps> = ({
  className,
  type,
  id,
  ...props
}) => {
  return (
    <div
      key={id}
      className={`FixedSecretInput FixedSecretInput--${type} ${className}`}
    >
      <input
        id={id}
        type={type}
        {...props}
      />
    </div>
  );
};

type FixedPropInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const FixedPropInput: FC<FixedPropInputProps> = ({
  className,
  type,
  id,
  label,
  ...props
}) => {
  const labelText = label ?? id;
  return (
    <div
      key={id}
      className={`FixedPropInput FixedPropInput--${type} ${className}`}
    >
      <label htmlFor={id}>{labelText}: </label>
      <input
        id={id}
        type={type}
        {...props}
      />
    </div>
  );
};

type FixedPropTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export const FixedPropTextArea: FC<FixedPropTextAreaProps> = ({
  className,
  id,
  label,
  ...props
}) => {
  const labelText = label ?? id;
  return (
    <div
      key={id}
      className={`FixedPropTextArea ${className}`}
    >
      <label htmlFor={id}>{labelText}: </label>
      <textarea
        id={id}
        {...props}
      />
    </div>
  );
};


type FixedSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export const FixedSelect: FC<FixedSelectProps> = ({
  className,
  id,
  label,
  ...props
}) => {
  const labelText = label ?? id;
  return (
    <div
      key={id}
      className={`FixedSelect ${className}`}
    >
      <label htmlFor={id}>{labelText}: </label>
      <select id={id} {...props} />
    </div>
  );
};
