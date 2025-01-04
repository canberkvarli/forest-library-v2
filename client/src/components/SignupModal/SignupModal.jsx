import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/sessionActions";

// eslint-disable-next-line react/prop-types
const SignupModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password2: "",
    });

    const dispatch = useDispatch();
    const errors = useSelector((state) => state.errors.session);
    const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            onClose(); // Close the modal if the user is authenticated
        }
    }, [isAuthenticated, onClose]);

    // Handle closing the modal if the user clicks outside of it
    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            style={{ fontFamily: "cursive" }}
            className="fixed inset-0 bg-emerald-900 bg-opacity-40 flex items-center justify-center z-50"
            onClick={handleOutsideClick} // Close modal on click outside
        >
            <div className="bg-emerald-50 rounded-lg shadow-lg w-full max-w-md relative">
                {/* X button in the top-right corner */}
                <button
                    className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-800"
                    onClick={onClose}
                >
                    ✕
                </button>
                <div className="p-4 border-b border-emerald-400">
                    <h2 className="text-xl font-semibold text-emerald-800">Sign Up</h2>
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
                    </div>
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
                    </div>
                    {errors && (
                        <div className="text-red-500 text-sm">{errors.join(", ")}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupModal;
