// utils.ts - специально для ваших переписанных компонентов
export function cn(...classes: (string | boolean | undefined)[]) {
    // Просто фильтруем и объединяем - достаточно для чистых компонентов
    return classes
      .filter(c => c && typeof c === 'string')
      .join(' ')
      .trim();
  }

//   import { clsx, type ClassValue } from "clsx";
//   import { twMerge } from "tailwind-merge";
  
//   export function cn(...inputs: ClassValue[]) {
//     return twMerge(clsx(inputs));
//   }