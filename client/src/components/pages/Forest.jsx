import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrees, fetchUsers } from "../../actions/treeActions";
import Footer from "../layout/Footer";

const Forest = () => {
    const [dataIsShown, setDataIsShown] = useState(false);
    const dispatch = useDispatch();

    // Getting loggedIn and trees from Redux state
    const { loggedIn, user } = useSelector((state) => state.session);
    const trees = useSelector((state) => state.trees.items);  // Adjust based on your state structure

    useEffect(() => {
        dispatch(fetchTrees());
        dispatch(fetchUsers());
    }, [dispatch]);

    const existingForest = () => {
        if (loggedIn) {
            return (
                <div className="main-page">
                    <div className="welcome-user">Welcome home {user.username}</div>
                    <div className="outer-forest">
                        <div className="forest">
                            {trees.map((tree, idx) => (
                                <div className="tree" key={idx}>
                                    <Link className="links" to={`/users/${tree._id}`}>
                                        <img
                                            className="tree-images"
                                            src="https://image.flaticon.com/icons/png/64/4319/4319580.png"
                                            onMouseEnter={() => setDataIsShown(true)}
                                            onMouseLeave={() => setDataIsShown(false)}
                                            alt="tree"
                                        />
                                    </Link>
                                    <span className="tree-username">{tree.username}</span>
                                    {dataIsShown && (
                                        <div className="tooltip">
                                            <span>Hovering over {tree.username}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Footer />
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
                            {trees.map((tree, idx) => (
                                <div className="tree" key={idx}>
                                    <Link className="links" to={`/users/${tree._id}`}>
                                        <img
                                            className="tree-images"
                                            src="https://image.flaticon.com/icons/png/64/4319/4319580.png"
                                            onMouseEnter={() => setDataIsShown(true)}
                                            onMouseLeave={() => setDataIsShown(false)}
                                            alt="tree"
                                        />
                                    </Link>
                                    <span className="tree-username">{tree.username}</span>
                                    {dataIsShown && (
                                        <div className="tooltip">
                                            <span>Hovering over {tree.username}</span>
                                        </div>
                                    )}
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
                        <Link to="/register" className="create-tree-btn" id="upload-your-own-button">
                            Create a Tree
                        </Link>
                    </div>
                    <Footer />
                </div>
            );
        }
    };

    if (!trees) {
        return null;
    } else {
        return existingForest();
    }
};

export default Forest;
