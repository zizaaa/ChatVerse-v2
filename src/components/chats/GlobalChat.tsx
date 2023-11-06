import { useEffect, useState, useRef } from "react";

import { IoSend } from "react-icons/io5"
import { BsPlusCircleFill,BsThreeDots } from "react-icons/bs"
import { RiEmojiStickerLine } from "react-icons/ri"
import { BiShare } from "react-icons/bi"

import getworldChatsData from "../../firebase/data/worldchat/getworldChatsData";
import postworldChat from "../../firebase/data/worldchat/postworldChat";
import getUser from "../../firebase/data/user/getUser";
import userUID from "../cookies/userUID";
import EmojiModal from "../Modals/EmojiModal";

function GlobalChat() {
    const logedInUID = userUID()

    const chatData = getworldChatsData('worldChats');
    const messageRef = useRef(null);
    const [hasMessage, setHasMessage] = useState(false)
    const chatContainerRef = useRef();
    const [todaysDate, setTodaysDate] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [userDataMap, setUserDataMap] = useState({});

    const fetchUserDataForMessages = async (messages: { data: { senderUID: unknown; } | { senderUID: string | number; }; }[]) => {
        const userDataPromises = messages.map((message: { data: { senderUID: unknown; }; }) => {
            return getUser(message.data.senderUID);
        });

        const userDataList = await Promise.all(userDataPromises);

        const userDataMap = {};
        messages.forEach((message: { data: { senderUID: string | number; }; }, index: string | number) => {
            userDataMap[message.data.senderUID] = userDataList[index];
        });

        setUserDataMap(userDataMap);
    };

    useEffect(() => {
        fetchUserDataForMessages(chatData);
        // Scroll to the bottom of the chat container
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [chatData]);

    useEffect(()=>{
        //date today
        const date = new Date();  
        const months = ['January', 'February', 'March', 'April', 'May',  'June', 'July', 'August', 'September', 'October', 'November', 'December']

        const dateToday = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

        setTodaysDate(dateToday)
    },[])

    const handleTypeMessage =(e)=>{
        console.log(messageRef.current.value)
        if(messageRef.current.value === ''){
            setHasMessage(false)
        }else{
            setHasMessage(true)
        }
    }

    const handleEmojiSelect = (emoji) => {
        // Insert the emoji into the message input field
        if (messageRef.current) {
            messageRef.current.value += emoji;
            setHasMessage(true); // Optionally set hasMessage to true
        }
    };

    const handleSendChat = () => {
        const message = {
            message: messageRef.current.value != '' ? messageRef.current.value:'👋',
        };
        postworldChat(message);
        messageRef.current.value = '';
        setHasMessage(false)
    }

    return (
        <div className="bg-darkBeige h-full p-2 rounded-bl-lg flex flex-col relative">
            <div 
                ref={chatContainerRef}
                className="w-full h-[29rem] overflow-auto flex flex-col gap-1 py-2"
            >
                <div className="flex flex-row items-center gap-2">
                    <span className="flex-1 border-t-[1px] border-grayishWhite"></span>
                    <p
                        className="text-center text-grayishWhite"
                    >
                        {
                            todaysDate
                        }
                    </p>
                    <span className="flex-1 border-t-[1px] border-grayishWhite"></span>
                </div>
                
                {
                    chatData.map((message) => (
                        <div 
                            className={`flex ${message.data.senderUID === logedInUID ? 'flex-row-reverse':'flex-row'} flex-row items-center gap-3 p-2 max-w-full`}
                            key={message.id}
                        >
                            <div>
                            {
                                userDataMap[message.data.senderUID] && 
                                (
                                    <img 
                                        src={userDataMap[message.data.senderUID].avatar} 
                                        alt="User Avatar" 
                                        className="w-[2.5rem] h-[2.5rem] rounded-full"
                                    />
                                )
                            }
                            </div>

                            <div
                                className={`flex flex-col flex-wrap ${message.data.senderUID === logedInUID ? 'items-end':'items-start'}`}
                            >
                                {
                                    userDataMap[message.data.senderUID] && 
                                    (
                                        <p
                                            className="text-grayishWhite text-sm"
                                        >
                                            {
                                                userDataMap[message.data.senderUID].name
                                            }
                                        </p>
                                    )
                                }

                                <div className={`group flex flex-row items-center  ${message.data.senderUID === logedInUID ? 'flex-row-reverse':'flex-row'} gap-2`}>
                                    <p
                                        className="bg-taupe max-w-[20rem] p-2 flex-wrap h-auto break-words rounded-lg"
                                    >
                                        {
                                            message.data.message
                                        }
                                    </p>

                                    <div className=" group-hover:flex hidden items-center gap-2">
                                        <button
                                            className="text-lg text-grayishWhite bg-taupe rounded-full p-1 drop-shadow-md"
                                        >
                                            <RiEmojiStickerLine/>
                                        </button>
                                        <button
                                            className="text-lg text-grayishWhite bg-taupe rounded-full p-1 drop-shadow-md"
                                        >
                                            <BiShare/>
                                        </button>
                                        <button
                                            className="text-lg text-grayishWhite bg-taupe rounded-full p-1 drop-shadow-md"
                                        >
                                            <BsThreeDots/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
            <div className="w-full flex items-center gap-2 relative">
                
                {
                    showModal ? <EmojiModal setShowModal={setShowModal} onEmojiSelect={handleEmojiSelect} />:null
                }

                <div className="w-full bg-taupe drop-shadow-md flex items-center px-2 py-1 rounded-md">
                    <button className="text-grayishWhite text-xl">
                        <BsPlusCircleFill/>
                    </button>

                    <input 
                        type="text"
                        className="w-full rounded-sm px-2 py-1 text-grayishWhite outline-none bg-transparent"
                        ref={messageRef}
                        onChange={(e)=>{handleTypeMessage(e)}}
                    />

                    <button
                        onClick={()=>{setShowModal(showModal ? false:true)}}
                        className="text-grayishWhite text-2xl"
                        id="emojiButton"
                    >
                        <RiEmojiStickerLine/>
                    </button>
                </div>

                <button 
                    onClick={handleSendChat}
                    className="text-taupe drop-shadow-md text-xl p-1 text-center"
                >
                    {/*  */}
                    
                    {
                        hasMessage ? <IoSend/>:'👋'
                    }
                </button>
            </div>
            
        </div>
    )
}

export default GlobalChat;
