import { PlusCircleIcon, UsersIcon } from "@heroicons/react/solid";

const HeaderControls = ({
    showMyPosts,
    setShowMyPosts,
    sortOrder,
    setSortOrder,
    openCreatePostModal
}) => {
    return (
        <>
            <div className="flex justify-center items-center mb-6">
                <UsersIcon className="w-8 h-8 text-blue-500 mr-2" />
                <h1 className="text-3xl font-semibold text-gray-800">Community Posts</h1>
            </div>

            <div className="mb-4 flex items-center gap-4">
                <label className="flex items-center text-gray-800">
                    <input
                        type="checkbox"
                        checked={showMyPosts}
                        onChange={() => setShowMyPosts(!showMyPosts)}
                        className="mr-2"
                    />
                    Show My Posts
                </label>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most liked">Most Liked</option>
                    <option value="least liked">Least Liked</option>
                </select>

                <div className="ml-auto">
                    <button
                        onClick={openCreatePostModal}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                    >
                        <span>Create Post</span>
                        <PlusCircleIcon className="w-6 h-6 ml-2" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default HeaderControls;