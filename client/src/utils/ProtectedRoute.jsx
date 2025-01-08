import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal/AuthModal";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return (
            <AuthModal
                onClose={() => navigate("/")}
                isSignup={true}
            />
        );
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
