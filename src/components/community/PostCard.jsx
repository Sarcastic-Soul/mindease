import { HeartIcon as HeartSolid } from "@heroicons/react/solid";

const PostCard = ({ post, onClick }) => {
    return (
        <div
            className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition ease-in-out bg-white relative"
            onClick={() => onClick(post)}
        >
            <div className="absolute top-2 right-2 flex items-center text-sm text-gray-600">
                <HeartSolid className="w-5 h-5 text-red-500 mr-2" />
                <span>{post.likes}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
            <p className="text-sm text-gray-600 truncate">{post.message}</p>
            <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
};

export default PostCard;