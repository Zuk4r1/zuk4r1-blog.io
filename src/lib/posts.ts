import matter from 'gray-matter';
import { Buffer } from 'buffer';
import { toTimestampLocal } from '@/lib/date';

// Asegurar Buffer en entorno navegador para librerías que lo esperan
const g = globalThis as unknown as { Buffer?: typeof Buffer };
if (g.Buffer === undefined) {
  g.Buffer = Buffer;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags: string[];
  readTime?: string;
  content?: string;
}

// Función para obtener todos los archivos .md de la carpeta posts (eager para HMR)
function getMarkdownModules(): Record<string, string> {
  try {
    const modules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
    return modules;
  } catch (error) {
    console.error('Error al obtener módulos markdown:', error);
    return {};
  }
}

// Función para parsear un archivo markdown y extraer los metadatos
function parseMarkdownFileSync(filePath: string, fileContent: string): Post | null {
  try {
    const { data, content } = matter(fileContent);

    const fileName = filePath.split('/').pop() || '';
    const baseName = fileName.replace(/\.md$/i, '');
    const parts = baseName.split('-');
    const last3 = parts.slice(-3);
    const [yyyy, mm, dd] = last3;
    const hasDateInName = /^\d{4}$/.test(yyyy || '') && /^\d{2}$/.test(mm || '') && /^\d{2}$/.test(dd || '');
    const rawId = hasDateInName ? parts.slice(0, -3).join('-') : baseName;
    const id = rawId
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-');
    const dateFromName = hasDateInName ? `${yyyy}-${mm}-${dd}` : '';

    const regexYmd = /^\d{4}-\d{2}-\d{2}$/;
    const rawDataDate = (data.date as string) || '';
    const normalizedDate = dateFromName
      || (regexYmd.test(rawDataDate) ? rawDataDate : '');

    return {
      id,
      title: (data.title as string) || id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      description: (data.description as string) || '',
      date: normalizedDate,
      published: data.published !== false,
      tags: Array.isArray(data.tags) ? (data.tags as unknown[]).map((t) => String(t).toLowerCase()) : [],
      readTime: (data.readTime as string) || '',
      content,
    };
  } catch (error) {
    console.error(`Error al parsear archivo ${filePath}:`, error);
    return null;
  }
}

// Función para cargar todos los posts desde archivos markdown
function loadPostsFromMarkdownSync(): Post[] {
  try {
    const modules = getMarkdownModules();
    const posts: Post[] = [];
    for (const [filePath, fileContent] of Object.entries(modules)) {
      const post = parseMarkdownFileSync(filePath, fileContent);
      if (post) posts.push(post);
    }
    return posts;
  } catch (error) {
    console.error('Error al cargar posts desde markdown:', error);
    return [];
  }
}

// Función para obtener todos los posts (con cache)
export async function getAllPosts(): Promise<Post[]> {
  const posts = loadPostsFromMarkdownSync();
  return [...posts].sort((a, b) => toTimestampLocal(b.date) - toTimestampLocal(a.date));
}

// Función para obtener solo los posts publicados
export async function getPublishedPosts(): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.published);
}

// Función para obtener un post por ID
export async function getPostById(id: string): Promise<Post | undefined> {
  const allPosts = await getAllPosts();
  return allPosts.find(post => post.id === id);
}

// Función para obtener posts por tag
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.published && post.tags.includes(tag.toLowerCase())
  );
}

// Función para obtener todos los tags únicos
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    if (post.published) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags).sort();
}

// Suscriptores para actualizaciones de posts (útil en desarrollo con HMR)
type Subscriber = (posts: Post[]) => void;
const subscribers = new Set<Subscriber>();

export async function notifyPostsUpdate(): Promise<void> {
  const posts = await getAllPosts();
  for (const cb of subscribers) {
    try {
      cb(posts);
    } catch (e) {
      console.error('Error notificando suscriptor de posts:', e);
    }
  }
}

export function subscribeToPosts(callback: Subscriber): () => void {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

// Reaccionar a cambios HMR en módulos .md (solo desarrollo)
type ViteHot = { accept: (cb: (mod: { notifyPostsUpdate?: () => void }) => void) => void };
const metaWithHot = import.meta as ImportMeta & { hot?: ViteHot };
if (metaWithHot.hot) {
  metaWithHot.hot.accept((newModule) => {
    const notifier = newModule?.notifyPostsUpdate ?? notifyPostsUpdate;
    notifier();
  });
}
