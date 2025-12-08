import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPublishedPosts, getPostsByTag, subscribeToPosts, Post as PostType } from '@/lib/posts';
import { PostCard } from '@/components/ui/post-card';
import { parseDateLocal } from '@/lib/date';

interface TagCount {
  name: string;
  count: number;
}

export function Tags() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [tagCounts, setTagCounts] = useState<TagCount[]>([]);

  useEffect(() => {
    const computeCounts = (publishedPosts: PostType[]) => {
      const map = new Map<string, number>();
      publishedPosts.forEach((post) => {
        (post.tags || []).forEach((tag: string) => {
          const key = (tag || '').toLowerCase().trim();
          if (!key) return;
          map.set(key, (map.get(key) || 0) + 1);
        });
      });
      const counts: TagCount[] = Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
      setTagCounts(counts);
    };

    let unsub: (() => void) | null = null;
    getPublishedPosts().then(computeCounts);
    const metaWithHot = import.meta as ImportMeta & { hot?: { accept: (cb: (mod: unknown) => void) => void } };
    if (import.meta && metaWithHot.hot) {
      unsub = subscribeToPosts((updated) => computeCounts(updated.filter((p) => p.published)));
    }
    return () => { if (unsub) unsub(); };
  }, []);

  useEffect(() => {
    if (selectedTag) {
      getPostsByTag(selectedTag).then(setFilteredPosts);
    } else {
      setFilteredPosts([]);
    }
  }, [selectedTag]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-cyber-secondary mb-4">Etiquetas</h1>
        <p className="text-cyber-muted text-lg">Explora artículos por etiqueta</p>
      </div>

      {/* Tags Grid */}
      <div className="bg-cyber-card/30 border border-cyber-border rounded-lg p-8">
        <div className="flex flex-wrap gap-4 items-center">
          {tagCounts.map((tag) => (
            <motion.div
              key={tag.name}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setSelectedTag(tag.name)}
                className="inline-block px-4 py-2 rounded-full border-2 border-cyber-secondary 
                         text-cyber-secondary hover:bg-cyber-secondary hover:text-cyber-bg 
                         transition-all duration-300 text-sm font-medium"
              >
                {tag.name} ({tag.count})
              </button>
            </motion.div>
          ))}
        </div>

        {tagCounts.length === 0 && (
          <p className="text-center text-cyber-muted mt-8">
            No hay etiquetas disponibles.
          </p>
        )}
      </div>

      {/* Filtered Posts Section */}
      {selectedTag && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyber-secondary">
              Publicaciones con "{selectedTag}"
            </h2>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-sm text-cyber-secondary hover:underline"
            >
              Limpiar filtro
            </button>
          </div>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  date={parseDateLocal(post.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                  readTime={post.readTime || '5 min'}
                  tags={post.tags}
                  href={`/post/${post.id}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-cyber-muted">No hay publicaciones para esta etiqueta.</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
