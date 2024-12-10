import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post.model"; // Adjust path to your Post model

export async function DELETE(req) {
    try {
        await connect(); // Connect to the database

        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("id"); // Get the post ID from the query

        if (!postId) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }

        const deletedPost = await Post.findByIdAndDelete(postId); // Delete the post by ID

        if (!deletedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
