import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post.model";
import { v2 as cloudinary } from 'cloudinary';

await connect();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("id");

        if (!postId) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }

        const postToDelete = await Post.findById(postId);

        if (!postToDelete) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        if (postToDelete.imageUrl) {
            const publicId = postToDelete.imageUrl.split('/').slice(-2).join('/').split('.')[0];

            await cloudinary.uploader.destroy(publicId);
        }

        await Post.findByIdAndDelete(postId);

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
