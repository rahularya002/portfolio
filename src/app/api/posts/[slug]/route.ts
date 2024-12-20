// app/api/posts/[slug]/route.ts (for getting single post)
import { NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGO_URI2
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  console.log('Received slug:', params.slug); // Debug log
  //@ts-ignore
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const database = client.db('Blogs')
    const collection = database.collection('blogposts')
    let post;
    
    if (params.slug.startsWith('post-')) {
      const id = params.slug.replace('post-', '')
      console.log('Searching by ID:', id); // Debug log
      post = await collection.findOne({ _id: new ObjectId(id) })
    } else {
      console.log('Searching by slug:', params.slug); // Debug log
      post = await collection.findOne({ slug: params.slug })
    }

    console.log('Found post:', post); // Debug log

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Ensure the post has a slug
    post.slug = post.slug || `post-${post._id}`
    return NextResponse.json(post)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  } finally {
    await client.close()
  }
}