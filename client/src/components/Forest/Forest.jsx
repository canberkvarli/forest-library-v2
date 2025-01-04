import "./Forest.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrees, fetchUsers } from "../../actions/treeActions";
import { LuTreeDeciduous } from "react-icons/lu";
import AuthModal from "../AuthModal/AuthModal";
import Footer from "../Footer/Footer";

const Forest = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.session.isAuthenticated);
    const user = useSelector((state) => state.session.user);
    const trees = useSelector((state) => state.entities.trees);
    const [showAuthModal, setShowAuthModal] = useState(false);


    // Fetch trees and users if they haven't been fetched yet
    useEffect(() => {
        if (!trees || Object.keys(trees).length === 0) {
            dispatch(fetchTrees());
            dispatch(fetchUsers());
        }
    }, [dispatch, trees]);

    const renderForestContent = () => {
        if (loggedIn) {
            console.log("User is logged in");
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
                        <button onClick={() => setShowAuthModal(true)} className="w-64 inline-flex items-center justify-center text-white font-cursive text-lg bg-teal-500 border border-gray-400 rounded-lg py-2 px-4 transition-transform transform hover:scale-105">
                            Create a Tree
                        </button>
                        {showAuthModal && (
                            <AuthModal onClose={() => setShowAuthModal(false)} />
                        )}
                    </div>
                    <Footer />
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
        </div>
    );
};

export default Forest;
