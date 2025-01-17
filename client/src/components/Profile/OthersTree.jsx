import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MyTree from "../MyTree/MyTree"
import './profile.css';
import { fetchLeavesByUserId } from "../../actions/leafActions"
import { fetchUsers } from '../../actions/treeActions';
import { fetchUser } from '../../actions/treeActions';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const OthersTree = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);
    const { user_id } = useParams();
    const leaves = useSelector(state =>
        Object.values(state.entities.leaves).filter(leaf => leaf.userId === user_id)
    );
    const currentTree = useSelector(state => fetchUser(state, user_id));

    useEffect(() => {
        if (user_id) {
            dispatch(fetchLeavesByUserId(user_id));
        }
        dispatch(fetchUsers());
    }, [dispatch, user_id]);


    return (
        <div>
            <div className='profile-page-container'>
                {(currentUser && currentUser.id === user_id) && (
                    <div className='profile-page-left'>
                        <p className="search-placeholder">
                            Search your book here! Example: The Little Prince
                        </p>
                        <Link to="/search">Add A Leaf</Link>
                    </div>
                )}
                {currentTree[0] && currentTree[0]._id !== currentUser.id && (
                    <div className='other-page-left'>
                        <div className='other-page-title'>
                            Welcome to {currentTree[0].username}&apos;s tree
                        </div>
                        {leaves.length > 0 ? (
                            <div className='other-page-sub'>
                                Here you can click on a leaf to see what {currentTree[0].username} has been reading!
                            </div>
                        ) : (
                            <div>
                                <div className='other-page-sub'>
                                    {currentTree[0].username}&apos;s tree is currently empty 🙁
                                </div>
                                <Link to='/'>Back to home</Link>
                            </div>
                        )}
                    </div>
                )}
                <div className='profile-page-other'>
                    <div className='profile-page-mid-right'>
                        <MyTree leaves={leaves} currentUser={currentUser} />
                        <div className='profile-page-right'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OthersTree;
