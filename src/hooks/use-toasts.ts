import { toast } from 'sonner';

interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  important?: boolean;
}

interface UseToasts {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  loading: (message: string, options?: ToastOptions) => void;
  dismiss: (toastId: string) => void;
}

const defaultOptions: ToastOptions = {
  duration: 5000,
  position: 'top-right',
  important: false,
};

/**
 * Hook personalizado para mostrar notificaciones toast
 * utilizando la biblioteca Sonner.
 * @returns Objeto con métodos para mostrar diferentes tipos de toasts
 */
export const useToasts = (): UseToasts => {
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' | 'loading',
    options?: ToastOptions
  ) => {
    const finalOptions = { ...defaultOptions, ...options };

    switch (type) {
      case 'success':
        toast.success(message, finalOptions);
        break;
      case 'error':
        toast.error(message, finalOptions);
        break;
      case 'warning':
        toast(message, {
          ...finalOptions,
          className: 'toast-warning',
        });
        break;
      case 'info':
        toast.info(message, finalOptions);
        break;
      case 'loading':
        toast.loading(message, finalOptions);
        break;
    }
  };

  return {
    success: (message: string, options?: ToastOptions) => 
      showToast(message, 'success', options),
    error: (message: string, options?: ToastOptions) => 
      showToast(message, 'error', options),
    warning: (message: string, options?: ToastOptions) => 
      showToast(message, 'warning', options),
    info: (message: string, options?: ToastOptions) => 
      showToast(message, 'info', options),
    loading: (message: string, options?: ToastOptions) => 
      showToast(message, 'loading', options),
    dismiss: toast.dismiss,
  };
};

// Ejemplo de uso:
/*
function MiComponente() {
  const toast = useToasts();

  const handleClick = () => {
    toast.success('¡Operación exitosa!');
    toast.error('Algo salió mal', { duration: 3000 });
    toast.warning('Advertencia importante', { important: true });
    toast.info('Información útil');
    
    const loadingId = toast.loading('Cargando...');
    // Más tarde:
    toast.dismiss(loadingId);
  };

  return <button onClick={handleClick}>Mostrar Toasts</button>;
}
*/