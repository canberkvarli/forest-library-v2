import "./Forest.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrees, fetchUsers } from "../../actions/treeActions";
import { LuTreeDeciduous } from "react-icons/lu";
import Footer from "../Footer/Footer";

const Forest = () => {
    const dispatch = useDispatch();
    const { loggedIn, user } = useSelector((state) => state.session);
    const trees = useSelector((state) => state.entities.trees);

    // Fetch trees and users if they haven't been fetched yet
    useEffect(() => {
        if (!trees || Object.keys(trees).length === 0) {
            dispatch(fetchTrees());
            dispatch(fetchUsers());
        }
    }, [dispatch, trees]);

    const renderForestContent = () => {
        if (loggedIn) {
            return (
                <div className="main-page">
                    <div className="welcome-user">Welcome home {user.username}</div>
                    <div className="outer-forest">
                        <div className="forest">
                            {Object.values(trees).map((tree) => (
                                <div className="tree group" key={`${tree._id}-${tree.username}`}>
                                    <Link className="links" to={`/users/${tree._id}`}>
                                        <LuTreeDeciduous size={40} />
                                    </Link>
                                    <span className="tree-username">{tree.username}</span>
                                    <div className="tooltip">
                                        {tree.username}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="advertisement">
                        <span id="main-advertisement">
                            What&apos;s next in reading is first on ForestLibrary
                        </span>
                        Upload your first leaf and begin your journey. ForestLibrary gives you
                        space to create, document, and connect with other readers.
                    </div>
                    <div className="outer-forest">
                        <div className="forest">
                            {Object.values(trees).map((tree) => (
                                <div className="tree group" key={`${tree._id}-${tree.username}`}>
                                    <Link className="links" to={`/users/${tree._id}`}>
                                        <LuTreeDeciduous size={40} />
                                    </Link>
                                    <span className="tree-username">{tree.username}</span>
                                    <div className="tooltip">
                                        {tree.username}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bottom-section">
                        <span className="bottom-ad-title">
                            Thanks for checking out the trees. Now join in.
                        </span>
                        <span className="bottom-ad-desc">
                            Save books, add reviews and build your tree. All for free.
                        </span>
                        <Link to="/register" className="w-64 inline-flex items-center justify-center text-white font-cursive text-lg bg-teal-500 border border-gray-400 rounded-lg py-2 px-4 transition-transform transform hover:scale-105">
                            Create a Tree
                        </Link>
                    </div>
                </div>
            );
        }
    };

    if (!trees || Object.keys(trees).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {renderForestContent()}
            <Footer />
        </div>
    );
};

export default Forest;