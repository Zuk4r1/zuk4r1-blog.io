import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Importar páginas
import { Index } from '@/pages/Index';
import { About } from '@/pages/About';
import { Content } from '@/pages/Content';
import { Tags } from '@/pages/Tags';
import { TagPosts } from '@/pages/TagPosts';
import { Post } from '@/pages/Post';
import { NotFound } from '@/pages/NotFound';

export function Routes() {
  return (
    <AnimatePresence mode="wait">
      <RouterRoutes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/content" element={<Content />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tags/:tagName" element={<TagPosts />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </AnimatePresence>
  );
}