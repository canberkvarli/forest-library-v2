import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createLeaf } from "../../actions/leafActions"
import '../search/search.css';

// eslint-disable-next-line react/prop-types
const AddLeaf = ({ bookTitle, bookAuthor, setDetailComponent }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const session = useSelector((state) => state.session);

    const leaf = {
        title: bookTitle,
        userId: session.user.id,
        author: bookAuthor,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDetailComponent();
        dispatch(createLeaf(leaf));
        navigate(`/users/${session.user.id}/profile`);
    };

    return (
        <div className="add-leaf-div">
            <h2>Add Leaf</h2>
            <form onSubmit={handleSubmit} className="form-add-leaf">
                <input
                    type="text"
                    className="btn"
                    value={leaf.title}
                    readOnly
                />
                <br />
                <input
                    type="text"
                    className="btn"
                    value={leaf.author[0]}
                    readOnly
                />
                <input className="btn-submit" type="submit" value="Submit" />
            </form>
            <br />
        </div>
    );
};

export default AddLeaf;
