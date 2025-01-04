import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../../actions/sessionActions";
import { TbHelpSquareRounded } from "react-icons/tb";
import Modal from "../Modal/Modal";
import song from "../../assets/audioFiles/Gotama - Inner Sanctuary.mp3";
import "./navbar.css";

const NavBar = () => {
    const [playing, setPlaying] = useState(false);
    const [musicBgColor, setMusicBgColor] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const audioRef = useRef(new Audio(song)); // Use ref to persist audio instance

    const loggedIn = useSelector((state) => state.session.isAuthenticated);
    const session = useSelector((state) => state.session);

    useEffect(() => {
        const audio = audioRef.current;
        const handleAudioEnd = () => setPlaying(false);
        audio.addEventListener("ended", handleAudioEnd);

        return () => audio.removeEventListener("ended", handleAudioEnd);
    }, []);

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
                    <div onClick={() => handleClick("/register")}>Signup</div>
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
            <Modal show={showModal} handleClose={() => setShowModal(false)} />
            <div className="nav-icons" id="instructions-icon">
                <TbHelpSquareRounded
                    size={70}
                    onClick={() => setShowModal(true)}
                    style={{ color: "black" }}
                />
            </div>
            {getLinks()}
        </div>
    );
};

export default NavBar;
