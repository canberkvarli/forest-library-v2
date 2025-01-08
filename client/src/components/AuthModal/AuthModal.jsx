import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, login, clearSessionErrors } from "../../actions/sessionActions";
import { fetchUsers } from "../../actions/treeActions";

// eslint-disable-next-line react/prop-types
const AuthModal = ({ onClose, isSignup }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password2: "",
    });

    const [touchedFields, setTouchedFields] = useState({
        username: false,
        password: false,
        password2: false,
    });

    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errors.session);
    const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setTouchedFields({ ...touchedFields, [name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = isSignup
            ? formData
            : { username: formData.username, password: formData.password };

        isSignup ? dispatch(signup(payload)) : dispatch(login(payload));
    };

    useEffect(() => {
        if (isAuthenticated) {
            onClose();
            dispatch(fetchUsers());
        }
    }, [isAuthenticated, onClose, dispatch]);

    useEffect(() => {
        setFormData({ username: "", password: "", password2: "" });
        setTouchedFields({ username: false, password: false, password2: false });
        dispatch(clearSessionErrors());
    }, [isSignup, dispatch]);

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 bg-emerald-900"
            onClick={handleOutsideClick}
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-800"
                    onClick={onClose}
                >
                    ✕
                </button>
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-emerald-800">
                        {isSignup ? "Sign Up" : "Login"}
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-emerald-800">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border border-emerald-400 text-emerald-800 rounded-lg p-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                        {touchedFields.username && errors.username && (
                            <div className="text-red-500 text-sm">{errors.username}</div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-emerald-800">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-emerald-400 text-emerald-800 rounded-lg p-2 focus:ring-emerald-500 focus:border-emerald-500"
                            required
                        />
                        {touchedFields.password && errors.password && (
                            <div className="text-red-500 text-sm">{errors.password}</div>
                        )}
                    </div>
                    {isSignup && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-emerald-800">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="password2"
                                value={formData.password2}
                                onChange={handleChange}
                                className="w-full border border-emerald-400 text-emerald-800 rounded-lg p-2 focus:ring-emerald-500 focus:border-emerald-500"
                                required
                            />
                            {touchedFields.password2 && errors.password2 && (
                                <div className="text-red-500 text-sm">{errors.password2}</div>
                            )}
                        </div>
                    )}
                    {errors.error && (
                        <div className="text-red-500 text-sm text-center mt-2">
                            {errors.error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700"
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;

