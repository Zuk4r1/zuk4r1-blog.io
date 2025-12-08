import { motion } from 'framer-motion';
import { useAllPosts } from '@/hooks/use-posts';
import { PostCard } from '@/components/ui/post-card';
import { parseDateLocal } from '@/lib/date';

export function Content() {
  const posts = useAllPosts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-cyber-secondary glow-text">Contenido</h1>
        <p className="text-cyber-muted mt-3">Todos los articulos publicados hasta la fecha</p>
      </div>

      {/* Posts Grid en dos columnas */}
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
            readTime={post.readTime || '8 min'}
            tags={post.tags}
            href={`/post/${post.id}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
