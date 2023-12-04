import { useEffect, useRef, useState } from "react";
import { useParams,useLocation  } from "react-router-dom";
import getPrivateChats from "../../../firebase/data/PrivateChats/getPrivateChats";

import { BsPlusCircleFill,BsThreeDots } from "react-icons/bs"
import { RiEmojiStickerLine } from "react-icons/ri"
import { IoSend } from "react-icons/io5"
import postPrivateChat from "../../../firebase/data/PrivateChats/postPrivateChat";
import userUID from "../../cookies/userUID";
import getUser from "../../../firebase/data/user/getUser";

const Conversation = () => {
  const { id } = useParams();
  const logedInUser = userUID();
  const location = useLocation();
  const userProfile = location.state?.data;
  const [conversationData, setConversationData] = useState([]);
  const messageRef = useRef(null);
  const [hasMessage, setHasMessage] = useState(false)

  // useEffect(() => {
  //   // Set up a real-time listener for private chats
  //   const unsubscribe = getPrivateChats(id, setConversationData);
  
  //   // Clean up the listener when the component unmounts
  //   return () => {
  //     // Ensure to call the unsubscribe function to stop listening
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, [id,conversationData]);
  

  const handleSendMessage =()=>{
    
    let message = {
      message:messageRef.current.value != '' ? messageRef.current.value:'👋',
      conversationID:id 
    }
    postPrivateChat(message)
    messageRef.current.value = ''
    setHasMessage(false)
  }

  const handleOnchangeMessage =()=>{
    if(messageRef.current.value === ''){
      setHasMessage(false)
    }else{
      setHasMessage(true)
    }
  }

  return (
    <section className="w-full h-full flex flex-col">
        <div className="flex flex-col max-h-[29rem] flex-grow overflow-auto">
          <div className="bg-darkBeige p-2 rounded-sm w-full">
              <img 
                src={userProfile.avatar}
                className="h-[5rem] w-[5rem] rounded-full"
                />
              <h1 className="text-2xl my-2">
                {userProfile.name}
              </h1>
              <p className="text-sm text-grayishWhite mb-2">
                This is the beginning of your private message history with <span className="font-semibold">{userProfile.name}</span>
              </p>
              <button className="bg-taupe px-3 py-1 text-sm drop-shadow-md rounded-sm">
                Delete
              </button>
            </div>
            
            <div className="flex-grow w-full">
                {/* {
                  conversationData.map((message,index) =>(
                    <div key={index}>
                      <div>
                          <img src={getUser(message.data.senderUID).avatar}/>
                      </div>
                      <div>
                          <p>
                            {getUser(message.data.senderUID).name}
                          </p>
                      </div>
                    </div>
                  ))
                } */}
            </div>

        </div>
        <div className="w-full bg-taupe drop-shadow-md flex items-center px-2 py-1 rounded-sm">
            <div className="flex items-center space-x-4">
                <label htmlFor="fileInput" className=" text-white rounded cursor-pointer text-2xl">
                    <BsPlusCircleFill/> 
                </label>
                <input 
                    type="file" 
                    id="fileInput" 
                    name="fileInput" 
                    className="hidden" 
                    accept="image/*, .gif"
                />
            </div>
            {/* <BsPlusCircleFill/> */}
            <input 
                type="text"
                className="w-full rounded-sm px-2 py-1 text-grayishWhite outline-none bg-transparent"
                ref={messageRef}
                onChange={handleOnchangeMessage}
            />

            <button
                className="text-grayishWhite text-2xl"
                id="emojiButton"
            >
                <RiEmojiStickerLine/>
            </button>

            <button 
                className="text-grayishWhite ms-2 drop-shadow-md text-xl p-1 text-center"
                onClick={handleSendMessage}
            >
                {
                  hasMessage ? <IoSend/>:'👋'
                } 
            </button>
        </div>
    </section>
  );
};

export default Conversation;