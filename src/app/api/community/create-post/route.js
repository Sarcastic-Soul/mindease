import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post.model";
import { v2 as cloudinary } from 'cloudinary';

await connect();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();
        const title = formData.get('title');
        const message = formData.get('message');
        const userId = formData.get('userId');
        const imageFile = formData.get('image');

        if (!userId || !title || !message) {
            return new Response(JSON.stringify({ error: "Missing required text fields" }), { status: 400 });
        }

        let imageUrl = '';

        if (imageFile) {
            // Convert file to buffer
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    folder: 'mindease/community_posts',
                }, (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }).end(buffer);
            });

            imageUrl = result.secure_url;
        }

        const newPost = new Post({
            userId,
            title,
            message,
            imageUrl,
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
