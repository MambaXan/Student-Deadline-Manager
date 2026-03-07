import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
}

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const Badge: React.FC<BadgeProps> = ({ 
  className = "",
  variant = "default",
  asChild = false,
  children,
  ...props 
}) => {
  
  const badgeClass = cn(
    "badge",
    `badge-${variant}`,
    className
  );
  
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: cn(child.props.className, badgeClass),
      ...props
    });
  }
  
  return (
    <span 
      className={badgeClass}
      {...props}
    >
      {children}
    </span>
  );
};