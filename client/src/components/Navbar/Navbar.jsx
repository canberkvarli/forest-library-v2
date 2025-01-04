import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../../actions/sessionActions";
import { TbHelpSquareRounded } from "react-icons/tb";
import SignupModal from "../SignupModal/SignupModal"
import song from "../../assets/audioFiles/Gotama - Inner Sanctuary.mp3";
import "./navbar.css";

const NavBar = () => {
    const [playing, setPlaying] = useState(false);
    const [musicBgColor, setMusicBgColor] = useState("");
    const [showSignupModal, setShowSignupModal] = useState(false);
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
                    <div onClick={() => setShowSignupModal(true)}>Signup</div>
                    <div onClick={() => handleClick("/login")}>Login</div>
                </>
            )}
        </div>
    );

    return (
        <div className="nav-bar-container">
            <div className="nav-bar-logo" onClick={() => handleClick("/")}>
                Forest Library
            </div>
            {showSignupModal && (
                <SignupModal onClose={() => setShowSignupModal(false)} />
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
