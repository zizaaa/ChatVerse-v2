import { NavLink } from "react-router-dom"

function Nav(){
    return(
        <div className="flex bg-beige rounded-tl-lg">
            <NavLink 
                to='/' 
                className={
                    ({isActive})=> isActive ? 
                        'p-2 rounded-tl-lg bg-darkBeige'
                    :
                        'p-2 rounded-tl-lg'
                }
            >
                    Global Chats
            </NavLink>
            {/* <NavLink 
                to='/private-chats' 
                className={
                    ({isActive})=> isActive ? 
                        'p-2 bg-darkBeige border-x-[1px] border-[#a69988]'
                    :
                        'p-2 border-x-[1px] border-[#a69988]'
                }
            >
                Private Chats
            </NavLink>
            <NavLink 
                to='/discussions' 
                className={
                    ({isActive})=> isActive ? 
                        'p-2 bg-darkBeige'
                    :
                        'p-2'
                }
            >
                Discussions
            </NavLink> */}
            <NavLink 
                to='/secret-messages' 
                className={
                    ({isActive})=> isActive ? 
                        'p-2 bg-darkBeige'
                    :
                        'p-2'
                }
            >
                Secret Message
            </NavLink> 
        </div>
    )
}

export default Nav