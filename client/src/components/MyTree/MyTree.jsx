import { useParams } from "react-router-dom";
import { LuLeafyGreen } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTree } from "../../actions/treeActions";
import { fetchLeavesByUserId, deleteLeafData, updateLeafData } from "../../actions/leafActions";
import trunkImage from "../../assets/images/trunk.svg";

const MyTree = () => {
    const { user_id } = useParams();  // ID of the tree owner
    const dispatch = useDispatch();

    const loggedInUserId = useSelector((state) => state.session.user?.id);  // Logged-in user ID
    const isOwner = loggedInUserId === user_id; // Check if the logged-in user owns this tree

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedLeaf, setSelectedLeaf] = useState(null);
    const [editedLeaf, setEditedLeaf] = useState({ title: "", author: "", category: "" });

    const user = useSelector((state) => state.entities.trees.users[user_id]);
    const treeId = user?.tree;
    const leaves = useSelector((state) =>
        Object.values(state.entities.leaves).filter((leaf) => leaf.treeId === treeId)
    );

    useEffect(() => {
        if (treeId) {
            dispatch(fetchTree(treeId));
            dispatch(fetchLeavesByUserId(user_id));
        }
    }, [dispatch, treeId, user_id]);

    const bushSize = Math.min(10 + leaves.length * 0.5, 18);
    const spreadRadius = Math.max(2, bushSize / 3);

    const openRemoveModal = (leaf) => {
        setSelectedLeaf(leaf);
        setShowDeleteModal(true);
    };

    const openEditModal = (leaf) => {
        setSelectedLeaf(leaf);
        setEditedLeaf({ title: leaf.title, author: leaf.author, category: leaf.category });
        setShowEditModal(true);
    };

    const handleRemoveLeaf = () => {
        if (selectedLeaf) {
            dispatch(deleteLeafData(selectedLeaf._id));
        }
        setShowDeleteModal(false);
        setSelectedLeaf(null);
    };

    const handleUpdateLeaf = async () => {
        if (!selectedLeaf?._id) {
            console.error("Error: Missing leaf ID!");
            return;
        }

        try {
            await dispatch(updateLeafData({ ...editedLeaf, _id: selectedLeaf._id, userId: user_id }));

            setShowEditModal(false);
            setSelectedLeaf(null);
        } catch (error) {
            console.error("Error updating leaf:", error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-emerald-600 text-2xl mb-4 text-center">
                {user ? `${user.username}'s Tree` : "Loading..."}
            </h1>

            <div
                className="relative flex justify-center items-center bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                style={{
                    width: `${bushSize}rem`,
                    height: `${bushSize}rem`,
                }}
            >
                {leaves.length > 0 ? (
                    leaves.map((leaf, index) => {
                        const angle = (index / leaves.length) * Math.PI * 2;
                        const x = Math.cos(angle) * spreadRadius;
                        const y = Math.sin(angle) * spreadRadius;

                        return (
                            <div
                                key={leaf._id}
                                className="group absolute"
                                style={{
                                    transform: `translate(${x}rem, ${y}rem)`,
                                }}
                            >
                                {/* If it's the owner's tree, clicking allows edit; otherwise, just shows details */}
                                <LuLeafyGreen
                                    onClick={isOwner ? () => openEditModal(leaf) : null}
                                    size={22}
                                    className={`cursor-pointer text-green-700 ${isOwner ? "group-hover:text-green-900" : ""} transition duration-200`}
                                />
                                <p className="font-semibold text-xs">{leaf.title}</p>

                                <div className="z-50 absolute top-full left-1/2 transform -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white text-gray-800 text-xs rounded-md shadow-lg px-3 py-2 max-w-xs transition-all duration-200 mt-1 border border-gray-300">
                                    <p className="font-semibold">{leaf.title}</p>
                                    <p className="italic text-gray-600">{leaf.author}</p>

                                    {/* Only show edit/remove buttons if the logged-in user owns this tree */}
                                    {isOwner && (
                                        <div className="mt-2 flex justify-between space-x-2">
                                            <button
                                                onClick={() => openEditModal(leaf)}
                                                className="text-blue-600 hover:underline text-xs"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openRemoveModal(leaf)}
                                                className="text-red-600 hover:underline text-xs"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-white text-sm">No leaves yet...</p>
                )}
            </div>

            <img src={trunkImage} alt="Tree Trunk" className="w-16" />

            {/* 🛑 Delete Confirmation Modal */}
            {showDeleteModal && isOwner && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-lg font-semibold text-gray-800">Remove Leaf</h2>
                        <p className="text-gray-600 mt-2">
                            Are you sure you want to remove <strong>{selectedLeaf?.title}</strong>?
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRemoveLeaf}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ✏️ Edit Leaf Modal */}
            {showEditModal && isOwner && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-lg font-semibold text-gray-800">Edit Leaf</h2>

                        <div className="mt-4 space-y-3">
                            <label className="block text-gray-700 font-semibold">Title</label>
                            <input
                                type="text"
                                value={editedLeaf.title}
                                onChange={(e) => setEditedLeaf({ ...editedLeaf, title: e.target.value })}
                                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-gray-900 font-bold"
                            />

                            <label className="block text-gray-700 font-semibold">Author</label>
                            <input
                                type="text"
                                value={editedLeaf.author}
                                onChange={(e) => setEditedLeaf({ ...editedLeaf, author: e.target.value })}
                                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-gray-900 font-bold"
                            />
    
                            <label className="block text-gray-700 font-semibold">Category</label>
                            <input
                                type="text"
                                value={editedLeaf.category}
                                onChange={(e) => setEditedLeaf({ ...editedLeaf, category: e.target.value })}
                                className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-gray-900 font-bold"
                            />
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateLeaf}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTree;

