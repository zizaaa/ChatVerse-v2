import { useEffect, useState, useRef } from "react";

import { IoSend } from "react-icons/io5"
import { BsPlusCircleFill,BsThreeDots } from "react-icons/bs"
import { RiEmojiStickerLine } from "react-icons/ri"
import { BiShare } from "react-icons/bi"
import { AiFillCloseCircle } from "react-icons/ai"

import getworldChatsData from "../../firebase/data/worldchat/getworldChatsData";
import postworldChat from "../../firebase/data/worldchat/postworldChat";
import getUser from "../../firebase/data/user/getUser";
import userUID from "../cookies/userUID";
import EmojiModal from "../Modals/EmojiModal";
import singleMessage from "../../firebase/data/worldchat/singleMessage";
// import ReactionModal from "../Modals/ReactionModal";

function GlobalChat() {

    //worldchat data
    const chatData = getworldChatsData('worldChats');
    //user data
    const [userDataMap, setUserDataMap] = useState({});
    
    //message
    const messageRef = useRef(null);
        //message type that will throw to db
        const [messageType, setMessageType] = useState('message');
        //if message type is reply, we will use this two ref
        //for the message sender ID
        const messageSenderUIDRef = useRef(null);
        //for the message ID
        const messageIDRef = useRef(null);
        //for replies
        const [messageData, setMessageData] = useState({});
    //message checker if has a length
    const [hasMessage, setHasMessage] = useState(false);
    //for new message auto scroll effect
    const chatContainerRef = useRef();

    //date today
    const [todaysDate, setTodaysDate] = useState('');
    //logedin UID
    const logedInUID = userUID()
    //modal
    const [showModal, setShowModal] = useState(false);
    //options
    const [isShowOptions, setIsShowOption] = useState(false);

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

        chatData
        .filter((message) => message.data.type === "reply")
        .forEach(async (message) => {
            try {
                const data = await singleMessage(message.data.replyTo.messageID);
                setMessageData((prevData) => ({
                    ...prevData,
                    [message.id]: data,
                }));
            } catch (error) {
                console.error("Error fetching message data:", error);
            }
        });
        
    }, [chatData]);

    useEffect(()=>{
        //date today
        const date = new Date();  
        const months = ['January', 'February', 'March', 'April', 'May',  'June', 'July', 'August', 'September', 'October', 'November', 'December']

        const dateToday = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

        setTodaysDate(dateToday)
    },[])

    const handleTypeMessage =(e)=>{
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
            type:messageType,
            replyTo:messageType === 'reply' ? {
                messageID:messageIDRef.current,
                senderID:messageSenderUIDRef.current
            }:''
        };

        postworldChat(message);
        messageRef.current.value = '';
        setHasMessage(false)
        setMessageType('message')
    }

    const handleReplyButton = (e) =>{

        setMessageType('reply');

        let id = e.target.id
        let newId = id.split(' - ')

        const messageID = newId[0];
        const senderID = newId[1];

        messageSenderUIDRef.current = senderID;
        messageIDRef.current = messageID;
    }

    return (
        <div className="bg-darkBeige h-full p-2 rounded-bl-lg flex flex-col items-center justify-center relative">
            <div className="w-full flex-1 overflow-auto flex items-end">
                <div 
                    ref={chatContainerRef}
                    className="w-full flex overflow-auto max-h-[28rem] flex-col gap-1 py-2"
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
                                className={`flex ${message.data.senderUID === logedInUID ? 'flex-row-reverse':'flex-row'} flex-row items-end gap-3 p-2 max-w-full relative`}
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
                                                className="text-[rgba(255,255,255,0.61)] text-sm flex items-center gap-1"
                                            >
                                                {
                                                    message.data.type === 'reply' ?
                                                        <>
                                                            <BiShare/>
                                                            {
                                                                `${userDataMap[message.data.senderUID].name} replied to ${userDataMap[messageData[message.id].senderUID].name}`
                                                            }
                                                        </>
                                                    :
                                                        userDataMap[message.data.senderUID].name
                                                }
                                            </p>
                                        )
                                    }
                                    
                                    {
                                        message.data.type === 'reply' ?

                                        <p
                                            className="bg-[#675d5085] text-sm text-[rgba(255,255,255,0.42)] py-1 px-2 rounded-md"
                                        >
                                            {
                                                messageData[message.id] != undefined ? messageData[message.id].message:null
                                            }
                                        </p>
                                        :
                                        null
                                    }

                                    <div className={`group flex flex-row items-center ${message.data.senderUID === logedInUID ? 'flex-row-reverse text-end':'flex-row'} gap-2`}>
                                            <p
                                                className="bg-taupe max-w-[20rem] p-2 flex-wrap h-auto break-words rounded-lg"
                                            >
                                                {
                                                    message.data.message
                                                }
                                            </p>

                                        <div className={`group-hover:flex hidden items-center gap-2 ${message.data.senderUID === logedInUID ? 'flex-row-reverse':'flex-row'}`}>
                                            <button
                                                className="text-lg text-grayishWhite bg-taupe rounded-full p-1 drop-shadow-md"
                                            >
                                                <RiEmojiStickerLine/>
                                            </button>
                                            <button
                                                onClick={(e)=>{handleReplyButton(e)}}
                                                id={`${message.id} - ${message.data.senderUID}`}
                                                className="text-lg text-grayishWhite bg-taupe rounded-full p-1 drop-shadow-md"
                                            >
                                                <BiShare className='pointer-events-none'/>
                                            </button>
                                            <div className="flex items-center relative">
                                                {/* {
                                                    isShowOptions ?
                                                    <span>
                                                        <button>
                                                            Delete
                                                        </button>
                                                        <button>
                                                            Edit
                                                        </button>
                                                    </span>
                                                    :
                                                    null
                                                } */}
                                                
                                                <button
                                                    onClick={()=>{setIsShowOption(true)}}
                                                    className="text-lg text-grayishWhite bg-taupe rounded-full p-1 drop-shadow-md"
                                                >
                                                    <BsThreeDots/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="w-full flex flex-col items-center relative">
                
                <div className="absolute bottom-14 right-5">
                    {
                        showModal ? <EmojiModal setShowModal={setShowModal} onEmojiSelect={handleEmojiSelect} />:null
                    }
                </div>

                {
                    messageType === 'reply' ?
                        <div className="bg-[#675d5085] absolute -top-7 left-0 right-0 py-1 px-2 text-sm w-full rounded-t-md flex items-center justify-between">
                                {
                                        userDataMap[messageSenderUIDRef.current] && 
                                        (
                                            <p
                                                className="text-[rgba(255,255,255,0.81)]"
                                            >
                                                Replying to 
                                                <span className="ms-1">
                                                    {
                                                        userDataMap[messageSenderUIDRef.current].name
                                                    }
                                                </span>
                                            </p>
                                        )
                                }
                            <button 
                                onClick={()=>{setMessageType('message')}}
                                className="text-grayishWhite text-lg"
                            >
                                <AiFillCloseCircle/>
                            </button>
                        </div>
                    :
                        null
                }
                
                <div className="w-full bg-taupe drop-shadow-md flex items-center px-2 py-1 rounded-sm">
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

                    <button 
                        onClick={handleSendChat}
                        className="text-grayishWhite ms-2 drop-shadow-md text-xl p-1 text-center"
                    >
                        {/*  */}
                        
                        {
                            hasMessage ? <IoSend/>:'👋'
                        }
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default GlobalChat;
