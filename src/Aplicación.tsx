import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar, SidebarOverlay } from '@/components/ui/sidebar';
import { SearchBar } from '@/components/ui/search-bar';
import { Routes } from '@/routes';
import { Menu } from 'lucide-react';

// Cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function Aplicación() {
  const handleSearch = (query: string) => {
    console.log('Buscando:', query);
  };
  const [open, setOpen] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="min-h-screen bg-cyber-background text-cyber-text">
            {/* Header con Logo y Búsqueda (adaptable a móviles) */}
            <header className="fixed top-0 md:left-64 left-0 right-0 z-50 bg-cyber-accent/95 backdrop-blur-sm border-b border-cyber-border">
              <div className="w-full px-3 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <button className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-cyber-border bg-cyber-card/60 text-cyber-text" onClick={() => setOpen(true)} aria-label="Abrir menú">
                    <Menu className="h-5 w-5 text-cyber-primary" />
                  </button>
                  <h1 className="text-cyber-primary text-2xl sm:text-3xl md:text-4xl font-extrabold font-cyber glow-text tracking-widest uppercase leading-none">Cyber-Blog</h1>
                </div>
                <SearchBar onSearch={handleSearch} />
              </div>
            </header>

            {/* Layout Principal */}
            <div className="flex pt-20">
              {/* Sidebar (oculto en móviles) */}
              <Sidebar />

              {/* Contenido Principal */}
              <main className="flex-1 px-6 py-8 ml-0 md:ml-64">
                <Routes />
              </main>
            </div>
            {open && <SidebarOverlay onClose={() => setOpen(false)} />}
          </div>
          <Toaster position="top-right" theme="dark" />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
