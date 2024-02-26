import Nav from '../components/Nav'
import { useState } from "react";
import AuthModal from "../components/AuthModal";

const Homepage = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)

    const authToken = false
    const handleClick = () =>{
        console.log('clicked')
        setShowModal(true)
        setIsSignUp(true)
    }
    return (
        <div className="HomeOverview">
        <Nav minimal={false}
             setShowModal = {setShowModal}
             showModal={showModal}
            setIsSignUp={setIsSignUp}
            isSignUp={isSignUp}/>
        <div className="Home">
            <h1 className="primaryTitle">Slide'n Exchange!</h1>
            <button className="primaryBtn" onClick={handleClick}>
                {authToken ? "Sign Out":"Create Account"}
            </button>
            {showModal && (
                <AuthModal setShowModal = {setShowModal} setIsSignUp={setIsSignUp} isSignUp={isSignUp}/>
            )}
        </div>
        </div>
    );
}
export default Homepage