import { FaRegBell } from "react-icons/fa"
import { FaUserSecret } from "react-icons/fa6"
import userUID from "../cookies/userUID"
import { useEffect, useState } from "react";
import logedInUser from "../../firebase/data/user/logedInUser";
import { Link } from "react-router-dom";

function Profile(){

    const logedInUID = userUID();
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        const fetchData = async()=>{
            const data = await logedInUser(logedInUID)
            setUserData(data)
        }

        fetchData()
    },[userData])
    

    return(
        <div className="w-full h-full p-2 flex flex-col">
            {/* <div className="w-full flex items-center justify-between">
                <div className="text-2xl drop-shadow-md">
                    <FaRegBell/>
                </div>
                <div className="text-2xl drop-shadow-md">
                    <FaUserSecret/>
                </div>
            </div> */}
            <div className="flex flex-col flex-1 mt-2">
                <div className="flex flex-col items-center w-full bg-taupe rounded-md drop-shadow-lg">
                    
                    <div className="w-full flex flex-col items-center justify-center relative">
                        {/* banner */}
                            {
                                userData.banner ?
                                <img 
                                    src={userData.banner}
                                    className="rounded-t-md h-[8rem] w-full object-cover"
                                    loading="lazy"
                                    />
                                :
                                <div className="rounded-t-md h-[8rem] w-full bg-lightBeige"></div>
                            }

                        {/* profile */}
                        <div className="absolute -bottom-9 bg-taupe rounded-full p-[4px]">
                            <img 
                                src={userData.avatar ? userData.avatar:'/user.jpg'}
                                className="h-[6rem] w-[6rem] rounded-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-start justify-center gap-2 h-full px-5 text-grayishWhite mt-12 mb-6">
                        <div className="flex items-center gap-2 flex-wrap text-sm">
                            <p>Username:</p>
                            <p>{userData.username}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap text-sm">
                            <p>Name:</p>
                            <p>{userData.name}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap text-sm">
                            <p>Email:</p>
                            <p>{userData.email}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-2 flex flex-col flex-grow">
                    <h1 className="text-grayishWhite text-sm">
                        Notifications
                    </h1>
                    <div>

                    </div>
                </div>
                <button className="bg-taupe drop-shadow-md py-3 mt-1 rounded-md">Log out</button>
            </div>
        </div>
    )
}

export default Profile