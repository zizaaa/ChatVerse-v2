import userUID from "../cookies/userUID"
import { useEffect, useState,useRef } from "react";

import logedInUser from "../../firebase/data/user/logedInUser";
import Cookies from 'js-cookie'
import updateUser from "../../firebase/data/user/updateUser";

function Profile(){

    const logedInUID = userUID();
    const [userData, setUserData] = useState({});
    const [avatar, setAvatar] = useState('');
    const [avatarContent, setAvatarContent] = useState('');
    const [banner, setBanner] = useState('');
    const [bannerContent, setBannerContent] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [isEditName, setIsEditName] = useState(false);
    const nameRef = useRef(null);
    const [isEditAbout, setIsEditAbout] = useState(false);
    const aboutRef = useRef(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const data = await logedInUser(logedInUID);
            setUserData(data);
        }

        fetchData()
    },[userData])

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
        setIsChanged(true);
    };

    const handleAvatarChange = (event:any) => {
        handleFileChange(event, setAvatarContent, setAvatar);
    };
    
    const handleBannerChange = (event:any) => {
        handleFileChange(event, setBannerContent, setBanner);
    };

    const handleEditName =()=>{
        setIsChanged(true);
        setIsEditName(true)
    }
    const handleEditAbout =()=>{
        setIsChanged(true);
        setIsEditAbout(true)
    }

    const handleSaveChange = ()=>{
        let data = {
            uid:logedInUID,
            avatar,
            banner,
            name:nameRef.current?.value,
            about:aboutRef.current?.value
        }
        updateUser(data)
        setIsEditName(false);
        setIsEditAbout(false);
        setIsChanged(false)
    }

    const handleDiscardChanges =()=>{
        setAvatar('');
        setAvatarContent('');
        setBanner('');
        setBannerContent('');

        nameRef.current = null;
        aboutRef.current = null;

        setIsEditName(false);
        setIsEditAbout(false);
        setIsChanged(false);
    }
    
    const handleLogOut =()=>{
        Cookies.remove('userUID');
        Cookies.remove('accessToken');

        location.reload();
    }
    return(
        <div className="w-full h-full p-2 flex flex-col">
            <div className="flex flex-col flex-1 mt-2 overflow-auto">
                <div className="flex flex-col items-center pb-3 flex-grow bg-taupe rounded-md drop-shadow-lg">
                    
                    <div className="w-full flex flex-col items-center justify-center relative">
                        {/* banner */}
                        <div className={`group overflow-hidden relative rounded-t-md h-[10rem] w-full ${!userData.banner && !bannerContent && 'bg-lightBeige'}`}>
                            {(userData.banner || bannerContent) && (
                                <img 
                                src={bannerContent ? bannerContent:userData.banner}
                                className="rounded-t-md h-[10rem] w-full object-cover"
                                loading="lazy"
                                />
                            )}
                            <label 
                                htmlFor="banner" 
                                className="absolute top-2 right-0 px-2 bg-beige text-sm rounded-s-sm translate-x-20 group-hover:translate-x-0 transition-transform duration-300 ease-in-out cursor-pointer"
                            >
                                Upload
                                <input 
                                type="file"
                                id="banner"
                                className="sr-only"
                                accept="image/*" 
                                multiple={false} 
                                onChange={(e) => { handleBannerChange(e) }}
                                />
                            </label>
                        </div>

                        {/* profile */}
                        <div className="group absolute -bottom-9 left-2 bg-taupe rounded-full p-[4px] overflow-hidden">
                            <img 
                                src={avatarContent ? avatarContent:userData.avatar ? userData.avatar : '/user.jpg'}
                                className="h-[6rem] w-[6rem] rounded-full object-cover"
                                loading="lazy"
                                alt="User Avatar"
                            />

                            <label htmlFor="profile" className="absolute bottom-0 pb-1 cursor-pointer right-2 left-2 text-center bg-beige text-sm group-hover:translate-y-0 transition-transform duration-300 ease-in-out translate-y-7">
                                Upload
                                <input 
                                    type="file"
                                    id="profile"
                                    className="sr-only"
                                    accept="image/*" 
                                    multiple={false} 
                                    onChange={(e)=>{handleAvatarChange(e)}}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-start h-full text-grayishWhite mt-10 px-2">
                        <div className="flex pb-2 flex-col items-start flex-wrap w-full border-b-[1px] border-beige">
                            {
                                isEditName ?
                                <input 
                                    type='text'
                                    className="outline-none bg-beige rounded-sm p-1 placeholder:text-black"
                                    ref={nameRef}
                                    placeholder={userData.name}
                                    autoFocus
                                />
                                :
                                <h1 
                                    className="text-lg cursor-pointer" 
                                    onClick={handleEditName}
                                >
                                    {userData.name}
                                </h1>
                            }
                            <h2 className="text-sm">@{userData.username}</h2>
                            {/* <h3 className="text-sm">{userData.email}</h3> */}
                        </div>
                        <div 
                            className="cursor-pointer flex h-40 w-full flex-col items-start gap-2 flex-wrap mt-2"
                            onClick={handleEditAbout}
                        >
                            <p className="text-[12px] uppercase w-full">About</p>
                            {
                                isEditAbout ?
                                <textarea 
                                    className="w-full text-black p-2 outline-none resize-none bg-beige text-white rounded-md placeholder:text-black" 
                                    rows={4}
                                    autoFocus
                                    placeholder={userData.about}
                                    ref={aboutRef}
                                />
                                :
                                <p className="text-sm w-full max-h-32 overflow-auto">
                                    {
                                        userData.about
                                    }
                                </p>
                            }
                        </div>
                        <button
                            className={`bg-darkBeige w-full mt-3 py-2 rounded-sm drop-shadow-md ${isChanged ? 'flex':'hidden'} items-center justify-center`}
                            onClick={handleSaveChange}
                        >
                            Save changes
                        </button>
                        <button
                            className={`bg-darkBeige w-full mt-3 py-2 rounded-sm drop-shadow-md ${isChanged ? 'flex':'hidden'} items-center justify-center`}
                            onClick={handleDiscardChanges}
                        >
                            Discard changes
                        </button>
                    </div>
                </div>

                <button 
                    onClick={handleLogOut}
                    className="bg-taupe drop-shadow-md py-3 mt-1 rounded-md"
                >
                    Log out
                </button>
            </div>
        </div>
    )
}

export default Profile