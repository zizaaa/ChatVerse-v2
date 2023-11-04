import { useEffect, useState, useRef } from "react";
import getworldChatsData from "../../firebase/data/worldchat/getworldChatsData";
import { IoSend } from "react-icons/io5"
import { BsPlusCircleFill } from "react-icons/bs"
import postworldChat from "../../firebase/data/worldchat/postworldChat";
import getUser from "../../firebase/data/user/getUser";

function GlobalChat() {
    const chatData = getworldChatsData('worldChats');
    const messageRef = useRef(null);
    const chatContainerRef = useRef();

    const [userDataMap, setUserDataMap] = useState({});

    const fetchUserDataForMessages = async (messages) => {
        const userDataPromises = messages.map((message) => {
            return getUser(message.data.senderUID);
        });

        const userDataList = await Promise.all(userDataPromises);

        const userDataMap = {};
        messages.forEach((message, index) => {
            userDataMap[message.data.senderUID] = userDataList[index];
        });

        setUserDataMap(userDataMap);
    };

    useEffect(() => {
        fetchUserDataForMessages(chatData);

        // Scroll to the bottom of the chat container
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [chatData]);

    const handleSendChat = () => {
        const message = {
            message: messageRef.current.value,
        };
        postworldChat(message);
        messageRef.current.value = '';
    }

    return (
        <div className="bg-darkBeige h-full p-2 rounded-bl-lg flex flex-col">
            <div 
                ref={chatContainerRef}
                className="w-full h-[29rem] overflow-auto flex items-start flex-col gap-2 py-2"
            >
                {
                    chatData.map((message) => (
                        <div 
                            className="flex flex-row items-center gap-3 p-2"
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
                                className="flex flex-col flex-wrap"
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
                                <p
                                    className="bg-taupe p-2 rounded-lg"
                                >
                                    {
                                        message.data.message
                                    }
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="w-full bg-taupe drop-shadow-md flex items-center px-2 py-1 rounded-md">
                <button className="text-grayishWhite text-xl">
                    <BsPlusCircleFill/>
                </button>
                <input 
                    type="text"
                    className="w-full rounded-sm px-2 py-1 text-grayishWhite outline-none bg-transparent"
                    ref={messageRef}
                />
                <button 
                    onClick={handleSendChat}
                    className="text-grayishWhite text-xl"
                >
                    <IoSend/>
                </button>
            </div>
        </div>
    )
}

export default GlobalChat;
