/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { LuLeafyGreen } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTree } from "../../actions/treeActions";
import { fetchLeavesByUserId } from "../../actions/leafActions"
import trunkImage from "../../assets/images/trunk.svg";

const MyTree = () => {
    const { user_id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.entities.trees.users[user_id]);
    const treeId = user?.tree;
    const tree = useSelector((state) => treeId ? state.entities.trees.trees[treeId] : null);
    const leaves = tree?.leaves || [];

    useEffect(() => {
        if (treeId && !tree) {
            dispatch(fetchTree(treeId));
        }
        dispatch(fetchLeavesByUserId(user_id));
    }, [dispatch, treeId, tree]);

    console.log("Leaves in MyTree:", leaves); // ✅ Debugging

    return (
        <div className="tree-container-wrapper">
            <h1 className="text-emerald-600 text-3xl mb-6">
                {user ? `${user.username}'s Tree` : "Loading..."}
            </h1>
            <div className="tree-container">
                {leaves.length > 0 ? (
                    leaves.map((leaf) => (
                        <div key={leaf._id} className="leaf-wrapper">
                            <LuLeafyGreen size={25} className="tree-leaf" />
                            <span className="leaf-label">{leaf.title}</span>
                        </div>
                    ))
                ) : (
                    <p>No leaves found for this tree.</p>
                )}
            </div>
            <img src={trunkImage} alt="Tree Trunk" className="w-28" />
        </div>
    );
};

export default MyTree;

