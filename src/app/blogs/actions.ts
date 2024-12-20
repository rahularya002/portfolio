'use server'

export interface BlogPost {
  _id: string
  title: string
  subtitle: string
  slug?: string
  content: string
  date: string
  category?: string
  author?: {
    name: string
    image: string
    bio: string
  }
  images?: string[]
  createdAt?: string
  updatedAt?: string
}

export async function getPosts(): Promise<BlogPost[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts`;
  console.log('Fetching posts from:', url);

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      console.error('Failed to fetch posts, status:', res.status);
      throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();

    return posts.map((post: any) => ({
      ...post,
      slug: post.slug || `post-${post._id}`,
      category: post.category || 'Uncategorized',
      images: post.images || []
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Error fetching posts');
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    console.error('No slug provided to getPost');
    return null;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`;
  console.log('Fetching post from:', url);

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn('Post not found for slug:', slug);
        return null;
      }
      console.error('Failed to fetch post, status:', res.status);
      throw new Error('Failed to fetch post');
    }

    const post = await res.json();

    return {
      ...post,
      slug: post.slug || `post-${post._id}`,
      category: post.category || 'Uncategorized',
      images: post.images || []
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
