import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect,useRef,useState } from "react"
import userBySecretConvoID from "../../../firebase/data/user/userBySecretConvoID";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function PostSecretMessage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({});
    const messageRef = useRef(null);
    const [message, setMessage] = useState('');
    const env = import.meta.env;
    const uri = env.VITE_REACT_SERVER_URL
    
    useEffect(()=>{
        const dataHandler = async()=>{
            const user = await userBySecretConvoID(id)

                if(!user) return navigate(`/paths/broken/${id}`);

            setUser(user)
        }
        dataHandler()
    },[id])

    const handleSendMessage =async()=>{
        if(message.length <= 0) return;

        console.log(message)
        
        await axios.put(`${uri}/api/postSecretMessage`,
            {
                id:id,
                message:message,
                messageID:uuidv4()
            }
        )
        .then((res)=>{
            if(res.data === 'Message sent success!'){
                setMessage('');
                return navigate('/paths/success');
            }
        })
    }
    return (
        <div className="flex flex-col items-center justify-center bg-beige w-[60rem] h-[35rem] rounded-lg drop-shadow-lg gap-4">
            <div className="bg-darkBeige rounded-md drop-shadow-md h-[13.6rem] w-96 flex flex-col">
                <div className="flex gap-2 bg-taupe px-2 py-4 rounded-t-md">
                    <img 
                        src={user.avatar}
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="">
                        <p>
                            @{user.name}
                        </p>
                        <p>
                            Send me anonymous messages!
                        </p>
                    </div>
                </div>
                <div className="">
                    <textarea 
                        className="w-full text-black p-2 outline-none resize-none bg-beige text-white rounded-b-md placeholder:text-black" 
                        rows={5}
                        autoFocus
                        placeholder="Say something..."
                        value={message}
                        onChange={(e)=>{setMessage(e.target.value)}}
                    />
                </div>
            </div>
            <button 
                onClick={handleSendMessage}
                className="bg-taupe py-3 w-96 rounded-full drop-shadow-md text-xl"
            >
                Send!
            </button>

            <Link to='/form/register' className="bg-taupe py-3 w-96 rounded-full drop-shadow-md text-xl text-center">
                Create your account!
            </Link>
        </div>
    )
}

export default PostSecretMessage