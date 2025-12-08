import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilidad para combinar clases de Tailwind de manera segura
 * usando clsx para la combinación condicional y tailwind-merge
 * para resolver conflictos de clases.
 * 
 * @param inputs - Array de clases CSS o objetos de condiciones
 * @returns String con las clases combinadas y optimizadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Ejemplo de uso:
/*
const MyComponent = ({ isActive, className }) => {
  return (
    <div
      className={cn(
        "base-class",
        isActive && "active-class",
        className
      )}
    >
      Contenido
    </div>
  );
};
*/