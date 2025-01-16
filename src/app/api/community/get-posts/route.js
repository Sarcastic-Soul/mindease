import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post.model";

export async function GET(req) {
  try {
    await connect();

    // Get URL parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 9;
    const sort = url.searchParams.get("sort") || "latest";

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Create sort object based on sort parameter
    let sortObj = {};
    switch (sort) {
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "most liked":
        sortObj = { likes: -1 };
        break;
      case "least liked":
        sortObj = { likes: 1 };
        break;
      default: // "latest"
        sortObj = { createdAt: -1 };
    }

    // Get total count of posts
    const total = await Post.countDocuments();

    // Fetch paginated posts
    const posts = await Post.find()
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .populate("userId", "username");

    return new Response(
      JSON.stringify({
        posts,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit)
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch posts" }),
      { status: 500 }
    );
  }
}