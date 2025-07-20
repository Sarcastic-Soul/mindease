import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

// Add onLike and user as props
const PostCard = ({ post, user, onClick, onLike }) => {
    // Stop the card's main onClick from firing when the like button is clicked
    const handleLikeClick = (e) => {
        e.stopPropagation();
        onLike();
    };

    return (
        <motion.div
            className="bg-white rounded-xl border border-gray-200 p-5 cursor-pointer hover:border-blue-400 hover:shadow-sm transition-all duration-200 flex flex-col"
            onClick={() => onClick(post)}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            layout
        >
            {post.imageUrl && (
                <div className="relative w-full h-40 mb-4">
                    <Image
                        src={post.imageUrl.toString()}
                        alt={post.title}
                        layout="fill"
                        className="object-cover rounded-t-lg"
                    />
                </div>
            )}
            <div className="flex flex-col flex-grow p-5 pt-0">
                <h3 className="text-md font-bold text-gray-800 truncate mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 flex-grow">{post.message}</p>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    {/* Wrap the like icon/count in a button */}
                    <button onClick={handleLikeClick} className="flex items-center gap-1.5 text-xs text-red-500 hover:bg-red-50 rounded-md p-1">
                        <Heart size={14} className={`transition-all text-red-500 fill-current`} />
                        <span className="font-semibold">{post.likes}</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default PostCard;
