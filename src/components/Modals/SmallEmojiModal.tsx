import addReaction from "../../firebase/data/worldchat/addReaction"

function SmallEmojiModal({messageID,reactionSender,setIsShowReaction}){

    const handleOnReact =(e)=>{
        console.log(messageID)

        const reaction = {
            reactionName:e.target.id,
            emoji:e.target.value,
            reactionSender:reactionSender
        }

        addReaction(messageID,reaction)

        setIsShowReaction(false)
    }

    return (
        <div className="bg-taupe flex items-center justify-evenly p-1 rounded-full">
            <button
                onClick={(e)=>{handleOnReact(e)}}
                value='🤣' 
                id="laugh">
                    🤣
            </button>
            <button
                onClick={(e)=>{handleOnReact(e)}}
                value='❤️' 
                id="heart">
                    ❤️
            </button>
            <button
                onClick={(e)=>{handleOnReact(e)}}
                value='😭' 
                id="cry">
                    😭
            </button>
            <button
                onClick={(e)=>{handleOnReact(e)}}
                value='👎' 
                id="dislike">
                    👎
            </button>
            <button
                onClick={(e)=>{handleOnReact(e)}}
                value='👍' 
                id="like">
                    👍
            </button>
        </div>

    )
}

export default SmallEmojiModal