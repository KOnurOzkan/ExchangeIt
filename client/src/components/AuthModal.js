import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import{useCookies} from "react-cookie";

const AuthModal = ({setShowModal,isSignUp}) => {
    const [ email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const[cookies,setCookie,removeCookie] = useCookies(['user'])

    const navigate = useNavigate()
    console.log(email,password,confirmPassword)
    const handleClick = () =>{
        setShowModal(false)
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if( isSignUp && password !== confirmPassword){
                setError("Your passwords do not match")
                return
            }
            console.log('posting', email, password)
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`,{email,password})

            setCookie('Token',response.data.token)
            setCookie('ItemId', response.data.itemId)

            const success = response.status === 201

            if(success && isSignUp) navigate('/onboarding')
                else if(success && !isSignUp) navigate('/dashboard')

            window.location.reload()
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div className="auth-modal">
            <div className="closeIcon" onClick={handleClick}>ⓧ</div>
            <h2>{isSignUp ? "CREATE ACCOUNT": "LOG IN"}</h2>
            <p>By creating/entering your account, you agree to our current Privacy Policy on how we can use your data.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondaryBtn" type="submit"/>
                <p>{error}</p>
            </form>
        </div>
    );
}
export default AuthModal