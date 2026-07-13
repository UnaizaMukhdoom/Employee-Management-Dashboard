import { useEffect, useState } from "react";
import { getPostsByUser } from "../lib/api/posts";

export function useEmployeePosts(userId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!userId) {
      return;
    }

    let cancelled = false;

    async function loadPosts() {
      setLoading(true);

      try {
        const data = await getPostsByUser(userId);
        if (!cancelled) {
          setPosts(data);
        }
      } catch (error) {
        if (!cancelled) {
          setPosts([]);
        }
      }

      if (!cancelled) {
        setLoading(false);
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { posts, loading };
}