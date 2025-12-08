interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags: string[];
}

export const allPosts: Post[] = [
  {
    id: "introduccion-hacking-etico",
    title: "Introducción al Hacking Ético",
    description: "Una guía completa para principiantes sobre hacking ético y ciberseguridad",
    date: "2025-11-01",
    published: true,
    tags: ["hacking", "seguridad", "principiantes"]
  },
  {
    id: "analisis-malware",
    title: "Análisis de Malware Avanzado",
    description: "Técnicas y herramientas para el análisis de malware",
    date: "2025-11-02",
    published: true,
    tags: ["malware", "análisis", "seguridad"]
  },
  {
    id: "pen-testing-web",
    title: "Pentesting de Aplicaciones Web",
    description: "Metodologías y mejores prácticas para el pentesting web",
    date: "2025-11-03",
    published: true,
    tags: ["pentesting", "web", "seguridad"]
  }
];

export const publishedPosts = allPosts.filter(post => post.published);

export async function getPostById(id: string): Promise<Post | undefined> {
  return allPosts.find(post => post.id === id);
}

export async function getAllPosts(): Promise<Post[]> {
  const { toTimestampLocal } = await import('@/lib/date');
  return [...allPosts].sort((a, b) => 
    toTimestampLocal(b.date) - toTimestampLocal(a.date)
  );
}

export async function getPublishedPosts(): Promise<Post[]> {
  const { toTimestampLocal } = await import('@/lib/date');
  return [...publishedPosts].sort((a, b) => 
    toTimestampLocal(b.date) - toTimestampLocal(a.date)
  );
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  return allPosts.filter(post => 
    post.published && post.tags.includes(tag.toLowerCase())
  );
}
