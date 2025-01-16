import Post from "@/models/post.model";
import User from "@/models/user.model";

export async function POST(req) {
    const { postId, action, userId } = await req.json();

    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Find the post by postId
        const post = await Post.findById(postId);
        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found" }), { status: 404 });
        }

        // Handle like action
        if (action === "like") {
            // Add postId to the user's likedPosts array if not already liked
            if (!user.likedPosts.includes(postId)) {
                user.likedPosts.push(postId);
                await user.save();
            }

            // Increment the post's like count
            post.likes += 1;
            await post.save();
        }

        // Handle unlike action
        else if (action === "unlike") {
            // Remove postId from the user's likedPosts array
            user.likedPosts = user.likedPosts.filter(id => id.toString() !== postId);
            await user.save();

            // Decrement the post's like count
            post.likes -= 1;
            await post.save();
        }

        return new Response(JSON.stringify({ message: "Post liked/unliked successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error processing like/unlike:", error);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}

export async function GET() {
    return new Response(JSON.stringify({ message: "GET method not allowed" }), { status: 405 });
}
