import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
}

function mapDbPost(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    content: row.content,
    excerpt: row.excerpt || "",
    author: row.author,
    publishedAt: row.published_at
      ? new Date(row.published_at).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        })
      : "",
  };
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapDbPost);
}

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;
  return mapDbPost(data);
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchPublishedPosts,
    staleTime: 10 * 60 * 1000,
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}
