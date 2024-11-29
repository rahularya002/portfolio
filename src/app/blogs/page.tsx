"use client";

import { useState, useEffect } from "react";
import { BlogPost, getPosts } from "./actions";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, BookOpenIcon, FilterIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const recommendedTopics = [
  "Technology",
  "Travel",
  "Food",
  "Lifestyle",
  "Health",
  "Fashion",
  "Sports",
  "Music",
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = !selectedTopic || post.category?.toLowerCase() === selectedTopic.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center">Read our Blogs</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Blog Posts */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          {loading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No blog posts available for "{selectedTopic || searchTerm}". Try another topic or search term.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => {
                const postSlug = post.slug || `post-${post._id}`;
                return (
                  <Card key={post._id}>
                    <CardContent className="pt-6">
                      <article>
                        <Link href={`/blogs/${postSlug}`} className="group">
                          <h2 className="text-2xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                        </Link>
                        <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4 gap-4">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="mr-1 h-4 w-4" />
                            <span>5 min read</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpenIcon className="mr-1 h-4 w-4" />
                            <span>{post.category || "Uncategorized"}</span>
                          </div>
                        </div>
                        <div className="text-muted-foreground mb-4 prose dark:prose-invert">
                          <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) }} />
                          ...
                        </div>
                      </article>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/blogs/${postSlug}`}>
                        <Button variant="outline">Read More</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-4 space-y-6">
            {/* Topics */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-serif font-bold mb-4 flex items-center">
                  <FilterIcon className="mr-2 h-5 w-5" />
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {recommendedTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopic === topic ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedTopic(topic === selectedTopic ? null : topic)
                      }
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-serif font-bold mb-2">About Our Blog</h3>
                <p className="text-muted-foreground">
                  Discover insightful articles on various topics. Our blog is your go-to source for the latest trends and in-depth analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
