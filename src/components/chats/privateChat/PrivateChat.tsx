import { useEffect, useRef,useState } from "react"
import { Link, Outlet,useNavigate } from "react-router-dom"
import searchUser from "../../../firebase/data/user/searchUser";
import checkChatHeads from "../../../firebase/data/user/checkChatHeads";
import getChatHeads from "../../../firebase/data/PrivateChats/getChatHeads";

function PrivateChat(){
    const [searchedUser, setSearchedUser] = useState({})
    const [isSearch, setIsSearch] = useState(false)
    const [search, setSearch] = useState('')
    const [chatHeads, setChatHeads] = useState([])
    const navigate = useNavigate()

            // Define the debounce function
            const debounce = (func, delay) => {
                let timeoutId;
                return function (...args) {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        func.apply(this, args);
                    }, delay);
                };
            }
    
    
        // Create a debounced search function
        const debounceSearch = debounce((query) => {
            setIsSearch(true);
    
            if (query === '') {
                setIsSearch(false);
                return;
            }

            searchUser(query)
            .then((res)=>{
                setSearchedUser(res)
            })
    
        }, 300); // Adjust the debounce delay as needed
    
        // Handle the onchange event with the debounced search function
        // use debounce to delay the request of data from server
        const handleSearchUser = (event) => {
            const query = event.target.value;
            setSearch(query)
            debounceSearch(query);
        };

        const handleCheckPrivateMessageRoute = (id) =>{
            console.log(id)
            checkChatHeads(id)
            .then((res)=>{
                console.log(res)
                navigate(`/private-chats/${res}`)
                setIsSearch(false);
                setSearch('')
            })
        }

        useEffect(() => {
            const fetchData = async () => {
                const unsubscribe = await getChatHeads(data => {
                    setChatHeads(data);
                });
                
                // Clean up the listener when the component unmounts
                return () => unsubscribe();
            };
            
            fetchData();
        }, []);

    return(
        <div className="bg-darkBeige h-full rounded-bl-lg flex flex-row">
            <div className="p-2 w-[13.5rem]">
                <div className="w-full relative flex flex-col">
                    <input 
                        type="text" 
                        placeholder="Find or start a conversation"
                        className="w-full p-1 rounded-sm outline-none bg-taupe placeholder:text-grayishWhite placeholder:text-sm"
                        onChange={(e)=>{handleSearchUser(e)}}
                        value={search}
                    />
                    {
                        isSearch ?
                        <div className="flex flex-row items-center bg-taupe rounded-b-sm absolute bottom-[-4.1rem] left-0 right-0 z-10 p-1 h-16">
                            {
                                searchedUser != null ?
                                <button 
                                    onClick={()=>{handleCheckPrivateMessageRoute(searchedUser.userId)}}
                                    className="flex flex-row items-center gap-2 w-full"
                                >
                                    <div className="relative w-10 h-10 rounded-full">
                                        <img 
                                            src={searchedUser.avatar}
                                            className="w-full h-full rounded-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="h-[.8rem] w-[.8rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm">{searchedUser.name}</p>
                                        <p className="text-[10px]">Online</p>
                                    </div>
                                </button>
                                :
                                <p className="text-sm text-grayishWhite">User not found</p>
                            }
                        </div>
                        :
                        null
                    }
                </div>
                <div className="mt-3 w-full flex flex-col gap-1 overflow-auto max-h-[28.5rem]">

                    {
                        chatHeads != undefined ?
                        chatHeads.map((chatHead,index)=>(
                            <Link to={{pathname:`/private-chats/${chatHead.conversationID}`}} state = {{data:chatHead}} className="w-full flex items-center gap-2 p-1 rounded-sm" key={index}>
                                <div className="relative w-12 h-12 rounded-full">
                                    <img 
                                        src={chatHead.avatar}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                    <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                                </div>
                                <div>
                                    <p>{chatHead.name}</p>
                                    <p className="text-[10px]">Online</p>
                                </div>
                            </Link> 
                        ))
                        :
                        null
                    }
                </div>
            </div>
            <div className="bg-beige flex-grow p-2">
                <Outlet/>
            </div>
        </div>
    )
}

export default PrivateChat