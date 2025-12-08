import { useEffect, useState } from 'react';
import { getAllPosts, getPublishedPosts, subscribeToPosts, Post } from '@/lib/posts';

export function usePublishedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let unsub: (() => void) | null = null;
    getPublishedPosts().then(setPosts).catch(console.error);

    const metaWithHot = import.meta as ImportMeta & { hot?: { accept: (cb: (mod: unknown) => void) => void } };
    if (import.meta && metaWithHot.hot) {
      unsub = subscribeToPosts((updated) => {
        setPosts(updated.filter((p) => p.published));
      });
    }

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return posts;
}

export function useAllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let unsub: (() => void) | null = null;
    getAllPosts().then(setPosts).catch(console.error);

    const metaWithHot = import.meta as ImportMeta & { hot?: { accept: (cb: (mod: unknown) => void) => void } };
    if (import.meta && metaWithHot.hot) {
      unsub = subscribeToPosts(setPosts);
    }

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return posts;
}
