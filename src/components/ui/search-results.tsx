import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchResult } from '@/hooks/use-search';
import { Calendar, Clock, Tag, FileText } from 'lucide-react';
import { parseDateLocal } from '@/lib/date';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  isVisible: boolean;
  onClose: () => void;
  query: string;
}

export function SearchResults({ results, isLoading, isVisible, onClose, query }: SearchResultsProps) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-cyber-card/95 backdrop-blur-sm 
                   border border-cyber-border rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto"
      >
        {/* Header de resultados */}
        <div className="p-4 border-b border-cyber-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-cyber-primary">Resultados para "{query}"</h3>
          </div>
        </div>

        {/* Contenido de resultados */}
        <div className="p-2">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-primary"></div>
              <span className="ml-2 text-cyber-text">Buscando...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center p-8">
              <FileText className="h-12 w-12 text-cyber-muted mx-auto mb-2" />
              <p className="text-cyber-muted">No se encontraron resultados</p>
              <p className="text-xs text-cyber-muted/70 mt-1">
                Prueba con títulos, etiquetas o fechas
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((result, index) => (
                <motion.div
                  key={result.post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/post/${result.post.id}`}
                    onClick={onClose}
                    className="block p-3 rounded-lg hover:bg-cyber-primary/10 transition-all duration-200 group"
                  >
                    {/* Título con highlight */}
                    <h4 className="font-medium text-cyber-text group-hover:text-cyber-primary transition-colors mb-2">
                      {result.post.title}
                    </h4>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-cyber-muted mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{parseDateLocal(result.post.date).toLocaleDateString('es-ES')}</span>
                      </div>
                      {result.post.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{result.post.readTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Descripción */}
                    <p className="text-sm text-cyber-text/80 line-clamp-2 mb-2">
                      {result.post.description}
                    </p>

                    {/* Etiquetas y campos coincidentes */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Campos coincidentes */}
                      {result.matchedFields.length > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-cyber-primary/70">Coincide en:</span>
                          {result.matchedFields.map((field) => (
                            <span
                              key={field}
                              className="px-2 py-0.5 text-xs rounded-full bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/30"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Etiquetas del post */}
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-cyber-muted" />
                        {result.post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded-full bg-cyber-secondary/20 text-cyber-secondary border border-cyber-secondary/30"
                          >
                            {tag}
                          </span>
                        ))}
                        {result.post.tags.length > 2 && (
                          <span className="text-xs text-cyber-muted">+{result.post.tags.length - 2}</span>
                        )}
                      </div>
                    </div>

                    {/* Relevancia (opcional, para debugging) */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="text-xs text-cyber-muted/50 mt-1">
                        Relevancia: {result.relevance}
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con acciones adicionales */}
        {results.length > 0 && (
          <div className="p-3 border-t border-cyber-border/50 text-center">
            <p className="text-xs text-cyber-muted">
              {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
