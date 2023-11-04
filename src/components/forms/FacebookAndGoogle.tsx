// import { FaFacebook } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import googleAuth from "../../firebase/googleAuth"
// import facebookAuth from "../../firebase/facebookAuth"

function FacebookAndGoogle(){
    return(
        <div className="flex flex-col items-center justify-center gap-2">
            {/* <button 
                className="flex bg-blue-500 w-full p-2 rounded-md drop-shadow-md"
                onClick={facebookAuth}
            >
                <span className="text-2xl">
                    <FaFacebook/>
                </span>
                <span className="flex-1 text-white">
                    Login with Facebook
                </span>
            </button> */}
            <button 
                className="flex bg-white w-full rounded-md p-2 drop-shadow-md"
                onClick={googleAuth}
            >
                <span className="text-2xl">
                    <FcGoogle/>
                </span>
                <span className="flex-1 text-black">
                    Login with Google
                </span>
            </button>
        </div>
    )
}

export default FacebookAndGoogle