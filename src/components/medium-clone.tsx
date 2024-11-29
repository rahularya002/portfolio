import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  excerpt: string; // Use a short excerpt or first few characters of the content
  author: string;
  date: string;
  readTime: string;
  category: string;
  images?: string[];
}

interface BlogResponse {
  blogs: Blog[];
  hasMore: boolean;
  total: number;
}

interface FetchBlogsProps {
  page: number;
  pageSize?: number;
}

const fetchBlogs = async ({ page, pageSize = 10 }: FetchBlogsProps): Promise<BlogResponse> => {
  try {
    const response = await fetch(`/api/blogs?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch blogs');
  }
};

export function MediumClone() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loader = useRef(null);
  const router = useRouter();

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchBlogs({ page });

      setBlogs((prevBlogs) => [...prevBlogs, ...response.blogs]);
      setHasMore(response.hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError('Failed to load blogs. Please try again later.');
      console.error('Error loading blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        loadBlogs();
      }
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredBlogs = selectedTags.length > 0
    ? blogs.filter((blog) => selectedTags.includes(blog.category))
    : blogs;

  if (!blogs.length && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error && !blogs.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => {
            setPage(1);
            setBlogs([]);
            loadBlogs();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="lg:w-2/3">
            <h1 className="text-5xl font-bold mb-8">Blogs</h1>

            <div className="space-y-8">
              {filteredBlogs.map((blog) => (
                <div key={blog.id}>
                  <article className="flex space-x-4 group">
                    {blog.images && blog.images[0] && (
                      <div className="hidden md:block flex-shrink-0 w-48 h-32 relative overflow-hidden rounded-lg">
                        <img
                          src={blog.images[0]}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium">{blog.author}</span>
                      </div>
                      <h2
                        className="text-xl font-bold mb-2 cursor-pointer text-gray-900 group-hover:text-blue-600 transition-colors"
                        onClick={() => router.push(`/blogs/${blog.id}`)}
                      >
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 mb-2 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-1">
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                        <span>·</span>
                        <span>{blog.readTime}</span>
                        <span>·</span>
                        <span
                          className="cursor-pointer hover:text-blue-600"
                          onClick={() => toggleTag(blog.category)}
                        >
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </article>
                  <hr className="my-8" />
                </div>
              ))}
            </div>

            <div ref={loader} className="my-8 flex justify-center">
              {isLoading && <Loader2 className="h-6 w-6 animate-spin text-gray-400" />}
            </div>

            {!hasMore && blogs.length > 0 && (
              <p className="text-center text-gray-500 my-8">No more blogs to load</p>
            )}

            {!isLoading && blogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No blogs found</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MediumClone;
