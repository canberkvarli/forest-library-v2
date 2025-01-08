import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../../actions/sessionActions";
import { TbHelpSquareRounded } from "react-icons/tb";
import { GiTreeDoor } from "react-icons/gi"
import { HiOutlineMusicNote } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import song from "../../assets/audioFiles/Gotama - Inner Sanctuary.mp3";
import Modal from "../Modal/Modal";

const NavBar = () => {
    const [playing, setPlaying] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [showInstructionsModal, setShowInstructionsModal] = useState(false);
    const dispatch = useDispatch();
    const audioRef = useRef(new Audio(song));
    const location = useLocation();

    const loggedIn = useSelector((state) => state.session.isAuthenticated);
    const session = useSelector((state) => state.session);

    const playPause = async () => {
        const audio = audioRef.current;

        if (playing) {
            audio.pause();
        } else {
            try {
                await audio.play();
            } catch (error) {
                console.error("Audio play error:", error);
            }
        }
        setPlaying(!playing);
    };

    const demoLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username: "demo", password: "123456" }));
    };

    const getLinks = () => (
        <div className="flex items-center gap-6">
            {loggedIn ? (
                <>
                    <Link
                        to={`/users/${session.user.id}/profile`}
                        className={`text-emerald-800 hover:bg-emerald-200 rounded-full px-4 py-2 ${location.pathname === `/users/${session.user.id}/profile` ? 'bg-emerald-300' : ''
                            }`}
                    >
                        My Tree
                    </Link>
                    <Link
                        to="/"
                        className={`text-emerald-800 hover:bg-emerald-200 rounded-full px-4 py-2 ${location.pathname === "/" ? 'bg-emerald-300' : ''
                            }`}
                    >
                        Home
                    </Link>
                    <button
                        onClick={playPause}
                        className={`rounded-full p-2 text-white ${playing ? "bg-orange-500" : "bg-gray-400"} hover:opacity-80`}
                    >
                        <HiOutlineMusicNote size={24} className={`${playing ? "text-white" : "text-gray-300"} pe-0.5`} />
                    </button>
                    <button
                        onClick={() => dispatch(logout())}
                        className="text-emerald-800 hover:bg-emerald-200 rounded-full px-4 py-2"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={demoLogin}
                        className="text-emerald-800 hover:bg-emerald-200 rounded-full px-4 py-2"
                    >
                        Demo
                    </button>
                    <button
                        onClick={() => {
                            setShowAuthModal(true);
                            setIsSignup(true);
                        }}
                        className="text-emerald-800 hover:bg-emerald-200 rounded-full px-4 py-2"
                    >
                        Signup
                    </button>
                    <button
                        onClick={() => {
                            setShowAuthModal(true);
                            setIsSignup(false);
                        }}
                        className="text-emerald-800 hover:bg-emerald-200 rounded-full px-4 py-2"
                    >
                        Login
                    </button>
                </>
            )}
        </div>
    );

    return (
        <nav className="bg-emerald-100 border-b border-emerald-300 shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <Link
                    to="/"
                    className="flex items-center text-3xl font-cursive text-emerald-800"
                >
                    <GiTreeDoor size={30} className="mr-2 text-emerald-600" /> {/* Tree icon */}
                    Forest Library
                </Link>
                {getLinks()}
                <button
                    onClick={() => setShowInstructionsModal(true)}
                    className="text-emerald-800 hover:opacity-80"
                >
                    <TbHelpSquareRounded size={30} />
                </button>
            </div>

            {showAuthModal && (
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    isSignup={isSignup}
                />
            )}

            <Modal
                show={showInstructionsModal}
                handleClose={() => setShowInstructionsModal(false)}
            >
            </Modal>
        </nav>
    );
};

export default NavBar;
