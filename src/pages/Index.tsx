import { motion } from 'framer-motion';
import { usePublishedPosts } from '@/hooks/use-posts';
import { PostCard } from '@/components/ui/post-card';
import { parseDateLocal } from '@/lib/date';

export function Index() {
  const posts = usePublishedPosts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Publicaciones recientes: mostrar 6 más recientes */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-8">Publicaciones recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 6).map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              date={parseDateLocal(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
              readTime={post.readTime ?? ''}
              tags={post.tags}
              href={`/post/${post.id}`}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
