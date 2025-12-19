// import * as React from "react";

// import { cn } from "./utils";

// function Card({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card"
//       className={cn(
//         "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-header"
//       className={cn(
//         "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <h4
//       data-slot="card-title"
//       className={cn("leading-none", className)}
//       {...props}
//     />
//   );
// }

// function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <p
//       data-slot="card-description"
//       className={cn("text-muted-foreground", className)}
//       {...props}
//     />
//   );
// }

// function CardAction({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-action"
//       className={cn(
//         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// function CardContent({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-content"
//       className={cn("px-6 [&:last-child]:pb-6", className)}
//       {...props}
//     />
//   );
// }

// function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-footer"
//       className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
//       {...props}
//     />
//   );
// }

// export {
//   Card,
//   CardHeader,
//   CardFooter,
//   CardTitle,
//   CardAction,
//   CardDescription,
//   CardContent,
// };

// components/ui/new/Card.tsx
// import * as React from "react";

// export type CardVariant = "default" | "outline" | "ghost" | "elevated";
// export type CardSize = "default" | "sm" | "lg";

// // Утилита для классов
// const cn = (...classes: (string | boolean | undefined)[]) => {
//   return classes.filter(Boolean).join(' ');
// };

// /* ========== Основные пропсы ========== */

// interface BaseCardProps {
//   className?: string;
//   children?: React.ReactNode;
// }

// interface CardProps extends BaseCardProps, React.HTMLAttributes<HTMLDivElement> {
//   variant?: CardVariant;
//   size?: CardSize;
// }

// /* ========== Card (основной) ========== */

// export const Card = React.forwardRef<HTMLDivElement, CardProps>(
//   ({ className = "", variant = "default", size = "default", ...props }, ref) => {
//     const cardClasses = cn(
//       "card",
//       variant !== "default" && `card-${variant}`,
//       size !== "default" && `card-${size}`,
//       className
//     );
    
//     return (
//       <div
//         ref={ref}
//         data-slot="card"
//         className={cardClasses}
//         {...props}
//       />
//     );
//   }
// );

// Card.displayName = "Card";

// /* ========== CardHeader ========== */

// export const CardHeader = React.forwardRef<HTMLDivElement, BaseCardProps>(
//   ({ className = "", ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         data-slot="card-header"
//         className={cn("card-header", className)}
//         {...props}
//       />
//     );
//   }
// );

// CardHeader.displayName = "CardHeader";

// /* ========== CardTitle ========== */

// export const CardTitle = React.forwardRef<HTMLHeadingElement, BaseCardProps>(
//   ({ className = "", ...props }, ref) => {
//     return (
//       <h4
//         ref={ref}
//         data-slot="card-title"
//         className={cn("card-title", className)}
//         {...props}
//       />
//     );
//   }
// );

// CardTitle.displayName = "CardTitle";

// /* ========== CardDescription ========== */

// export const CardDescription = React.forwardRef<HTMLParagraphElement, BaseCardProps>(
//   ({ className = "", ...props }, ref) => {
//     return (
//       <p
//         ref={ref}
//         data-slot="card-description"
//         className={cn("card-description", className)}
//         {...props}
//       />
//     );
//   }
// );

// CardDescription.displayName = "CardDescription";

// /* ========== CardAction ========== */

// export const CardAction = React.forwardRef<HTMLDivElement, BaseCardProps>(
//   ({ className = "", ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         data-slot="card-action"
//         className={cn("card-action", className)}
//         {...props}
//       />
//     );
//   }
// );

// CardAction.displayName = "CardAction";

// /* ========== CardContent ========== */

// export const CardContent = React.forwardRef<HTMLDivElement, BaseCardProps>(
//   ({ className = "", ...props }, ref) => {
//     return (
//       <div
//         ref={ref}
//         data-slot="card-content"
//         className={cn("card-content", className)}
//         {...props}
//       />
//     );
//   }
// );

// CardContent.displayName = "CardContent";

// /* ========== CardFooter ========== */

// export interface CardFooterProps extends BaseCardProps {
//   withBorder?: boolean;
// }

// export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
//   ({ className = "", withBorder = false, ...props }, ref) => {
//     const footerClasses = cn(
//       "card-footer",
//       withBorder && "border-t",
//       className
//     );
    
//     return (
//       <div
//         ref={ref}
//         data-slot="card-footer"
//         className={footerClasses}
//         {...props}
//       />
//     );
//   }
// );

// CardFooter.displayName = "CardFooter";

// /* ========== Экспорт всего ========== */

// export {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardAction,
//   CardContent,
//   CardFooter,
// };

// components/ui/new/Card.tsx (упрощенный)
import * as React from "react";

// Упрощенная версия без дополнительных пропсов
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Простые компоненты без лишних настроек
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`card ${className || ''}`} {...props} />
  )
);

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`card-header ${className || ''}`} {...props} />
  )
);

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4 ref={ref} className={`card-title ${className || ''}`} {...props} />
  )
);

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={`card-description ${className || ''}`} {...props} />
  )
);

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`card-content ${className || ''}`} {...props} />
  )
);

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`card-footer ${className || ''}`} {...props} />
  )
);