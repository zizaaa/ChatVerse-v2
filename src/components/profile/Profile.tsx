import { FaRegBell } from "react-icons/fa"
import { FaUserSecret } from "react-icons/fa6"
import userUID from "../cookies/userUID"
import { useEffect, useState } from "react";
import logedInUser from "../../firebase/data/user/logedInUser";

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
            <div className="w-full flex items-center justify-between">
                <div className="text-2xl drop-shadow-md">
                    <FaRegBell/>
                </div>
                <div className="text-2xl drop-shadow-md">
                    <FaUserSecret/>
                </div>
            </div>
            <div className="flex flex-col flex-1 mt-2">
                <div className="flex flex-col items-center w-full bg-taupe rounded-md drop-shadow-lg">
                    
                    <div className="w-full flex flex-col items-center justify-center relative">
                        {/* banner */}
                            {
                                userData.banner ?
                                <img 
                                    src={userData.banner}
                                    className="rounded-t-md h-[10rem] w-full object-cover"
                                    loading="lazy"
                                    />
                                :
                                <div className="rounded-t-md h-[10rem] w-full bg-lightBeige"></div>
                            }

                        {/* profile */}
                        <div className="absolute -bottom-12 bg-beige medium:bg-taupe rounded-full p-[4px]">
                            <img 
                                src={userData.avatar ? userData.avatar:'/user.jpg'}
                                className="h-[8rem] w-[8rem] rounded-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="w-full hidden medium:flex flex-col items-start justify-center gap-1 h-full px-5 text-grayishWhite my-12">
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
                <button className="bg-taupe drop-shadow-md mt-5 py-3 rounded-md">Log out</button>
            </div>
        </div>
    )
}

export default Profile