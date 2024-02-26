
import mainLogo from '../images/Logo1.PNG'
import altLogo from '../images/Logo2.PNG'

const Nav = ({minimal, setShowModal, showModal,setIsSignUp,isSignUp}) => {
    const authToken = true;
    const handleClick = () =>{
        setShowModal(true)
        setIsSignUp(false)
    }
    return (
        <nav>
            <div className= "logoContainer">
                <img className= 'logo' src={minimal ? mainLogo : altLogo}/>
            </div>
            {authToken && !minimal && <button className="navBtn" onClick={handleClick} disabled={showModal}>Login</button>}
        </nav>
    );
}
export default Nav