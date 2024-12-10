import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post.model";
import User from "@/models/user.model";

// Ensure you only connect to the database once per request
await connect();

export async function GET(req) {
  try {
    // Fetch posts and populate userId with the username
    const posts = await Post.find()
      .sort({ createdAt: -1 })  // Sort posts by most recent
      .populate("userId", "username");  // Populate the userId field with username only

    console.log("Posts:", posts);
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);  // Log the error for better debugging
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
}
