import { toTimestampLocal } from '@/lib/date';

export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags: string[];
  readTime?: string;
}

export const allPosts: Post[] = [
  {
    id: "introduccion-hacking-etico",
    title: "Introducción al Hacking Ético",
    description: "Una guía completa para principiantes sobre hacking ético y ciberseguridad",
    date: "2025-11-01",
    published: true,
    tags: ["hacking", "seguridad", "principiantes"],
    readTime: "5 min"
  },
  {
    id: "analisis-malware",
    title: "Análisis de Malware Avanzado",
    description: "Técnicas y herramientas para el análisis de malware",
    date: "2025-11-02",
    published: true,
    tags: ["malware", "análisis", "seguridad"],
    readTime: "8 min"
  },
  {
    id: "pen-testing-web",
    title: "Pentesting de Aplicaciones Web",
    description: "Metodologías y mejores prácticas para el pentesting web",
    date: "2025-11-03",
    published: true,
    tags: ["pentesting", "web", "seguridad"],
    readTime: "10 min"
  }
];

export const publishedPosts = allPosts.filter(post => post.published);

export function getPostById(id: string): Post | undefined {
  return allPosts.find(post => post.id === id);
}

export function getAllPosts(): Post[] {
  return [...allPosts].sort((a, b) => 
    toTimestampLocal(b.date) - toTimestampLocal(a.date)
  );
}

export function getPublishedPosts(): Post[] {
  return [...publishedPosts].sort((a, b) => 
    toTimestampLocal(b.date) - toTimestampLocal(a.date)
  );
}

export function getPostsByTag(tag: string): Post[] {
  return allPosts.filter(post => 
    post.published && post.tags.includes(tag.toLowerCase())
  );
}
