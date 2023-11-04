import { FaRegBell } from "react-icons/fa"
import { FaUserSecret } from "react-icons/fa6"

function Profile(){
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
                            <img 
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuSHLm6k1OWNn1Gh1kCPQJJNnmKDb55h2a1Lii0BLL_7twPfQLlqO9PbiDLGls3whzR5Y&usqp=CAU'
                            className="rounded-t-md h-[10rem] w-full object-cover"
                            loading="lazy"
                            />

                        {/* profile */}
                        <div className="absolute -bottom-12 bg-beige medium:bg-taupe rounded-full p-[4px]">
                            <img 
                                src='https://c4.wallpaperflare.com/wallpaper/885/793/289/anime-darling-in-the-franxx-zero-two-darling-in-the-franxx-wallpaper-preview.jpg'
                                className="h-[8rem] w-[8rem] rounded-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="w-full hidden medium:flex flex-col items-start justify-center gap-1 h-full px-5 text-grayishWhite my-12">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p>Username:</p>
                            <p></p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <p>Name:</p>
                            <p></p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <p>Email:</p>
                            <p></p>
                        </div>
                    </div>
                </div>
                <button className="bg-taupe drop-shadow-md mt-5 py-3 rounded-md">Log out</button>
            </div>
        </div>
    )
}

export default Profile