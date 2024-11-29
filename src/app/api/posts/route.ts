// app/api/posts/route.ts (for getting all posts)
import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI2
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

export async function GET() {
  //@ts-ignore
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const database = client.db('Blogs')
    const collection = database.collection('blogposts')
    const posts = await collection.find({}).toArray()
    return NextResponse.json(posts)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  } finally {
    await client.close()
  }
}

