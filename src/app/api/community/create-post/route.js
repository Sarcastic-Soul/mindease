import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post.model";

await connect();
export async function POST(req) {
  try {
    const { userId, title, message } = await req.json();

    console.log("userId", userId);
    console.log("title", title);
    console.log("message", message);

    if (!userId || !title || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }
    const newPost = new Post({
      userId,
      title,
      message,
    });

    await newPost.save();

    return new Response(
      JSON.stringify({ message: "Post created successfully", post: newPost }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create post" }),
      { status: 500 }
    );
  }
}
