import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLeaf } from "../../actions/leafActions";
import MyTree from "../MyTree/MyTree";

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leafData, setLeafData] = useState({ title: "", author: "", category: "" });
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.session.user);
    const treeId = useSelector((state) => {
        return state.entities.trees.users[currentUser.id]?.tree;
    });

    const handleAddLeaf = (e) => {
        e.preventDefault();

        if (!treeId) {
            console.error("Error: No tree ID found for user.");
            return;
        }

        dispatch(createLeaf({ ...leafData, userId: currentUser.id, treeId }));
        setLeafData({ title: "", author: "", category: "" });
        setIsModalOpen(false);
    };


    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center py-8">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white rounded-lg shadow-lg p-6">
                {/* Left Section */}
                <div className="lg:w-1/3 bg-green-100 p-4 rounded-lg flex flex-col items-center">
                    <p className="text-gray-700 text-center mb-4">
                        Search your book here! Example: <strong>The Little Prince</strong>
                    </p>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add A Leaf
                    </button>
                </div>

                {/* Right Section */}
                <div className="lg:w-2/3 flex flex-col items-center">
                    <MyTree
                        currentUserId={currentUser.id}
                        username={currentUser.username}
                    />
                </div>
            </div>

            {/* Add Leaf Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-green-600">Add a New Leaf</h2>
                        <form onSubmit={handleAddLeaf} className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={leafData.title}
                                onChange={(e) => setLeafData({ ...leafData, title: e.target.value })}
                                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Author"
                                value={leafData.author}
                                onChange={(e) => setLeafData({ ...leafData, author: e.target.value })}
                                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={leafData.category}
                                onChange={(e) => setLeafData({ ...leafData, category: e.target.value })}
                                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                            />
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
