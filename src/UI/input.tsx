import * as React from "react";

export type InputSize = "default" | "sm" | "lg";
export type InputVariant = "default" | "outline" | "ghost";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  variant?: InputVariant;
  isTextarea?: boolean;
}

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      className = "",
      type = "text",
      size = "default",
      variant = "default",
      isTextarea = false,
      ...props
    },
    ref
  ) => {
    const inputClasses = cn(
      "input",
      size !== "default" && `input-${size}`,
      variant !== "default" && `input-${variant}`,
      isTextarea && "input-textarea",
      className
    );

    if (isTextarea) {
      const textareaProps =
        props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;

      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          data-slot="input"
          className={inputClasses}
          {...textareaProps}
        />
      );
    }

    return (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type={type}
        data-slot="input"
        className={inputClasses}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
