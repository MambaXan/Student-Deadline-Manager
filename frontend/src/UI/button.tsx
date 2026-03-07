import * as React from "react";
import "../Styles/globals.scss";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "asChild"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(
          child.props.className,
          "button",
          `button--${variant}`,
          `button--${size}`,
          className
        ),
        ...props,
        ref,
      });
    }

    const Comp = asChild ? "div" : "button";

    return React.createElement(
      Comp,
      {
        ...props,
        ref,
        className: cn(
          "button",
          `button--${variant}`,
          `button--${size}`,
          className
        ),
        "data-slot": "button",
      },
      children
    );
  }
);

Button.displayName = "Button";
