import { useParams } from "react-router-dom"
import getPrivateChats from "../../../firebase/data/PrivateChats/getPrivateChats";

const Conversation = () => {
  const { id } = useParams();
  getPrivateChats(id);

  // console.log(conversationData)
  return (
    <div>Conversation</div>
  )
}

export default Conversation