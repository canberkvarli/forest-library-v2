// NavBar.js
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../../actions/sessionActions";
import { TbHelpSquareRounded } from "react-icons/tb";
import AuthModal from "../AuthModal/AuthModal";
import song from "../../assets/audioFiles/Gotama - Inner Sanctuary.mp3";
import "./navbar.css";

const NavBar = () => {
    const [playing, setPlaying] = useState(false);
    const [musicBgColor, setMusicBgColor] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false); // Unified state for both modals
    const [isSignup, setIsSignup] = useState(true); // Track whether it's signup or login
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const audioRef = useRef(new Audio(song));

    const loggedIn = useSelector((state) => state.session.isAuthenticated);
    const session = useSelector((state) => state.session);

    const playPause = async () => {
        const audio = audioRef.current;

        if (playing) {
            audio.pause();
            setMusicBgColor("lightgray");
        } else {
            try {
                await audio.play();
                setMusicBgColor("orangered");
            } catch (error) {
                console.error("Audio play error:", error);
            }
        }
        setPlaying(!playing);
    };

    const handleClick = (route) => navigate(route);

    const demoLogin = (e) => {
        e.preventDefault();
        dispatch(login({ username: "demo", password: "123456" }));
    };

    const getLinks = () => (
        <div className="links-container">
            {loggedIn ? (
                <>
                    <div onClick={() => handleClick(`/users/${session.user.id}/profile`)}>My Tree</div>
                    <div onClick={() => handleClick("/")}>Home</div>
                    <div style={{ borderColor: musicBgColor }}>
                        <img id="music-icon" src={""} onClick={playPause} alt="music" />
                    </div>
                    <div onClick={() => dispatch(logout())}>Logout</div>
                </>
            ) : (
                <>
                    <div onClick={demoLogin}>Demo</div>
                    <div onClick={() => { setShowAuthModal(true); setIsSignup(true); }}>Signup</div>
                    <div onClick={() => { setShowAuthModal(true); setIsSignup(false); }}>Login</div>
                </>
            )}
        </div>
    );

    return (
        <div className="nav-bar-container">
            <div className="nav-bar-logo" onClick={() => handleClick("/")}>
                Forest Library
            </div>
            {showAuthModal && (
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    isSignup={isSignup}
                />
            )}
            <div className="nav-icons" id="instructions-icon">
                <TbHelpSquareRounded
                    size={70}
                    onClick={() => alert("Help info")}
                    style={{ color: "black" }}
                />
            </div>
            {getLinks()}
        </div>
    );
};

export default NavBar;
