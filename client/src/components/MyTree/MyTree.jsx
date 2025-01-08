/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { LuLeafyGreen } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import trunkImage from "../../assets/images/trunk.svg";

const MyTree = ({ leaves }) => {
    const { user_id } = useParams();

    const user = useSelector((state) => {
        const trees = Object.values(state.entities.trees);
        return trees.find((tree) => tree._id === user_id);
    });

    console.log("user_id", user_id);
    console.log("user", user);

    const handleLeafClick = (leaf) => alert(`Selected Leaf: ${leaf.title}`);

    return (
        <div className="tree-container-wrapper">
            <h1 className="text-emerald-600 text-3xl mb-6">
                {user ? `${user.username}'s Tree` : "Loading..."}
            </h1>
            <div className="tree-container">
                {leaves.map((leaf) => (
                    <div key={leaf._id} className="leaf-wrapper">
                        <LuLeafyGreen className="tree-leaf" onClick={() => handleLeafClick(leaf)} />
                        <span className="leaf-label">{leaf.title}</span>
                    </div>
                ))}
            </div>
            <img src={trunkImage} alt="Tree Trunk" className="w-28 mt-4" />
        </div>
    );
};

export default MyTree;
