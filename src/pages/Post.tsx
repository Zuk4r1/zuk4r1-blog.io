import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { getPostById, Post as PostType } from '@/lib/posts';
import { NotFound } from './NotFound';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Calendar, Clock } from 'lucide-react';
import { isValidUrl } from '@/utils/sanitize';
import { parseDateLocal } from '@/lib/date';

export function Post() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = React.useState<PostType | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && id.length <= 200;
      if (!isValid) {
        setPost(null);
        setLoading(false);
        return;
      }
      getPostById(id).then((foundPost) => {
        setPost(foundPost ?? null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyber-primary mb-6">
          {post.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-cyber-text/80">
            <Calendar className="h-4 w-4 text-cyber-primary" />
            <time>
              {parseDateLocal(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 text-cyber-primary" />
            <span>{post.readTime || '8 min'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full border border-cyber-primary/40 bg-cyber-primary/10 text-cyber-primary shadow-[0_0_12px_rgba(0,255,159,0.12)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-invert max-w-none markdown-body">
        <p className="text-lg text-muted-foreground mb-6">
          {post.description}
        </p>
        {post.content && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeSanitize, {
              ...defaultSchema,
              tagNames: [
                ...(defaultSchema.tagNames || []),
                'h1','h2','h3','h4','h5','h6','p','pre','code','span','blockquote','ul','ol','li','table','thead','tbody','tr','th','td','hr'
              ],
              attributes: {
                ...(defaultSchema.attributes || {}),
                a: ['href','target','rel'],
                img: ['src','alt','title'],
                code: ['className'],
                span: ['className']
              }
            }]]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match?.[1] || 'plaintext'}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>{children}</code>
                );
              },
              a({ href, children, ...props }) {
                const hrefStr = href as string | undefined;
                const safeHref = hrefStr && isValidUrl(hrefStr) ? hrefStr : undefined;
                return (
                  <a href={safeHref} target={safeHref ? '_blank' : undefined} rel={safeHref ? 'noopener noreferrer' : undefined} {...props}>
                    {children}
                  </a>
                );
              },
              img({ src, alt }) {
                return <img src={src as string} alt={(alt as string) || ''} className="rounded-lg border border-cyber-border" />;
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-16 pt-8 border-t border-border">
        <div className="flex justify-between">
          <button
            className="px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            onClick={() => window.history.back()}
          >
            ← Volver
          </button>
        </div>
      </nav>
    </motion.article>
  );
}
