import { useParams } from "react-router-dom";
import { LuLeafyGreen } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTree } from "../../actions/treeActions";
import { fetchLeavesByUserId } from "../../actions/leafActions";
import trunkImage from "../../assets/images/trunk.svg";

const MyTree = () => {
    const { user_id } = useParams();
    const dispatch = useDispatch();

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
    }, [dispatch, treeId, leaves.length, user_id]);

    const bushSize = Math.min(10 + leaves.length * 0.5, 18);
    const spreadRadius = Math.max(2, bushSize / 3);

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
                                <LuLeafyGreen
                                    size={22}
                                    className="cursor-pointer text-green-700 group-hover:text-green-900 transition duration-200"
                                />

                                <div className="z-50 absolute top-full left-1/2 transform -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white text-gray-800 text-xs rounded-md shadow-lg px-3 py-2 max-w-xs transition-all duration-200 mt-1 border border-gray-300">
                                    <p className="font-semibold">{leaf.title}</p>
                                    <p className="italic text-gray-600">{leaf.author}</p>

                                    <div className="mt-2 flex justify-between space-x-2">
                                        <button
                                            onClick={() => console.log(`Edit leaf: ${leaf._id}`)}
                                            className="text-blue-600 hover:underline text-xs"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => console.log(`Remove leaf: ${leaf._id}`)}
                                            className="text-red-600 hover:underline text-xs"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-white text-sm">No leaves yet...</p>
                )}
            </div>

            <img src={trunkImage} alt="Tree Trunk" className="w-16" />
        </div>
    );
};

export default MyTree;

