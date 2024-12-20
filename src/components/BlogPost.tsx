// app/blog/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

interface BlogImage {
  file: File;
  preview: string;
}

export default function NewBlogPage() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [images, setImages] = useState<BlogImage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML())
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editor || !editor.getHTML()) {
      setError('Content is required')
      return
    }
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', editor.getHTML())
      formData.append('author', author)
      formData.append('date', new Date().toISOString())
      
      // Append images
      images.forEach((image, index) => {
        formData.append(`image${index}`, image.file)
      })

      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to post blog')
      }

      const data = await response.json()
      console.log('Blog posted successfully:', data)
      router.push('/blogs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while posting the blog')
      console.error('Error posting blog:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prevImages => [...prevImages, ...newImages])
  }

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
    setImages(prevImages => [...prevImages, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prevImages => {
      const newImages = [...prevImages]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

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
          <Label htmlFor="content">Content</Label>
          <div className="flex flex-col space-y-2">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
              className="border-dashed border-2 border-gray-300 p-4 rounded text-center"
            >
              Drag and drop images here or click below to upload
            </div>
            <EditorContent
              editor={editor}
              className="prose max-w-none min-h-[200px] border p-4 rounded-md"
            />
          </div>
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
                    src={image.preview}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                  <span className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white px-1 rounded-bl text-xs">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            'Post Blog'
          )}
        </Button>
      </form>
    </div>
  )
}