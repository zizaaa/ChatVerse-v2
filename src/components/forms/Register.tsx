import { useState,useRef } from "react"
import { Link } from "react-router-dom"
import registerUser from "../../firebase/registerUser"
import FacebookAndGoogle from "./FacebookAndGoogle";

function Register(){

    const [name, setName] = useState('');
    const [username, setuserName] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [email, setEmail] = useState('');

    const [avatar, setAvatar] = useState(null);
    const [avatarContent, setAvatarContent] = useState('');
    const [banner, setBanner] = useState(null);
    const [bannerContent, setBannerContent] = useState('');

    const [error, setError] = useState('');
    const [errorMessage, setIsErrorMessage] = useState('');

    const aboutRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const inputValidation =()=>{
        setError('');
        setIsErrorMessage('');

        if(username.length < 4){
            setIsErrorMessage("Username must be greater than 4 characters.");
            setError('username');
            return
        }

        if(pass != confirmPass){
            setIsErrorMessage("Password not matched");
            setError('password');
            return
        }

        if(!pass || !confirmPass){
            setIsErrorMessage("Password is required!");
            setError('password');
            return
        }

        if(pass.length < 6 || confirmPass.length < 6){
            setIsErrorMessage("Password must be 6 character");
            setError('password');
            return
        }
        if(!avatar || !banner){
            setIsErrorMessage("Avatar and Banner is Required");
            return
        }

        const emailRegex = /^.+@.+$/;
        if(!emailRegex.test(email)){
            setIsErrorMessage("Invalid Email");
            setError('email');
            return
        }
        return {
            username:username,
            name:name,
            password:pass,
            email:email,
            avatar:avatar,
            banner:banner,
            about:aboutRef.current.value
        }
    }

    const handleFileChange = (event:any, setContent:any, setFile:any) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setContent(e.target.result);
            };

            reader.readAsDataURL(file);
        }

        setFile(file);
    };

        const handleAvatarChange = (event:any) => {
            handleFileChange(event, setAvatarContent, setAvatar);
        };
        
        const handleBannerChange = (event:any) => {
            handleFileChange(event, setBannerContent, setBanner);
        };

    const handleInputChange = (field:any, val:any)=>{
        setIsErrorMessage("");
        setError('');
        
        switch(field){
            case 'username':
                setuserName(val);
                break;
            case 'name':
                setName(val);
                break;
            case 'email':
                setEmail(val);
                break;
            case 'pass':
                setPass(val);
                break;
            case 'confirmPass':
                setConfirmPass(val);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        const data = inputValidation();

        if(data){
            setIsLoading(true);

            registerUser(data)
            .then((message)=>{
                setIsLoading(false)
                if(message === 'Firebase: Error (auth/email-already-in-use).'){
                    setIsErrorMessage("Email already exist!");
                    setError('email');
                }
            })
            .catch((error)=>{
                setIsLoading(false)
                console.log(error)
            })
        }
        // console.log(data)
    }

    return(
        <div className="flex flex-col-reverse gap-2 w-full h-full overflow-auto medium:flex-row items-center medium:justify-center">
            <div className="flex items-center justify-center w-full small:flex-1 h-full mt-10 mb-5 medium:mb-0 medium:mt-0">
                <form className="flex flex-col w-[90%] ">
                    <div className="flex flex-col mb-2">
                        <label htmlFor="Username">Username</label>
                        <input 
                            type="text" 
                            placeholder="johndoe01"
                            name="Username"
                            className="px-2 py-1 rounded-md outline-none text-black"
                            value={username}
                            onChange={(e)=>{handleInputChange('username' ,e.target.value)}}
                            id="username"
                            required
                            style={{ border: error === 'username' ? '1px solid red' : '1px solid transparent' }}
                        />
                    </div>
                    <div className="flex flex-col small:flex-row items-center w-full gap-2 mb-2">
                        <div className="flex flex-col w-full small:flex-1">
                            <label htmlFor="Name">Name</label>
                            <input 
                                type="text" 
                                placeholder="ex. John Doe"
                                name="Name"
                                className="px-2 py-1 flex-1 rounded-md outline-none text-black w-full"
                                value={name}
                                onChange={(e)=>{handleInputChange('name', e.target.value)}}
                                id="name"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center mb-2 w-full">
                        <div className="flex flex-col w-full">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                className="px-2 py-1 flex-1 rounded-md outline-none text-black w-full"
                                placeholder="johndoe@gmail.com"
                                value={email}
                                onChange={(e)=>{handleInputChange('email', e.target.value)}}
                                style={{ border: error === 'email' ? '1px solid red' : '1px solid transparent' }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center mb-2 w-full">
                        <div className="flex flex-col">
                            <label htmlFor="avatar">Avatar</label>
                            <input 
                                type="file" 
                                name="avatar" 
                                accept="image/*" 
                                multiple={false} 
                                onChange={(e)=>{handleAvatarChange(e)}}
                                className="file:border-none file:rounded-md file:px-2 file:py-1 file:text-black file:cursor-pointer w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Banner">Banner</label>
                            <input 
                                type="file" 
                                name="Banner" 
                                accept="image/*" 
                                multiple={false}
                                onChange={(e)=>{handleBannerChange(e)}}
                                className="file:border-none file:rounded-md file:px-2 file:py-1 file:text-black file:cursor-pointer w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col small:flex-row items-center gap-2">
                        <div className="flex flex-col w-full">
                            <label htmlFor="Password">Password</label>
                            <input 
                                type="password" 
                                placeholder="Password"
                                name="Password"
                                className="px-2 py-1 rounded-md outline-none text-black w-full"
                                value={pass}
                                onChange={(e)=>{handleInputChange('pass', e.target.value)}}
                                id="password"
                                style={{ border: error === 'password' ? '1px solid red' : '1px solid transparent' }}
                                required
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="ConfirmPassword">Confirm password</label>
                            <input 
                                type="password" 
                                placeholder="Confirm password"
                                name="ConfirmPassword"
                                className="px-2 py-1 rounded-md outline-none text-black w-full"
                                value={confirmPass}
                                onChange={(e)=>{handleInputChange('confirmPass', e.target.value)}}
                                id="confirmpassword"
                                style={{ border: error === 'password' ? '1px solid red' : '1px solid transparent' }}
                                required
                            />
                        </div>
                    </div>

                    <p className='mt-4 text-center text-sm text-red-600'>
                        {errorMessage}
                    </p>
                    <button 
                        onClick={(e)=>{handleSubmit(e)}}
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
                                    Sign up
                                </>
                        }
                    </button>

                    <p className="text-center mt-2">
                        Already have an account? 
                        <Link 
                            to='/form'
                            className="text-taupe ms-1"
                        >
                            Log in
                        </Link>
                    </p>
                    <div className="flex items-center w-full my-3">
                        <span className="flex-1 border-t-[1px] border-white h-[1px]"></span>
                        <p className="px-1">or</p>
                        <span className="flex-1 border-t-[1px] border-white h-[1px]"></span>
                    </div>

                    <FacebookAndGoogle/>

                </form>
            </div>

            {/* profile preview */}
            <div className="flex flex-col w-full extraSmall:w-[90%] medium:w-[40%] mx-0 medium:mx-5 h-auto">
                <h1 className="text-grayishWhite mb-2">Profile Preview</h1>

                <div className="flex flex-col items-center w-full bg-taupe rounded-md drop-shadow-lg">
                    
                    <div className="w-full flex flex-col items-center justify-center relative">
                        {/* banner */}
                        {
                            bannerContent ?
                            <img 
                            src={bannerContent}
                            className="rounded-t-md h-[10rem] w-full object-cover"
                            loading="lazy"
                            />
                            :
                            <div className="rounded-t-md h-[10rem] w-full bg-lightBeige"></div>
                        }

                        {/* profile */}
                        <div className="absolute -bottom-12 bg-beige medium:bg-taupe rounded-full p-[4px]">
                            <img 
                                src={avatarContent ? avatarContent:'/user.jpg'}
                                className="h-[8rem] w-[8rem] rounded-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-start h-full text-grayishWhite mt-10 mb-4 px-2">
                        <div className="flex pb-2 flex-col items-start flex-wrap w-full border-b-[1px] border-beige">
                            <h1 className="text-lg">{name}</h1>
                            <h2 className="text-sm">@{username}</h2>
                        </div>
                        <div className="flex flex-col gap-2 mt-2 w-full">
                            <p className="text-[12px] uppercase">About</p>
                            <textarea 
                                className="w-full text-black p-2 outline-none resize-none bg-beige text-white rounded-md placeholder:text-black" 
                                rows={4}
                                autoFocus
                                placeholder="Say something..."
                                ref={aboutRef}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register