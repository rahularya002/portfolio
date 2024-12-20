import Link from 'next/link'
import { Separator } from "@/components/ui/separator"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/blogs" className="text-2xl font-serif font-bold">
            Our Blogs
          </Link>
          <nav className='flex gap-3'>
            <Link href="/blogs/add" className="text-sm text-muted-foreground hover:text-foreground">
              post a blog
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Go to Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <Separator />
      <footer className="py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MD INFOSYSTEM. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

