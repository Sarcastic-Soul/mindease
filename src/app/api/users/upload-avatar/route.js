import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model"; // Make sure you have a user model based on the schema
import { v2 as cloudinary } from 'cloudinary';

await connect();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();
        const userId = formData.get('userId');
        const imageFile = formData.get('image');

        if (!userId || !imageFile) {
            return new Response(JSON.stringify({ error: "User ID and image file are required" }), { status: 400 });
        }

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: 'mindease/avatars',
                transformation: [
                    { width: 200, height: 200, crop: 'fill', gravity: 'face' },
                ]
            }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(buffer);
        });

        const imageUrl = result.secure_url;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatarUrl: imageUrl },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(
            JSON.stringify({ message: "Avatar updated successfully", user: updatedUser }),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating avatar:", error);
        return new Response(
            JSON.stringify({ error: "Failed to update avatar" }),
            { status: 500 }
        );
    }
}
