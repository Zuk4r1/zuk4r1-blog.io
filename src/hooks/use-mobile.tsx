import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar si el dispositivo es móvil
 * basado en el ancho de la pantalla.
 * @param breakpoint - Punto de quiebre en píxeles para considerar móvil (default: 768)
 * @returns boolean - true si es dispositivo móvil, false si no
 */
export function useMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Función para actualizar el estado basado en el ancho de la ventana
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Comprobar al montar el componente
    checkMobile();

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener('resize', checkMobile);

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

// Ejemplo de uso:
/*
function MiComponente() {
  const isMobile = useMobile();
  // O con un breakpoint personalizado:
  // const isMobile = useMobile(640);

  return (
    <div>
      {isMobile ? (
        <VistaMovil />
      ) : (
        <VistaEscritorio />
      )}
    </div>
  );
}
*/