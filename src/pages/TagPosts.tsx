import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { getPostsByTag, Post as PostType, subscribeToPosts } from '@/lib/posts';
import { sanitizeTag } from '@/utils/sanitize';
import { PostCard } from '@/components/ui/post-card';
import { parseDateLocal } from '@/lib/date';
import { ArrowLeft } from 'lucide-react';

export function TagPosts() {
  const { tagName } = useParams<{ tagName: string }>();
  const [posts, setPosts] = React.useState<PostType[]>([]);

  React.useEffect(() => {
    if (tagName) {
      const safeTag = sanitizeTag(tagName).toLowerCase();
      getPostsByTag(safeTag).then(setPosts);
    }
  }, [tagName]);

  // Suscribirse a cambios de posts en desarrollo (HMR) para reflejar altas/bajas
  React.useEffect(() => {
    let unsub: (() => void) | null = null;
    const metaWithHot = import.meta as ImportMeta & { hot?: { accept: (cb: (mod: unknown) => void) => void } };
    if (import.meta && metaWithHot.hot && tagName) {
      const safeTag = sanitizeTag(tagName).toLowerCase();
      unsub = subscribeToPosts((updated) => {
        setPosts(updated.filter((p) => p.published && p.tags.includes(safeTag)));
      });
    }
    return () => { if (unsub) unsub(); };
  }, [tagName]);

  if (!tagName) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Etiqueta no especificada.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/tags"
          className="inline-flex items-center gap-2 text-cyber-secondary hover:text-cyber-secondary/80 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a etiquetas
        </Link>
        
        <h1 className="text-4xl font-bold text-cyber-secondary mb-2">
          Publicaciones con etiqueta: <span className="text-cyber-secondary">{sanitizeTag(tagName)}</span>
        </h1>
        
        <p className="text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'publicación encontrada' : 'publicaciones encontradas'}
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
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
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">
            No se encontraron publicaciones con la etiqueta "{tagName}".
          </p>
          <Link
            to="/tags"
            className="inline-block px-6 py-3 bg-cyber-secondary text-black rounded-lg hover:bg-cyber-secondary/80 transition-colors"
          >
            Ver todas las etiquetas
          </Link>
        </div>
      )}
    </motion.div>
  );
}
