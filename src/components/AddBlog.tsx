'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Loader2, X } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const categories = [
  'Technology', 'Travel', 'Food', 'Lifestyle', 'Health', 'Fashion', 'Sports', 'Music',
];

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

export default function NewBlogPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedDraft = localStorage.getItem('blogDraft');
    if (savedDraft) {
      const { title, subtitle, content, author, category, isDraft } = JSON.parse(savedDraft);
      setTitle(title);
      setSubtitle(subtitle);
      setContent(content);
      setAuthor(author);
      setCategory(category);
      setIsDraft(isDraft);
    }
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
    localStorage.setItem('blogDraft', JSON.stringify({
      title,
      subtitle,
      content: value,
      author,
      category,
      isDraft
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      setError('Content is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('isDraft', isDraft.toString());
    formData.append('date', new Date().toISOString());
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to post blog');
      }

      const data = await response.json();
      console.log('Blog posted successfully:', data);
      localStorage.removeItem('blogDraft');
      router.push('/blogs');
    } catch (err) {
      setError('An error occurred while posting the blog. Please try again.');
      console.error('Error posting blog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Post a New Blog</h1>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter the blog title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
            placeholder="Enter the blog subtitle"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Tabs defaultValue="write" className="w-full">
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <Card>
                <CardContent className="p-0">
                  <ReactQuill
                    //@ts-ignore
                    theme="snow"
                    value={content}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    className="min-h-[300px]"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preview">
              <Card>
                <CardContent className="prose max-w-none p-4">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Enter author name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="images">Images</Label>
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="draft"
            checked={isDraft}
            onCheckedChange={setIsDraft}
          />
          <Label htmlFor="draft">Save as draft</Label>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isDraft ? 'Saving...' : 'Posting...'}
            </>
          ) : (
            isDraft ? 'Save Draft' : 'Publish Blog'
          )}
        </Button>
      </form>
    </div>
  );
}

