import { Link } from "react-router-dom"
import FacebookAndGoogle from "./FacebookAndGoogle"
import { useRef, useState} from "react"
import signInUser from "../../firebase/signInUser";
import ResetPassModal from "../Modals/ResetPassModal"

function Login(){

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [error,setError] = useState('')
    const [errorMessage,setErrorMesage] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const openModal = () => {
        setShowModal(true);
    };
  
    const closeModal = () => {
        setShowModal(false);
    };

    const handleLogin =()=>{
        setError('')
        setErrorMesage('')
        setIsLoading(true)

        const emailRegex = /^.+@.+$/;
        if(!passwordRef.current.value){
            setError('password')
            setErrorMesage('Invalid password')
            setIsLoading(false)
            return
        }else if(!usernameRef.current.value || !emailRegex.test(usernameRef.current.value)){
            setError('email')
            setErrorMesage('Invalid email')
            setIsLoading(false)
            return
        }
        const data = {
            email:usernameRef.current.value,
            password:passwordRef.current.value
        }

        signInUser(data)
        .then((message)=>{
            setIsLoading(false)
            if(message === 'error'){
                setErrorMesage('Incorrect email or password')
            }
        })
    }

    return(
        <div className="flex flex-col  w-96">
            <form className="flex flex-col">
                <div className="flex flex-col mb-3">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="johndoe@gmail.com"
                        className="px-2 py-1 rounded-md outline-none text-black w-full"
                        style={{ border: error === 'email' ? '1px solid red' : '1px solid transparent' }}
                        ref={usernameRef}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        className="px-2 py-1 rounded-md outline-none text-black w-full"
                        style={{ border: error === 'password' ? '1px solid red' : '1px solid transparent' }}
                        ref={passwordRef}
                        required
                    />
                </div>
            </form>

            <p className='mt-4 text-center text-sm text-red-600'>
                {errorMessage}
            </p>

            <button 
                onClick={handleLogin}
                className="w-full bg-taupe py-2 rounded-md drop-shadow-md"
            >
                {
                    isLoading ? 
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-3 p-1 w-3 border-[2px] border-white border-b-taupe animate-spin rounded-full"></div>
                            Loading
                        </div>
                    :
                        <>
                            Sign in
                        </>
                }
            </button>

            <button 
                onClick={openModal}
                className="text-center mt-2 text-taupe text-sm"
            >
                Forgot password
            </button>

            <p className="text-center mt-2">
                Don't have an account yet? 
                <Link 
                    to='/form/register'
                    className="text-taupe ms-1"
                >
                    Register
                </Link>
            </p>
            
            <div className="flex items-center w-full my-3">
                <span className="flex-1 border-t-[1px] border-white h-[1px]"></span>
                <p className="px-1">or</p>
                <span className="flex-1 border-t-[1px] border-white h-[1px]"></span>
            </div>

            <FacebookAndGoogle/>
            
            <ResetPassModal showModal={showModal} onClose={closeModal} />
        </div>
    )
}

export default Login