import { useRef,useState } from "react"
import searchUser from "../../firebase/data/user/searchUser";

function PrivateChat(){
    const [searchedUser, setSearchedUser] = useState({})
    const [isSearch, setIsSearch] = useState(false)

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
                console.log(res)
            })
    
        }, 300); // Adjust the debounce delay as needed
    
        // Handle the onchange event with the debounced search function
        // use debounce to delay the request of data from server
        const handleSearchUser = (event) => {
            const query = event.target.value;
            debounceSearch(query);
        };

        const handleCheckPrivateMessageRoute = (id) =>{
            console.log(id)
        }

    return(
        <div className="bg-darkBeige h-full rounded-bl-lg flex flex-row">
            <div className="p-2 w-[13.5rem]">
                <div className="w-full relative flex flex-col">
                    <input 
                        type="text" 
                        placeholder="Find or start a conversation"
                        className="w-full p-1 rounded-sm outline-none bg-taupe placeholder:text-grayishWhite placeholder:text-sm"
                        onChange={(e)=>{handleSearchUser(e)}}
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

                    {/* dummy user 1 */}
                    {/* <div className="w-full flex items-center gap-2 bg-taupe p-1 rounded-sm">
                        <div className="relative w-12 h-12 rounded-full">
                            <img 
                                src="https://randomuser.me/api/portraits/men/10.jpg"
                                className="w-full h-full rounded-full"
                            />
                            <div className="h-[.9rem] w-[.9rem] rounded-full bg-green-500 absolute bottom-0 right-0 border-taupe border-2"></div>
                        </div>
                        <div>
                            <p>zizaaa</p>
                            <p className="text-[10px]">Online</p>
                        </div>
                    </div> */}

                </div>
            </div>
            <div className="bg-beige flex-grow p-2">
                conversations
            </div>
        </div>
    )
}

export default PrivateChat