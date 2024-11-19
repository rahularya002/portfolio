'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export function MediumClone() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const topics = ['Programming', 'Data Science', 'Technology', 'Self Improvement', 'Writing', 'Relationships', 'Machine Learning', 'Productivity']

  const articles = [
    { title: "The Future of AI in Everyday Life", excerpt: "Artificial Intelligence is rapidly evolving and integrating into our daily routines. From smart homes to personalized recommendations, AI is shaping the way we live and interact with technology...", author: "John Doe", date: "May 15", readTime: "5 min read", category: "Technology" },
    { title: "10 Tips for Effective Time Management", excerpt: "Time management is crucial for productivity and success. In this article, we explore ten proven strategies to help you make the most of your time and achieve your goals...", author: "Jane Smith", date: "May 14", readTime: "7 min read", category: "Productivity" },
    { title: "The Rise of Sustainable Technology", excerpt: "As climate change concerns grow, tech companies are focusing on developing eco-friendly solutions. This article examines the latest trends in sustainable technology and their impact on our environment...", author: "Alex Johnson", date: "May 13", readTime: "6 min read", category: "Technology" },
    { title: "Mastering the Art of Public Speaking", excerpt: "Public speaking is a valuable skill in both personal and professional life. Learn how to overcome stage fright, structure your presentations, and captivate your audience with these expert tips...", author: "Emily Brown", date: "May 12", readTime: "8 min read", category: "Self Improvement" },
    { title: "The Impact of Machine Learning on Healthcare", excerpt: "Machine learning is revolutionizing the healthcare industry. From diagnosis to treatment planning, discover how AI is improving patient care and medical research...", author: "Dr. Michael Lee", date: "May 11", readTime: "10 min read", category: "Machine Learning" },
  ]

  const filteredArticles = selectedTags.length > 0
    ? articles.filter(article => selectedTags.includes(article.category))
    : articles

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <svg viewBox="0 0 1043.63 592.71" className="h-10 w-auto">
              <g data-name="Layer 2">
                <g data-name="Layer 1">
                  <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="lg:w-2/3">
            <h1 className="text-5xl font-bold mb-8">Medium</h1>
            <div className="space-y-8">
              {filteredArticles.map((article, index) => (
                <div key={index}>
                  <article className="flex space-x-4">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          alt="Author avatar"
                          className="h-6 w-6 rounded-full"
                          src={`/placeholder.svg?height=24&width=24`}
                        />
                        <span className="text-sm font-medium">{article.author}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                      <p className="text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{article.date}</span>
                        <span className="mx-1">·</span>
                        <span>{article.readTime}</span>
                        <span className="mx-1">·</span>
                        <span>{article.category}</span>
                      </div>
                    </div>
                    <img
                      alt={`Article ${index + 1} image`}
                      className="h-32 w-32 object-cover"
                      src={`/placeholder.svg?height=128&width=128`}
                    />
                  </article>
                  {index < filteredArticles.length - 1 && <hr className="my-8" />}
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="sticky top-20">
              <h2 className="text-sm font-bold uppercase text-gray-700 mb-4">Discover more of what matters to you</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {topics.map((topic) => (
                  <Button
                    key={topic}
                    variant={selectedTags.includes(topic) ? "default" : "outline"}
                    className="rounded-full text-sm"
                    onClick={() => toggleTag(topic)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
              <hr className="my-8" />
              <nav>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <li><a href="#" className="text-gray-500 hover:text-gray-900">Help</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-900">Status</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-900">Writers</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-900">Careers</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-900">Privacy</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-900">Terms</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-900">About</a></li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}