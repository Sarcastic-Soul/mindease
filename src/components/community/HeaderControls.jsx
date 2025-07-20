import { Users2, Plus } from "lucide-react";
import { motion } from "framer-motion";

const HeaderControls = ({ showMyPosts, setShowMyPosts, sortOrder, setSortOrder, openCreatePostModal }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3 self-start md:self-center">
                    <Users2 className="text-pink-500" size={32} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Community Feed
                        </h1>
                        <p className=" text-gray-500">Connect and find support.</p>
                    </div>
                </div>
            </motion.div>
            {/* Controls (Right Side) */}
            <div className="flex items-center gap-x-4 gap-y-2 flex-wrap justify-start md:justify-end w-full md:w-auto">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={showMyPosts}
                        onChange={() => setShowMyPosts(!showMyPosts)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    Show My Posts
                </label>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="py-2 pl-3 pr-8 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                >
                    <option value="latest">Sort: Latest</option>
                    <option value="oldest">Sort: Oldest</option>
                    <option value="most liked">Sort: Most Liked</option>
                    <option value="least liked">Sort: Least Liked</option>
                </select>

                <button
                    onClick={openCreatePostModal}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm"
                >
                    <Plus size={16} />
                    Create Post
                </button>
            </div>
        </div>
    );
};

export default HeaderControls;
