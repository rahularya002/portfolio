const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGO_URI2);
  cachedClient = client;
  return client;
}

async function GET(req) {
  try {
    const client = await connectToDatabase();
    const db = client.db("Blogs");

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const articles = await db
      .collection("articles")
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray();

    const total = await db.collection("articles").countDocuments();

    const formattedArticles = articles.map((article) => ({
      id: article._id.toString(),
      title: article.title,
      excerpt: article.excerpt,
      author: article.author,
      date: new Date(article.date).toLocaleDateString(),
      readTime: `${article.readTime} min read`,
      category: article.category,
    }));

    return NextResponse.json({ articles: formattedArticles, total });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { message: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

module.exports = { GET };
