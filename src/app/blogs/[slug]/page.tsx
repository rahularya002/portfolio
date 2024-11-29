import { getPost } from '../actions';
import { notFound } from 'next/navigation';
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  console.log('Received params:', params); // Debug log

  if (!params.slug) {
    console.log('No slug provided'); // Debug log
    notFound();
  }

  const post = await getPost(params.slug);
  console.log('Retrieved post:', post); // Debug log

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article>
        <h1 className="text-4xl font-serif font-bold mb-4">{post.title}</h1>
        {post.subtitle && (
          <h2 className="text-2xl font-serif text-muted-foreground mb-6">{post.subtitle}</h2>
        )}
        <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-8 gap-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4" />
            <span>5 min read</span>
          </div>
          {post.author && (
            <div className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
          )}
        </div>
        <Separator className="mb-8" />
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

