import { useState, useEffect, useMemo } from 'react';
import { getPublishedPosts, subscribeToPosts, Post } from '@/lib/posts';

export interface SearchResult {
  post: Post;
  relevance: number;
  matchedFields: string[];
}

export function useSearch(query: string, minQueryLength = 2) {
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  // Cargar todos los posts publicados y suscribirse a cambios (HMR)
  useEffect(() => {
    let unsub: (() => void) | null = null;

    async function loadPosts() {
      try {
        const posts = await getPublishedPosts();
        setAllPosts(posts);
      } catch (error) {
        console.error('Error al cargar posts para búsqueda:', error);
      }
    }
    loadPosts();

    const metaWithHot = import.meta as ImportMeta & { hot?: { accept: (cb: (mod: unknown) => void) => void } };
    if (import.meta && metaWithHot.hot) {
      unsub = subscribeToPosts((updated: Post[]) => {
        setAllPosts(updated.filter((p) => p.published));
      });
    }

    return () => { if (unsub) unsub(); };
  }, []);

  // Función de búsqueda mejorada
  const searchResults = useMemo(() => {
    if (!query || query.length < minQueryLength) {
      return [];
    }

    setIsLoading(true);
    
    const searchTerm = query.toLowerCase().trim();
    const searchResults: SearchResult[] = [];

    allPosts.forEach((post) => {
      let relevance = 0;
      const matchedFields: string[] = [];

      // Búsqueda en título (mayor relevancia)
      const titleLower = post.title.toLowerCase();
      if (titleLower.includes(searchTerm)) {
        relevance += 10;
        matchedFields.push('título');
        // Bonus si el título empieza con el término
        if (titleLower.startsWith(searchTerm)) {
          relevance += 5;
        }
      }

      // Búsqueda en etiquetas (alta relevancia)
      post.tags.forEach((tag) => {
        const tagLower = tag.toLowerCase();
        if (tagLower.includes(searchTerm)) {
          relevance += 8;
          if (!matchedFields.includes('etiquetas')) {
            matchedFields.push('etiquetas');
          }
          // Bonus si la etiqueta empieza con el término
          if (tagLower.startsWith(searchTerm)) {
            relevance += 3;
          }
        }
      });

      // Búsqueda en descripción (media relevancia)
      const descriptionLower = post.description.toLowerCase();
      if (descriptionLower.includes(searchTerm)) {
        relevance += 6;
        matchedFields.push('descripción');
      }

      // Búsqueda en fecha (formato YYYY-MM-DD)
      if (post.date.includes(searchTerm)) {
        relevance += 4;
        matchedFields.push('fecha');
      }

      // Búsqueda en contenido (baja relevancia)
      if (post.content) {
        const contentLower = post.content.toLowerCase();
        if (contentLower.includes(searchTerm)) {
          relevance += 2;
          matchedFields.push('contenido');
        }
      }

      // Si hay coincidencias, agregar a resultados
      if (relevance > 0) {
        searchResults.push({
          post,
          relevance,
          matchedFields
        });
      }
    });

    // Ordenar por relevancia (descendente)
    searchResults.sort((a, b) => b.relevance - a.relevance);

    setIsLoading(false);
    return searchResults;
  }, [query, allPosts, minQueryLength]);

  return {
    results: searchResults,
    isLoading,
    hasResults: searchResults.length > 0,
    totalResults: searchResults.length
  };
}
