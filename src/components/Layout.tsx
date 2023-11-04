import Nav from "./navbar/Nav"
import { Outlet } from "react-router-dom"
import Profile from "./profile/Profile"

function Layout(){
    return(
        <div className="flex w-[60rem] h-[35rem] rounded-lg drop-shadow-lg">
            <div className="flex flex-col flex-grow h-full">
                <Nav/>
                <Outlet/>
            </div>
            <div className="bg-beige w-72 rounded-tr-lg rounded-br-lg">
                <Profile/>
            </div>
        </div>
    )
}

export default Layout