import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  href: string;
}

export function PostCard({ title, description, date, readTime, tags, href }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-lg border border-cyber-border bg-cyber-card/80 backdrop-blur-sm p-6 
                 hover:border-cyber-primary transition-all duration-300"
    >
      <Link to={href} className="block">
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/0 via-cyber-primary/5 to-cyber-primary/0 
                       opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 transition-all duration-500 pointer-events-none" />
        
        <h2 className="text-2xl font-cyber text-cyber-primary group-hover:text-cyber-secondary 
                     transition-colors mb-3 glow-text">
          {title}
        </h2>
        <p className="text-cyber-text/80 mb-4 line-clamp-2">{description}</p>
        
        {/* Meta información */}
        <div className="flex items-center gap-4 text-sm text-cyber-muted mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cyber-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyber-primary" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Etiquetas */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-cyber-primary/10 text-cyber-primary border border-cyber-border
                       hover:bg-cyber-primary/20 hover:border-cyber-primary transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
