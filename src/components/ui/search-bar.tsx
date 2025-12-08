import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '@/hooks/use-search';
import { SearchResults } from './search-results';
import { sanitizeSearchInput, searchRateLimiter } from '@/utils/sanitize';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "Buscar publicaciones, etiquetas...", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { results, isLoading } = useSearch(query);

  // Manejar clic fuera para cerrar resultados
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar teclas de navegación
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const sanitized = sanitizeSearchInput(raw);
    // Rate limit suave para prevenir abuso en cliente
    const allowed = searchRateLimiter.checkLimit('search', 60, 10000);
    if (!allowed) return;
    setQuery(sanitized);
    onSearch?.(sanitized);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() && results.length > 0) {
      // Navegar al primer resultado
      window.location.href = `/post/${results[0].post.id}`;
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsFocused(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-primary h-5 w-5 transition-all group-hover:text-cyber-secondary" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="w-full bg-cyber-card/50 border border-cyber-border rounded-lg pl-12 pr-10 py-3
                     text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-primary
                     focus:ring-1 focus:ring-cyber-primary/50 backdrop-blur-sm transition-all duration-300
                     hover:bg-cyber-card/70 group-hover:border-cyber-primary"
          />
          
          {/* Botón de limpiar */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-muted hover:text-cyber-text transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          <div className="absolute inset-0 rounded-lg bg-cyber-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
      </form>

      {/* Resultados de búsqueda */}
      <SearchResults
        results={results}
        isLoading={isLoading}
        isVisible={isFocused && query.length >= 2}
        onClose={() => setIsFocused(false)}
        query={query}
      />
    </div>
  );
}